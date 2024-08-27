"use client";

import { Checkbox } from "@/components/ui/checkbox";
import { ColumnDef } from "@tanstack/react-table";
import { MessagesSquare, Plus, X } from "lucide-react";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import Image from "next/image";
import { IconButton } from "./icon-button";
import { truncateString } from "@/modules/shared/utils/truncate-string";
import { AddProductForm } from "./add-product-form";

export type ProjectData = {
  brandname: string;
  brandLogo: string;
  comments: { commentText: string }[];
  description: string;
  members: {
    memberName: string;
    image: string;
    imageBackground?: string;
    textColor?: string;
  }[];
  categories: {
    categoryName: string;
    categoryColor: string;
    textColor: string;
  }[];
  tags: { tagName: string }[];
  meetings: {
    meetingName: string;
    meetingColor: string;
    textColor: string;
  }[];
};

export const columns: ColumnDef<ProjectData>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "brandname",
    header: ({ table }) => (
      <div className="flex items-center justify-between w-[200px]">
        <h1>Brand</h1>
        <AlertDialog>
          <AlertDialogTrigger>
            <Plus className="size-4 cursor-pointer" />
          </AlertDialogTrigger>
          <AlertDialogContent>
            <div className="flex items-center justify-between w-full">
              <AlertDialogTitle>Add new barnd</AlertDialogTitle>
              <AlertDialogCancel>
                <X className="size-4" />
              </AlertDialogCancel>
            </div>
            <AddProductForm />
          </AlertDialogContent>
        </AlertDialog>
      </div>
    ),
    cell: ({ row }) => (
      <div className="flex items-center justify-between w-full">
        <div className="flex items-center gap-2">
          <Image
            src={row.original.brandLogo}
            alt={row.original.brandname}
            className="w-6 h-6 object-cover"
            width={500}
            height={50}
          />
          <span className="font-semibold capitalize text-md">
            {row.original.brandname}
          </span>
        </div>
        <div>
          {row.original.comments.length > 0 && (
            <AlertDialog>
              <AlertDialogTrigger>
                <IconButton
                  icon={MessagesSquare}
                  count={row.original.comments.length}
                />
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader className="max-h-96 overflow-y-scroll">
                  <div className="flex items-center justify-between w-full">
                    <AlertDialogTitle>Comments</AlertDialogTitle>
                    <AlertDialogCancel>
                      <X className="size-4" />
                    </AlertDialogCancel>
                  </div>
                  {row.original.comments?.map((comment: any, index) => (
                    <AlertDialogDescription
                      key={index}
                      className="bg-slate-100 text-slate-500 p-2 max-h-96"
                    >
                      {comment.commentText}
                    </AlertDialogDescription>
                  ))}
                </AlertDialogHeader>
              </AlertDialogContent>
            </AlertDialog>
          )}
        </div>
      </div>
    ),
  },
  {
    accessorKey: "description",
    header: "Description",
    cell: ({ row }) => (
      <div className="w-full">
        <p>
          {truncateString({ str: row.getValue("description"), maxLength: 25 })}
        </p>
      </div>
    ),
  },
  {
    accessorKey: "members",
    header: "Members",
    cell: ({ row }) => {
      const members = row.original.members;
      const displayedMembers = members.slice(0, 7);
      const remainingMembers = members.length > 7 ? members.slice(7) : [];

      return (
        <div className="flex items-center w-full">
          {displayedMembers.map((member, index) => (
            <div
              key={index}
              className="relative flex items-center group"
              style={{
                marginLeft: index !== 0 ? "-0.75rem" : "0", // Overlap effect
              }}
            >
              {member?.image ? (
                <Image
                  src={member.image}
                  alt={member.memberName}
                  width={500}
                  height={500}
                  className="w-8 h-8 rounded-full object-cover border border-white cursor-pointer"
                />
              ) : (
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center border border-white cursor-pointer`}
                  style={{
                    backgroundColor: member.imageBackground,
                    color: member.textColor,
                  }}
                >
                  {member.memberName
                    .split(" ")
                    .map((name) => name.charAt(0).toUpperCase())
                    .join("")}
                </div>
              )}

              {/* Tooltip/Popup */}
              <div className="absolute top-6 left-1/2 transform -translate-x-1/2 hidden group-hover:flex flex-col items-center w-auto z-40">
                <div className="bg-slate-50 p-1 rounded shadow-lg flex items-center gap-2 w-48">
                  {member?.image && (
                    <Image
                      src={member.image}
                      alt={member.memberName}
                      width={500}
                      height={500}
                      className="w-10 h-10 rounded-full object-cover"
                    />
                  )}

                  {!member?.image && (
                    <div
                      className={`w-10 h-10 rounded-full object-cover mb-2 flex items-center justify-center border`}
                      style={{
                        backgroundColor: member.imageBackground,
                        color: member.textColor,
                      }}
                    >
                      {member.memberName
                        .split(" ")
                        .map((name) => name.charAt(0).toUpperCase())
                        .join("")}
                    </div>
                  )}
                  <span className="text-sm font-normal capitalize">
                    {member.memberName}
                  </span>
                </div>
              </div>
            </div>
          ))}

          {/* Display the "more" indicator if there are more than 7 members */}
          {remainingMembers.length > 0 && (
            <div
              className="relative flex items-center justify-center w-8 h-8 bg-gray-300 rounded-full text-sm font-bold cursor-pointer group"
              style={{ marginLeft: "-0.75rem" }}
            >
              +{remainingMembers.length}
              {/* Tooltip for remaining members */}
              <div className="absolute top-6 left-1/2 transform -translate-x-1/2 hidden group-hover:flex flex-col items-center w-auto z-40">
                <div className="bg-slate-50 p-1 rounded shadow-lg flex flex-col gap-1">
                  {remainingMembers.map((member, index) => (
                    <div key={index} className="flex items-center gap-2 w-48">
                      {member?.image ? (
                        <Image
                          src={member.image}
                          alt={member.memberName}
                          width={500}
                          height={500}
                          className="w-8 h-8 rounded-full object-cover"
                        />
                      ) : (
                        <div
                          className={`w-8 h-8 rounded-full flex items-center justify-center border`}
                          style={{
                            backgroundColor: member.imageBackground,
                            color: member.textColor,
                          }}
                        >
                          {member.memberName
                            .split(" ")
                            .map((name) => name.charAt(0).toUpperCase())
                            .join("")}
                        </div>
                      )}
                      <span className="text-sm font-normal capitalize">
                        {member.memberName}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      );
    },
  },
  {
    accessorKey: "categories",
    header: "Categories",
    cell: ({ row }) => (
      <div className="flex flex-wrap gap-2">
        {row.original.categories.map((category, index) => (
          <span
            key={index}
            className="px-2 py-1 rounded text-xs"
            style={{
              backgroundColor: category.categoryColor,
              color: category.textColor,
            }}
          >
            {category.categoryName}
          </span>
        ))}
      </div>
    ),
  },
  {
    accessorKey: "tags",
    header: "Tags",
    cell: ({ row }) => (
      <div className="flex flex-wrap gap-1">
        {row.original.tags.map((tag, index) => (
          <span key={index} className="px-2 py-1 bg-gray-200 rounded text-xs">
            {tag.tagName}
          </span>
        ))}
      </div>
    ),
  },
  {
    accessorKey: "meetings",
    header: "Meetings",
    cell: ({ row }) => (
      <div className="flex flex-wrap gap-2">
        {row.original.meetings.map((meeting, index) => (
          <span
            key={index}
            className="px-2 py-1 rounded text-xs"
            style={{
              backgroundColor: meeting.meetingColor,
              color: meeting.textColor,
            }}
          >
            {meeting.meetingName}
          </span>
        ))}
      </div>
    ),
  },
  {
    id: "footer",
    footer: ({ table }) => {
      const totalBrands = table.getCoreRowModel().rows.length;
      return (
        <div className="font-semibold text-lg text-right">
          Total Brands: {totalBrands}
        </div>
      );
    },
  },
];
