interface Props {
  children: React.ReactNode;
}

export const H1: React.FC<Props> = ({ children }) => {
  return <h1 className="font-bold">{children}</h1>;
};
