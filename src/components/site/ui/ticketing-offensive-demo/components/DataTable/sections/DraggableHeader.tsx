import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

export function DraggableHeader({ id, children }: { id: string; children: React.ReactNode }) {
  const { setNodeRef, attributes, listeners, transform, transition } = useSortable({ id });
  const style = { transform: CSS.Transform.toString(transform), transition };
  return (
    <th ref={setNodeRef} style={style} {...attributes} {...listeners} className="table__th">
      {children}
    </th>
  );
}
