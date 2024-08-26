"use client";

import { TeamCard } from "@/modules/navbar/components/team-card";
import Image from "next/image";
import { teams } from "../utils/teams";
import {
  CircleAlert,
  Folder,
  PlusIcon,
  SquarePlus,
  UserPlus,
} from "lucide-react";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
} from "../../../components/ui/accordion";
import { accordionItems } from "../utils/accordion";
import { IconCard } from "@/modules/navbar/components/icon-card";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export const Navbar = () => {
  return (
    <div className="rounded border p-4 w-96 h-screen fixed left-0 top-0 bottom-0 bg-white flex flex-col justify-between">
      <div>
        <div className="flex items-center w-full justify-between mb-4">
          <div className="flex items-center gap-4">
            <div>
              <Image
                src={"/images/logo/logo.svg"}
                alt=""
                width={40}
                height={40}
                className="w-10 h-10 object-cover"
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
                <Link href={ac.link}>
                  <AccordionItem value={ac.id.toString()}>
                    <AccordionTrigger className="font-bold rounded px-1 py-2">
                      <div className="flex items-center gap-2">
                        <Folder className="size-4" />
                        <p>{ac.product}</p>
                      </div>
                    </AccordionTrigger>
                    {ac.items?.map((item: any) => (
                      <>
                        <IconCard icon={item.icon} name={item.name} />
                      </>
                    ))}
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
        <div className="flex items-center gap-2 mb-2 justify-between bg-slate-100 rounded px-2 py-1">
          <div className="flex items-center gap-2">
            <div className="bg-white rounded p-1">
              <p className="text-xs font-light">7</p>
            </div>
            <p className="text-sm font-semibold">Invite Teammates</p>
          </div>
          <Button>Add billing</Button>
        </div>
      </div>
    </div>
  );
};
