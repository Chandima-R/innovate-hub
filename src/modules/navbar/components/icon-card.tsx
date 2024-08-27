import { LucideIcon } from "lucide-react";
import { AccordionContent } from "../../../components/ui/accordion";

// type definitions for props of IconCard
interface Props {
  icon: LucideIcon;
  name: string;
}

export const IconCard = ({ icon, name }: Props) => {
  const Icon = icon;
  return (
    <AccordionContent
      className="text-sm font-semibold flex items-center gap-1 cursor-pointer hover:underline ml-4"
      key={name}
    >
      <Icon className="size-4 text-slate-300 -ml-1" />
      <p>{name}</p>
    </AccordionContent>
  );
};
