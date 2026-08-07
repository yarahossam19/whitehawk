import { Fragment, useEffect, useMemo, useRef, useState } from "react";
import { Menu, Transition } from "@headlessui/react";
import { ColumnDef } from "@tanstack/react-table";
import { GripVertical } from "lucide-react";
import Image from "next/image";

import columnViewIcon from "../../../assets/icons/table/column-view.svg";
import SearchBar from "../../Searchbar/Searchbar";

import "../data-table.scss";

import { closestCenter, DndContext, PointerSensor, useSensor, useSensors } from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  useSortable,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { toast } from "sonner";

interface SortableItemProps {
  id: string;
  label: string;
  checked: boolean;
  onToggle: (id: string) => void;
}

function SortableItem({ id, label, checked, onToggle }: SortableItemProps) {
  const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id });
  const style = { transform: CSS.Transform.toString(transform), transition };

  return (
    <div ref={setNodeRef} style={style} className="menu-item" {...attributes}>
      <label className="menu-item__label">
        <div {...listeners} className="menu-item__icon">
          <GripVertical />
        </div>
        <span>{label}</span>
      </label>
      <input
        className="table-checkbox"
        type="checkbox"
        checked={checked}
        onChange={(e) => {
          e.stopPropagation();
          onToggle(id);
        }}
      />
    </div>
  );
}

interface ColumnVisibilityMenuProps<TData = any> {
  columns: ColumnDef<TData, any>[];
  visibleColumns: Record<string, boolean>;
  onToggle: (id: string) => void;
  onReorder: (newColumns: ColumnDef<TData, any>[]) => void;
  onReset?: () => void;
  /** Controls which side the menu expands toward. */
  openDirection?: "ltr" | "rtl" | "filterResponsive";
}

export function ColumnVisibilityMenu<TData = any>({
  columns,
  visibleColumns,
  onToggle,
  onReorder,
  onReset,
  openDirection = "rtl",
}: ColumnVisibilityMenuProps<TData>) {
  const sensors = useSensors(useSensor(PointerSensor));
  const MAX_VISIBLE_COLUMNS = 10;
  const buttonRef = useRef<HTMLButtonElement | null>(null);
  const [isNarrow, setIsNarrow] = useState(false);

  const resolvedDirection = useMemo<"ltr" | "rtl">(() => {
    if (openDirection === "filterResponsive") {
      // Only case that opens left-to-right: filter exists and viewport <= 580px
      return isNarrow ? "ltr" : "rtl";
    }
    return openDirection;
  }, [openDirection, isNarrow]);

  useEffect(() => {
    if (openDirection !== "filterResponsive") return;
    const media = window.matchMedia?.("(max-width: 580px)");
    if (!media) return;

    const onChange = () => setIsNarrow(media.matches);
    onChange();
    media.addEventListener?.("change", onChange);
    return () => media.removeEventListener?.("change", onChange);
  }, [openDirection]);

  // Count how many columns are actually visible, respecting defaults
  const visibleCount = columns
    .filter((col) => col.id && !(col as any)?.meta?.hideInVisibilityMenu)
    .filter((col) => visibleColumns[col.id!] ?? true).length;

  return (
    <Menu as="div" className="menu">
      <Menu.Button ref={buttonRef} className="menu__button">
        <Image src={columnViewIcon} alt="Column visibility" className="dark:invert" />
      </Menu.Button>
      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <Menu.Items
          className={`menu__items menu__items--columns menu__items--${resolvedDirection} ${
            resolvedDirection === "rtl" ? "origin-top-right" : "origin-top-left"
          }`}
        >
          <div className="menu__header gap-2 mb-1">
            <SearchBar placeholder="Search columns..." onSearch={() => {}} className="w-[100%]" />
            {/* {onReset && (
              <button onClick={onReset} className="menu__reset-btn" type="button">
                Reset All
              </button>
            )} */}
          </div>

          <DndContext
            id="ticketing-column-visibility-dnd"
            sensors={sensors}
            collisionDetection={closestCenter}
            onDragEnd={({ active, over }) => {
              if (active.id !== over?.id) {
                const oldIndex = columns.findIndex((c) => c.id === active.id);
                const newIndex = columns.findIndex((c) => c.id === over?.id);
                if (oldIndex !== -1 && newIndex !== -1) {
                  onReorder(arrayMove(columns, oldIndex, newIndex));
                }
              }
            }}
          >
            <SortableContext
              items={columns
                .filter((c) => !(c as any)?.meta?.hideInVisibilityMenu)
                .map((c) => c.id || "")
                .filter(Boolean)}
              strategy={verticalListSortingStrategy}
            >
              {columns
                .filter((col) => col.id && !(col as any)?.meta?.hideInVisibilityMenu)
                .map((col) => (
                  <SortableItem
                    key={col.id}
                    id={col.id!}
                    label={typeof col.header === "string" ? col.header : col.id!}
                    checked={visibleColumns[col.id!] ?? true}
                    onToggle={(id) => {
                      const willShow = !(visibleColumns[id] ?? true);
                      if (willShow && visibleCount >= MAX_VISIBLE_COLUMNS) {
                        toast.error("You can display a maximum of 10 columns.");
                        return;
                      }
                      onToggle(id);
                    }}
                  />
                ))}
            </SortableContext>
          </DndContext>
        </Menu.Items>
      </Transition>
    </Menu>
  );
}
