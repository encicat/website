'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

interface Props {
  href: string;
  className?: string;
  onClick?: () => void;
  children: React.ReactNode;
}

export const NavLink: React.FC<Props> = ({
  href,
  className,
  onClick,
  children,
}) => {
  const pathname = usePathname();

  return (
    <Link
      href={href}
      className={className}
      onClick={onClick}
      aria-current={pathname === href ? 'page' : undefined}
    >
      {children}
    </Link>
  );
};
