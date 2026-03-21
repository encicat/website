import { getSocialIcon, SocialNetworks } from '@/src/helpers/social';

import { Title } from '../Title';
import { Mail } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';

interface Props {
  pageTitle?: string;
  socials_networks?: SocialNetworks;
  logo?: string | null;
  email?: string;
}

export const Footer: React.FC<Props> = ({
  pageTitle = '',
  logo,
  socials_networks = [],
  email = '',
}) => {
  return (
    <div className="w-full py-8 px-5 mb-8 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.05)]">
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
                  <a href={item.url} target="_blank" className="link">
                    <Icon title={item.name} />
                  </a>
                </li>
              );
            })}
          </ul>
        </div>
        {/* Enlaces */}
        <div>
          <Title>Enlaces</Title>
          <div className="flex flex-col">
            <Link href={'/'} className="link">
              Inicio
            </Link>
            <Link href={'/adopciones'} className="link">
              Adopciones
            </Link>
            <Link href={'/posts'} className="link">
              Noticias
            </Link>
            <Link href={'/Ayudanos'} className="link">
              Ayudanos
            </Link>
            <Link href={'/Contacto'} className="link">
              Contacto
            </Link>
          </div>
        </div>
        {/* Contactanos */}
        <div>
          <Title>Contactanos</Title>
          <a href={`mailto:${email}`} className="link">
            <Mail className="inline" /> {email}
          </a>
        </div>
      </div>
      <div className="max-w-5xl m-auto mt-8 text-gray-500 text-center">
        <hr className="border-gray-200 mb-8" />
        <p>
          🄯 {new Date().getFullYear()} {pageTitle}. Algunos derechos reservados
          - Contenidos bajo licencia libre.
        </p>
        <p>
          <Link href="/terminos-y-condiciones" className="link">
            Términos y condiciones
          </Link>{' '}
          |{' '}
          <Link href="/politica-de-privacidad" className="link">
            Política de privacidad
          </Link>
        </p>
      </div>
    </div>
  );
};
