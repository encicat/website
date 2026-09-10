'use client';

import { Menu, X } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';

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

  return (
    <div className="w-full px-5 bg-white text-black shadow-[0_4px_6px_-1px_rgba(0,0,0,0.05)]">
      <div className="max-w-5xl m-auto flex items-center justify-between">
        <div className="py-2">
          <Link href="/" title={title}>
            <Image
              src={String(logo)}
              alt={`Logotipo de ${title}`}
              width={200}
              height={64}
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
          {open ? <X /> : <Menu />}
        </button>
        <nav className="hidden md:block self-center">
          <ul className="flex gap-1">
            {links.map(({ href, label }) => (
              <li key={href}>
                <Link href={href} className="px-3 py-5 block text-center">
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
      <nav id="main-nav" className={`md:hidden ${open ? 'block' : 'hidden'}`}>
        <ul className="flex flex-col pt-4 pb-4">
          {links.map(({ href, label }) => (
            <li key={href}>
              <Link
                href={href}
                className="block p-4 text-center text-lg"
                onClick={() => setOpen(false)}
              >
                {label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
};
