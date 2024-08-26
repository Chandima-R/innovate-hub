interface Props {
  title: string;
}

export const CategotyTitle = ({ title }: Props) => {
  return <div className="font-semibold text-2xl">{title}</div>;
};
