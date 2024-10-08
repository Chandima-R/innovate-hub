"use client";

import { useState } from "react";
import { TeamCard } from "@/modules/navbar/components/team-card";
import Image from "next/image";
import { teams } from "../utils/teams";
import {
  AlignJustify,
  CircleAlert,
  Folder,
  PlusIcon,
  SquarePlus,
  UserPlus,
  X,
} from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../../../components/ui/accordion";
import { accordionItems } from "../utils/accordion";
import { IconCard } from "@/modules/navbar/components/icon-card";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export const Navbar = () => {
  const [isNavbarOpen, setIsNavbarOpen] = useState(false);

  return (
    <>
      {/* Mobile Navbar */}
      <div
        className={`lg:hidden fixed top-0 left-0 w-full h-full bg-white z-40 transition-transform transform ${
          isNavbarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex flex-col h-full p-4 border-r border-slate-200">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-4">
              <Image
                src={"/images/logo/logo.svg"}
                alt=""
                width={40}
                height={40}
                className="w-9 h-9 object-cover"
              />
              <p className="text-slate-400 text-sm -mb-1">INC</p>
              <h1 className="font-semibold text-lg">InovateHub</h1>
            </div>
            <Button onClick={() => setIsNavbarOpen(false)}>
              <X className="size-4" />
            </Button>
          </div>

          <div className="border rounded p-2 mb-4 flex flex-col gap-2">
            {teams.map((team) => (
              <TeamCard
                key={team.name}
                icon={team.icon}
                name={team.name}
                controllerIcon={team.controllerIcon}
                controllerCount={team.controllerCount}
              />
            ))}
            <div className="border-t py-2 px-2 flex gap-2 items-center">
              <SquarePlus className="size-4 text-slate-500" />
              <p className="text-slate-400 text-sm">Create a team</p>
            </div>
          </div>

          <div className="rounded p-2">
            <div className="flex items-center justify-between w-full text-slate-400 mb-2">
              <p className="font-semibold uppercase text-sm">folders</p>
              <PlusIcon className="size-6 cursor-pointer hover:bg-slate-100 p-1 rounded" />
            </div>

            <div className="px-1 font-semibold text-sm">
              <Accordion type="single" collapsible className="w-full">
                {accordionItems?.map((ac: any) => (
                  <AccordionItem key={ac.id} value={ac.id.toString()}>
                    <AccordionTrigger className="font-bold rounded px-1 py-2">
                      <div className="flex items-center gap-2">
                        <Folder className="size-4" />
                        <p>{ac.product}</p>
                      </div>
                    </AccordionTrigger>
                    {ac.items?.map((item: any) => (
                      <IconCard
                        key={item.name}
                        icon={item.icon}
                        name={item.name}
                      />
                    ))}
                    <AccordionContent>
                      <div className="px-4 flex gap-2 items-center">
                        <SquarePlus className="size-4 text-slate-500" />
                        <p className="text-slate-400 text-sm">Add new sub</p>
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>
          </div>

          <div className="flex flex-col gap-2 mt-auto">
            <div className="flex items-center gap-2 mb-2 p-2 hover:bg-slate-100 cursor-pointer">
              <UserPlus className="size-4" />
              <p className="text-sm font-semibold">Invite Teammates</p>
            </div>
            <div className="flex items-center gap-2 mb-2 justify-between p-2 hover:bg-slate-100 cursor-pointer">
              <div className="flex items-center gap-2">
                <CircleAlert className="size-4" />
                <p className="text-sm font-semibold">Help and first steps</p>
              </div>
              <div className="bg-slate-200 rounded p-1">
                <p className="text-xs font-light">0/6</p>
              </div>
            </div>
            <div className="flex items-center gap-2 justify-between bg-slate-100 rounded px-2 py-1">
              <div className="flex items-center gap-2">
                <div className="bg-white rounded p-1">
                  <p className="text-xs font-light">7</p>
                </div>
                <p className="text-sm font-semibold">days left on trial</p>
              </div>
              <Button>Add billing</Button>
            </div>
          </div>
        </div>
      </div>

      {/* Desktop Navbar Toggle Button */}
      <Button
        className="block lg:hidden z-20 mr-2"
        variant="outline"
        size="sm"
        onClick={() => setIsNavbarOpen(true)}
      >
        <AlignJustify className="size-4" />
      </Button>

      {/* Desktop Navbar */}
      <div className="hidden lg:flex rounded p-4 w-96 h-screen fixed left-0 top-0 bottom-0 bg-white flex-col justify-between z-20">
        <div className="flex flex-col justify-between border rounded h-full p-4">
          <div>
            <div className="flex items-center w-full justify-between mb-4">
              <div className="flex items-center gap-4">
                <div>
                  <Image
                    src={"/images/logo/logo.svg"}
                    alt=""
                    width={40}
                    height={40}
                    className="w-9 h-9 object-cover"
                  />
                </div>
                <div>
                  <p className="text-slate-400 text-sm -mb-1">INC</p>
                  <h1 className="font-semibold text-lg">InovateHub</h1>
                </div>
              </div>
              <div className="rounded-full border shadow cursor-pointer">
                <Image
                  src={"/images/headshot/headshot4.jpg"}
                  alt="user"
                  width={40}
                  height={40}
                  className="rounded-full w-10 h-10 object-cover"
                />
              </div>
            </div>

            <div className="border rounded p-2 mb-4">
              {teams.map((team) => (
                <TeamCard
                  key={team.name}
                  icon={team.icon}
                  name={team.name}
                  controllerIcon={team.controllerIcon}
                  controllerCount={team.controllerCount}
                />
              ))}
              <div className="border-t py-2 px-2 flex gap-2 items-center">
                <SquarePlus className="size-4 text-slate-500" />
                <p className="text-slate-400 text-sm">Create a team</p>
              </div>
            </div>

            <div className="rounded p-2">
              <div className="flex items-center justify-between w-full text-slate-400 mb-2">
                <p className="font-semibold uppercase text-sm">folders</p>
                <PlusIcon className="size-6 cursor-pointer hover:bg-slate-100 p-1 rounded" />
              </div>

              <div className="px-1 font-semibold text-sm">
                <Accordion type="single" collapsible className="w-full">
                  {accordionItems?.map((ac: any) => (
                    <Link href={ac.link} key={ac.id}>
                      <AccordionItem value={ac.id.toString()}>
                        <AccordionTrigger className="font-bold rounded px-1 py-2">
                          <div className="flex items-center gap-2">
                            <Folder className="size-4" />
                            <p>{ac.product}</p>
                          </div>
                        </AccordionTrigger>
                        {ac.items?.map((item: any) => (
                          <IconCard
                            key={item.name}
                            icon={item.icon}
                            name={item.name}
                          />
                        ))}
                        <AccordionContent>
                          <div className="px-4 flex gap-2 items-center">
                            <SquarePlus className="size-4 text-slate-500" />
                            <p className="text-slate-400 text-sm">
                              Add new sub
                            </p>
                          </div>
                        </AccordionContent>
                      </AccordionItem>
                    </Link>
                  ))}
                </Accordion>
              </div>
            </div>
          </div>
          <div>
            <div className="flex items-center gap-2 mb-2 p-2 hover:bg-slate-100 cursor-pointer">
              <UserPlus className="size-4" />
              <p className="text-sm font-semibold">Invite Teammates</p>
            </div>
            <div className="flex items-center gap-2 mb-2 justify-between p-2 hover:bg-slate-100 cursor-pointer">
              <div className="flex items-center gap-2">
                <CircleAlert className="size-4" />
                <p className="text-sm font-semibold">Help and first steps</p>
              </div>
              <div className="bg-slate-200 rounded p-1">
                <p className="text-xs font-light">0/6</p>
              </div>
            </div>
            <div className="flex items-center gap-2 justify-between bg-slate-100 rounded px-2 py-1">
              <div className="flex items-center gap-2">
                <div className="bg-white rounded p-1">
                  <p className="text-xs font-light">7</p>
                </div>
                <p className="text-sm font-semibold">days left on trial</p>
              </div>
              <Button>Add billing</Button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
