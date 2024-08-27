"use client";

import { useState, useCallback, useMemo } from "react";
import { CategotyTitle } from "@/modules/shared/components/category-title";
import { IconButton } from "./icon-button";
import {
  ArrowUpAZ,
  CirclePlus,
  Download,
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
import { Button } from "@/components/ui/button";

export const Product = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedBrand, setSelectedBrand] = useState("");
  const [selectedTag, setSelectedTag] = useState("");
  const [sortAscending, setSortAscending] = useState(true);
  const [isSortButtonActive, setIsSortButtonActive] = useState(false);

  // Memoize filtered data
  const filteredData = useMemo(() => {
    return tableData.filter((product: any) => {
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
  }, [searchTerm, selectedBrand, selectedTag]);

  // Memoize sorted data based on the first letter of the brand name
  const sortedData = useMemo(() => {
    if (!isSortButtonActive) return filteredData;

    return [...filteredData].sort((a: any, b: any) => {
      const firstLetterA = a.brandname[0].toLowerCase();
      const firstLetterB = b.brandname[0].toLowerCase();

      if (firstLetterA < firstLetterB) return sortAscending ? -1 : 1;
      if (firstLetterA > firstLetterB) return sortAscending ? 1 : -1;
      return 0;
    });
  }, [filteredData, isSortButtonActive, sortAscending]);

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
    setIsSortButtonActive(false);
    setSortAscending(true);
  };

  // Determine if the reset button should be disabled
  const isResetDisabled = !searchTerm && !selectedBrand && !selectedTag;

  // Handle sort button click
  const handleSortClick = () => {
    if (isSortButtonActive) {
      // If sort was active, reset sorting order
      setSortAscending(true);
    } else {
      // If sort was not active, toggle sorting order
      setSortAscending(!sortAscending);
    }
    setIsSortButtonActive(!isSortButtonActive);
  };

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
              onChange={(e) => setSearchTerm(e.target.value)}
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
            onChange={(value) => setSelectedBrand(value)}
          />
          <ComboboxField
            name={"desk"}
            label={"Desk"}
            options={[]}
            onChange={(value) => setSelectedTag(value)}
          />
          <ComboboxField
            name={"tags"}
            label={"Tags"}
            options={uniqueTags.map((tag) => ({
              label: tag,
              value: tag,
            }))}
            onChange={(value) => setSelectedTag(value)}
          />
          <Button
            className={`border flex items-center justify-center p-1 rounded min-w-10 h-10 w-auto cursor-pointer hover:bg-slate-200 ${
              isSortButtonActive ? "bg-blue-500 text-white" : ""
            }`}
            onClick={handleSortClick}
            variant="ghost"
          >
            <ArrowUpAZ className="size-4" />
            <p className="text-sm ml-1">Sort</p>
          </Button>

          <TableButton icon={SlidersHorizontal} text="Filter" disabled={true} />
          <Button
            onClick={resetFilters}
            variant="outline"
            disabled={isResetDisabled}
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
        <ProductTable data={sortedData} />
      </div>
    </div>
  );
};
