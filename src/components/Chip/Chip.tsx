interface Props {
  children: React.ReactNode;
  icon?: React.ReactNode;
  title?: string;
}

export const Chip: React.FC<Props> = ({ children, icon, title = '' }) => {
  return (
    <div
      className="bg-green-100 inline-block rounded-full px-4 py-2"
      title={title}
    >
      <div className="flex">
        {icon && <div className="mr-2">{icon}</div>}
        {children}
      </div>
    </div>
  );
};
