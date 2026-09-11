interface Props {
  children: React.ReactNode;
}

export const Section: React.FC<Props> = ({ children }) => (
  <div className="max-w-5xl mx-auto pt-12 pb-16">{children}</div>
);
