interface Props {
  children: React.ReactNode;
  href: string;
}

export const Link: React.FC<Props> = ({ children, href }) => {
  return (
    <a href={href} className="text-blue-600 hover:underline">
      {children}
    </a>
  );
};
