interface Props {
  children: React.ReactNode;
}

export const Article: React.FC<Props> = ({ children }) => {
  return <article className="bg-red-500">{children}</article>;
};
