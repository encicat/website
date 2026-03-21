'use client';

import Link from 'next/link';

interface Props {
  children: React.ReactNode;
  href?: string;
  className?: string;
  isCircle?: boolean;
  onClick?: () => void;
}

export const Button: React.FC<Props> = ({
  children,
  href = '#',
  onClick = () => {},
  className = '',
  isCircle = false,
}) => {
  const baseClassName = `transition-all bg-green-700 hover:bg-green-800 rounded-3xl inline-block ${isCircle ? 'px-2' : 'px-6'} py-2 text-white font-bold`;
  const finalClassName = `${baseClassName} ${className}`;
  const isExternal = href.startsWith('http');
  const Tag = isExternal ? 'a' : Link;
  return (
    <Tag
      href={href}
      {...(isExternal
        ? {
            target: '_blank',
            rel: 'noopener noreferrer',
          }
        : {})}
      className={finalClassName}
      onClick={onClick}
    >
      {children}
    </Tag>
  );
};
