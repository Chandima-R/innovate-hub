import { tableData } from "@/modules/shared/utils/data";
import { columns } from "./columns";
import { DataTable } from "./data-table";

export const ProductTable = () => {
  return (
    <div>
      <DataTable columns={columns} data={tableData} />
    </div>
  );
};
