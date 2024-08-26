"use client";

import { useState } from "react";
import { CategotyTitle } from "@/modules/shared/components/category-title";
import { IconButton } from "./icon-button";
import { MessagesSquare, Search, Settings } from "lucide-react";
import { Input } from "@/components/ui/input";
import { ProductTable } from "./products-table";
import { tableData } from "@/modules/shared/utils/data";

export const Product = () => {
  const [searchTerm, setSearchTerm] = useState("");

  // Filter the data based on the search term
  const filteredData = tableData.filter((product: any) =>
    product?.brandname.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="w-full">
      <div className="w-full flex items-start justify-between border-b p-4">
        <CategotyTitle title={"Products"} />
        <div className="flex items-center gap-2">
          <div className="border p-1 rounded flex items-center gap-2 h-8 px-2">
            <Search className="size-4" />
            <Input
              type="text"
              placeholder="Search for..."
              className="border-none h-7 p-0"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)} // Update search term
            />
          </div>
          <IconButton
            icon={MessagesSquare}
            customFn={() => {
              console.log("Messages clicked");
            }}
          />
          <IconButton
            icon={Settings}
            customFn={() => {
              console.log("Settings clicked");
            }}
          />
        </div>
      </div>

      <div className="p-4">
        <p>Search results for: {searchTerm}</p>
      </div>

      <div>
        {/* Pass the filtered data to the ProductTable */}
        <ProductTable data={filteredData} />
      </div>
    </div>
  );
};
