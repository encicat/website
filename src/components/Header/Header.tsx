'use client';

import { Menu, X } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';

import { NavLink } from '@/src/components/NavLink';

interface Props {
  logo?: string | null;
  title?: string;
}

const links = [
  { href: '/adopciones', label: 'Adopciones' },
  { href: '/ayudales', label: 'Cómo ayudarles' },
  { href: '/adoptados', label: 'Adoptados' },
  { href: '/quienes-somos', label: 'Quiénes somos' },
  { href: '/contacto', label: 'Contacto' },
];

export const Header: React.FC<Props> = ({ logo = '', title = '' }) => {
  const [open, setOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) {
      return;
    }
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setOpen(false);
      }
    };
    const onPointerDown = (event: PointerEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener('keydown', onKeyDown);
    document.addEventListener('pointerdown', onPointerDown);
    return () => {
      document.removeEventListener('keydown', onKeyDown);
      document.removeEventListener('pointerdown', onPointerDown);
    };
  }, [open]);

  return (
    <div
      ref={menuRef}
      className="w-full px-5 bg-white text-black shadow-[0_4px_6px_-1px_rgba(0,0,0,0.05)]"
    >
      <div className="max-w-5xl m-auto flex items-center justify-between">
        <div className="py-2">
          <Link href="/" title={title}>
            <Image
              src={String(logo)}
              alt={`Logotipo de ${title}`}
              width={200}
              height={64}
              priority
            />
          </Link>
        </div>
        <button
          type="button"
          className="md:hidden p-3"
          aria-label={open ? 'Cerrar menú' : 'Abrir menú'}
          aria-expanded={open}
          aria-controls="main-nav"
          onClick={() => setOpen((value) => !value)}
        >
          {open ? <X aria-hidden="true" /> : <Menu aria-hidden="true" />}
        </button>
        <nav className="hidden md:block self-center">
          <ul className="flex gap-1">
            {links.map(({ href, label }) => (
              <li key={href}>
                <NavLink href={href} className="px-3 py-5 block text-center">
                  {label}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>
      </div>
      <nav id="main-nav" className={`md:hidden ${open ? 'block' : 'hidden'}`}>
        <ul className="flex flex-col pt-4 pb-4">
          {links.map(({ href, label }) => (
            <li key={href}>
              <NavLink
                href={href}
                className="block p-4 text-center text-lg"
                onClick={() => setOpen(false)}
              >
                {label}
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
};
