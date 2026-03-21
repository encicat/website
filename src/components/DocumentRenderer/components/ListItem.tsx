interface Props {
  children: React.ReactNode;
}

export const ListItem: React.FC<Props> = ({ children }) => {
  return <li className="list-disc ml-4">{children}</li>;
};
