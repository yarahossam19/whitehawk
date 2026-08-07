import Image from "next/image";

import kanbanIcon from "../../../assets/icons/table/kanban.svg";
import tableIcon from "../../../assets/icons/table/table.svg";
import { Tabs, TabsList, TabsTrigger } from "../../ui/tabs";

type ToggleValue = "table" | "kanban";

export const KanbanToggle = ({
  value = "table",
  onChange,
}: {
  value?: ToggleValue;
  onChange?: (v: ToggleValue) => void;
}) => {
  return (
    <div className="flex w-full max-w-sm flex-col gap-6">
      <Tabs value={value} onValueChange={(v) => onChange?.(v as ToggleValue)}>
        <TabsList>
          <TabsTrigger value="kanban">
            <Image
              src={kanbanIcon}
              alt="Kanban View"
              width={16}
              height={16}
              className="inline mr-2 dark:invert"
            />
            Kanban View
          </TabsTrigger>
          <TabsTrigger value="table">
            Table View{" "}
            <Image
              src={tableIcon}
              alt="Table View"
              width={16}
              height={16}
              className="inline ml-2 dark:invert"
            />
          </TabsTrigger>
        </TabsList>
      </Tabs>
    </div>
  );
};
