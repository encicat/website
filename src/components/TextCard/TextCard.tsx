interface Props {
  icon?: React.ReactNode;
  title?: string;
  url?: string;
  children: React.ReactNode;
}
export const TextCard: React.FC<Props> = ({
  icon,
  title,
  children,
  url = '',
}) => (
  <div className="bg-neutral-50 rounded-2xl p-8 flex flex-col items-center">
    {icon && (
      <div className="bg-green-800 w-10 h-10 rounded-full text-white flex items-center justify-center">
        {icon}
      </div>
    )}
    {title && (
      <div className="m-4 text-2xl text-center">
        {url !== '' ? (
          <a
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            className="link"
          >
            {title}
          </a>
        ) : (
          title
        )}
      </div>
    )}
    <div>{children}</div>
  </div>
);
