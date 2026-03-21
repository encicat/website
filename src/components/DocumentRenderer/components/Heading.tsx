interface Props {
  level: number;
  children: React.ReactNode;
}

export const Heading: React.FC<Props> = ({ level, children }) => {
  const Tag = `h${level}` as keyof React.JSX.IntrinsicElements;
  return <Tag className="font-bold">{children}</Tag>;
};
