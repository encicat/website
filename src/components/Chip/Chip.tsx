interface Props {
  children: React.ReactNode;
  icon?: React.ReactNode;
  title?: string;
  style?: 'info' | 'error';
}

const colorMap = {
  info: 'bg-green-100',
  error: 'bg-red-100',
};

export const Chip: React.FC<Props> = ({
  children,
  icon,
  title = '',
  style = 'info',
}) => {
  return (
    <div
      className={`${colorMap[style]} inline-block rounded-full px-4 py-2`}
      title={title}
    >
      <div className="flex">
        {icon && <div className="mr-2">{icon}</div>}
        {children}
      </div>
    </div>
  );
};
