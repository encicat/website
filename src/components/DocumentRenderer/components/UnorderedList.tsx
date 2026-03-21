interface Props {
  children: React.ReactNode;
}

export const UnorderedList: React.FC<Props> = ({ children }) => {
  return <ul className="list-disc">{children}</ul>;
};
