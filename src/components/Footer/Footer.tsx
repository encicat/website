import { Mail, Phone } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

import { NavLink } from '@/src/components/NavLink';
import { toTelHref } from '@/src/helpers/phone';
import { getSocialIcon, type SocialNetworks } from '@/src/helpers/social';
import { Title } from '../Title';

interface Props {
  pageTitle?: string;
  socials_networks?: SocialNetworks;
  logo?: string | null;
  email?: string;
  phone?: string;
}

export const Footer: React.FC<Props> = ({
  pageTitle = '',
  logo,
  socials_networks = [],
  email = '',
  phone = '',
}) => {
  return (
    <footer className="w-full py-8 px-5 mb-8 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.05)]">
      <div className="max-w-5xl m-auto grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Logo */}
        <div className="text-center">
          <Link href="/" className="inline-block">
            <Image
              src={String(logo)}
              alt={`Logotipo de ${pageTitle}`}
              width={200}
              height={64}
            />
          </Link>
          <ul className="flex justify-center mt-4">
            {socials_networks.map((item) => {
              const Icon = getSocialIcon(item.name);
              return (
                <li key={item.name} className="pl-2">
                  <a
                    href={item.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={item.name}
                    className="link"
                  >
                    <Icon title={item.name} size={28} />
                  </a>
                </li>
              );
            })}
          </ul>
        </div>
        {/* Enlaces */}
        <div>
          <Title>Enlaces</Title>
          <div className="flex flex-col items-center md:items-start">
            <NavLink href="/adopciones" className="link">
              Adopciones
            </NavLink>
            <NavLink href="/ayudales" className="link">
              Cómo ayudarles
            </NavLink>
            <NavLink href="/adoptados" className="link">
              Adoptados
            </NavLink>
            <NavLink href="/quienes-somos" className="link">
              Quiénes somos
            </NavLink>
            <NavLink href="/contacto" className="link">
              Contacto
            </NavLink>
          </div>
        </div>
        {/* Contáctanos */}
        <div className="text-center md:text-left">
          <Title>Contáctanos</Title>
          <a href={`mailto:${email}`} className="link block">
            <Mail className="inline" aria-hidden="true" /> {email}
          </a>
          {phone !== '' && (
            <a href={toTelHref(phone)} className="link block mt-1">
              <Phone className="inline" aria-hidden="true" /> {phone}
            </a>
          )}
        </div>
      </div>
      <div className="max-w-5xl m-auto mt-8 text-gray-500 text-center">
        <hr className="border-gray-200 mb-8" />
        <p>
          🄯 {new Date().getFullYear()} {pageTitle}. Algunos derechos reservados
          - Contenidos bajo licencia libre.
        </p>
        <p>
          <Link href="/aviso-legal" className="link">
            Aviso legal
          </Link>{' '}
          |{' '}
          <Link href="/terminos-y-condiciones" className="link">
            Términos y condiciones
          </Link>{' '}
          |{' '}
          <Link href="/politica-de-privacidad" className="link">
            Política de privacidad
          </Link>{' '}
          |{' '}
          <Link href="/accesibilidad" className="link">
            Accesibilidad
          </Link>
        </p>
      </div>
    </footer>
  );
};
