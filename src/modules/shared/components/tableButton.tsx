import { Button } from "@/components/ui/button";
import { LucideIcon } from "lucide-react";

interface Props {
  icon: LucideIcon;
  customFn?: () => void;
  count?: number;
  text?: string;
  disabled: boolean;
}

export const TableButton = ({
  icon: Icon,
  customFn,
  count,
  text,
  disabled,
}: Props) => {
  return (
    <Button
      className="border flex items-center justify-center p-1 rounded min-w-10 h-10 w-auto cursor-pointer hover:bg-slate-200"
      onClick={customFn} // Call customFn directly
      variant="ghost"
      disabled={disabled}
    >
      <Icon className="size-4" />
      {count !== undefined && count !== null && (
        <p className="text-sm ml-1">{count}</p>
      )}
      {text && <p className="text-sm ml-1">{text}</p>}
    </Button>
  );
};
