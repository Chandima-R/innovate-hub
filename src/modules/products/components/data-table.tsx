"use client";

import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Archive, ChevronDown, Plus, Trash, X } from "lucide-react";

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
}

export function DataTable<TData, TValue>({
  columns,
  data,
}: DataTableProps<TData, TValue>) {
  const [rowSelection, setRowSelection] = useState({});

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    onRowSelectionChange: setRowSelection,
    state: {
      rowSelection,
    },
  });

  // Effect to handle re-rendering when rowSelection changes
  useEffect(() => {}, [rowSelection]);

  // Function to reset all selected checkboxes
  const resetSelection = () => {
    console.log("Resetting selection"); // Debugging: Check if function is called
    setRowSelection({});
  };

  return (
    <>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <TableHead key={header.id}>
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              <>
                {table.getRowModel().rows.map((row) => (
                  <TableRow
                    key={row.id}
                    data-state={row.getIsSelected() && "selected"}
                  >
                    {row.getVisibleCells().map((cell) => (
                      <TableCell key={cell.id}>
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext()
                        )}
                      </TableCell>
                    ))}
                  </TableRow>
                ))}
                <TableRow>
                  <TableCell></TableCell>
                  <TableCell>
                    <div className="flex justify-end items-center">
                      <span className="font-semibold mr-2">
                        {table.getRowModel().rows.length}
                      </span>{" "}
                      count
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex text-slate-400 items-center">
                      <Plus className="size-4 mr-2" />
                      Add calculation
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex text-slate-400 items-center">
                      <Plus className="size-4 mr-2" />
                      Add calculation
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex text-slate-400 items-center">
                      <Plus className="size-4 mr-2" />
                      Add Ccculation
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex text-slate-400 items-center">
                      <Plus className="size-4 mr-2" />
                      Add calculation
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex text-slate-400 items-center"></div>
                  </TableCell>
                </TableRow>
              </>
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      {Object.keys(rowSelection).length > 0 && (
        <div className="flex items-center justify-center w-full mx-auto shadow rounded mt-6 mb-4">
          <div className="text-sm text-muted-foreground flex items-center gap-2 bg-slate-50 p-2">
            <Button variant={"outline"} size={"sm"} className="text-black">
              <div className="rounded bg-black text-white w-4 h-4 flex items-center justify-center mr-2">
                {table.getFilteredSelectedRowModel().rows.length}
              </div>
              selected
            </Button>
            <Button variant={"outline"} size={"sm"} className="text-black">
              <Archive className="size-4 mr-2" /> Archive
            </Button>
            <Button variant={"outline"} size={"sm"} className="text-red-400">
              <Trash className="size-4 mr-2" /> Delete
            </Button>
            <Button className="text-black" variant={"outline"} size={"sm"}>
              <p className="text-sm mr-2">More</p>
              <ChevronDown className="size-4" />
            </Button>
            <Button variant={"outline"} size={"sm"} onClick={resetSelection}>
              <X className="size-4" />
            </Button>
          </div>
        </div>
      )}
    </>
  );
}
