import { LucideIcon } from "lucide-react";

interface Props {
  icon: LucideIcon;
  name: string;
  controllerIcon: LucideIcon;
  controllerCount: number;
}

export const TeamCard = ({
  icon,
  name,
  controllerIcon,
  controllerCount,
}: Props) => {
  const Icon = icon;
  const ControllerIcon = controllerIcon;
  return (
    <div className="rounded flex items-center w-full justify-between py-1 px-2 cursor-pointer hover:bg-slate-100 ease-in-out duration-100 mb-2">
      <div className="flex items-center gap-2">
        <Icon className="size-4" />
        <p className="text-sm font-semibold">{name}</p>
      </div>

      <div className="flex items-center gap-1 rounded bg-slate-100 py-1 px-3 w-16  text-sm font-semibold text-slate-400">
        <ControllerIcon className="size-4" />
        {"+"}
        <p>{controllerCount}</p>
      </div>
    </div>
  );
};
