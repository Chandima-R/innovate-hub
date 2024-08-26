import { tableData } from "@/modules/shared/utils/data";
import { columns } from "./columns";
import { DataTable } from "./data-table";

export const ProductTable = ({ data }: any) => {
  return (
    <div>
      <DataTable columns={columns} data={data} />
    </div>
  );
};
