interface Props {
  children: React.ReactNode;
}

export const Paragraph: React.FC<Props> = ({ children }) => {
  return <p className="mb-4">{children}</p>;
};
