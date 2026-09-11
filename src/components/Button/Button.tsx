'use client';

import Link from 'next/link';

interface Props {
  children: React.ReactNode;
  href?: string;
  className?: string;
  isCircle?: boolean;
  onClick?: () => void;
  ariaLabel?: string;
}

export const Button: React.FC<Props> = ({
  children,
  href,
  onClick,
  className = '',
  isCircle = false,
  ariaLabel,
}) => {
  const baseClassName = `transition-all bg-green-700 hover:bg-green-800 rounded-3xl inline-block ${isCircle ? 'px-2' : 'px-6'} py-2 text-white font-bold`;
  const finalClassName = `${baseClassName} ${className}`;

  if (!href) {
    return (
      <button
        type="button"
        className={finalClassName}
        onClick={onClick}
        aria-label={ariaLabel}
      >
        {children}
      </button>
    );
  }

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
      aria-label={ariaLabel}
    >
      {children}
    </Tag>
  );
};
