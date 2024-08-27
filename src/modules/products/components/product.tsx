"use client";

import { useState } from "react";
import { CategotyTitle } from "@/modules/shared/components/category-title";
import { IconButton } from "./icon-button";
import {
  ArrowUpAZ,
  CirclePlus,
  Download,
  LayoutDashboard,
  MessagesSquare,
  RotateCcw,
  Search,
  Settings,
  SlidersHorizontal,
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { ProductTable } from "./products-table";
import { tableData } from "@/modules/shared/utils/data";
import { ComboboxField } from "@/modules/shared/components/combobox-field";
import { TableButton } from "@/modules/shared/components/tableButton";
import { Button } from "@/components/ui/button"; // Import Button component

export const Product = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedBrand, setSelectedBrand] = useState(""); // State for selected brand
  const [selectedTag, setSelectedTag] = useState(""); // State for selected tag

  // Filter the data based on the search term, selected brand, and selected tag
  const filteredData = tableData.filter((product: any) => {
    const matchesSearchTerm = product?.brandname
      .toLowerCase()
      .includes(searchTerm.toLowerCase());

    const matchesBrand = selectedBrand
      ? product?.brandname === selectedBrand
      : true;

    const matchesTag = selectedTag
      ? product?.tags?.some((tag: any) => tag.tagName === selectedTag)
      : true;

    return matchesSearchTerm && matchesBrand && matchesTag;
  });

  // Extract unique brands
  const uniqueBrands = Array.from(
    new Set(tableData.map((td: any) => td.brandname))
  );

  // Extract unique tags
  const uniqueTags = Array.from(
    new Set(
      tableData.flatMap(
        (td: any) => td.tags?.map((tag: any) => tag.tagName) || []
      )
    )
  );

  // Reset filters function
  const resetFilters = () => {
    setSearchTerm("");
    setSelectedBrand("");
    setSelectedTag("");
  };

  // Determine if the reset button should be disabled
  const isResetDisabled = !searchTerm && !selectedBrand && !selectedTag;

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

      <div className="p-4 flex items-center justify-between">
        <div className="flex gap-2 items-start">
          <ComboboxField
            name={"brands"}
            label={"All Brands"}
            options={uniqueBrands.map((brand) => ({
              label: brand,
              value: brand,
            }))}
            onChange={(value) => setSelectedBrand(value)} // Set selected brand
          />
          <ComboboxField
            name={"desk"}
            label={"Desk"}
            options={[]}
            onChange={(value) => setSelectedTag(value)} // Set selected tag
          />
          <ComboboxField
            name={"tags"}
            label={"Tags"}
            options={uniqueTags.map((tag) => ({
              label: tag,
              value: tag,
            }))}
            onChange={(value) => setSelectedTag(value)} // Set selected tag
          />
          <TableButton icon={ArrowUpAZ} text="Sort" disabled={true} />
          <TableButton icon={SlidersHorizontal} text="Filter" disabled={true} />
          <Button
            onClick={resetFilters}
            variant="outline"
            disabled={isResetDisabled} // Disable button if no filters are active
          >
            <RotateCcw className="size-4 mr-2" />
            Reset
          </Button>
        </div>

        <div className="flex gap-2 items-start">
          <TableButton icon={CirclePlus} text="Meeting" disabled={false} />
          <TableButton
            icon={Download}
            text="Import / Export"
            disabled={false}
          />
        </div>
      </div>

      <div>
        {/* Pass the filtered data to the ProductTable */}
        <ProductTable data={filteredData} />
      </div>
    </div>
  );
};
