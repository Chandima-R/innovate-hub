"use client";

import { CategotyTitle } from "@/modules/shared/components/category-title";
import { IconButton } from "./icon-button";
import { MessagesSquare, Search, Settings } from "lucide-react";
import { Input } from "@/components/ui/input";
import { ProductTable } from "./products-table";

export const Product = () => {
  return (
    <div className="w-full">
      <div className="w-full flex items-start justify-between border-b p-4">
        <CategotyTitle title={"Products"} />
        <div className="flex items-center gap-2">
          <div className="border p-1 rounded flex items-center gap-2 h-8 px-2">
            <Search className="size-4" />
            <Input
              type="text"
              placeholder="Search for.."
              className="border-none h-7 p-0 "
            />
          </div>
          <IconButton
            icon={MessagesSquare}
            customFn={() => {
              console.log("settings clicked");
            }}
          />
          <IconButton
            icon={Settings}
            customFn={() => {
              console.log("settings clicked");
            }}
          />
        </div>
      </div>

      <div className="p-4">
        <p>hrllohrllohrllo</p>
      </div>

      <div>
        <ProductTable />
      </div>
    </div>
  );
};
