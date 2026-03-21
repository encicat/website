interface Props {
  children: React.ReactNode;
}

export const Grid: React.FC<Props> = ({ children }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 px-4 lg:px-0">
      {children}
    </div>
  );
};
