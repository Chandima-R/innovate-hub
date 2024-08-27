import { LucideIcon } from "lucide-react";

interface Props {
  icon: LucideIcon;
  customFn?: () => void;
  count?: number;
}

export const IconButton = ({ icon, customFn, count }: Props) => {
  const Icon = icon;
  return (
    <div
      className="border flex items-center justify-center p-1 rounded w-auto h-8 cursor-pointer hover:bg-slate-200"
      onClick={() => customFn}
    >
      <Icon className="size-4" />
      <p className="text-xs ml-1">{count}</p>
    </div>
  );
};
