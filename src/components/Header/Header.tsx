import Image from 'next/image';
import Link from 'next/link';

interface Props {
  logo?: string | null;
  title?: string;
}

export const Header: React.FC<Props> = ({ logo = '', title = '' }) => (
  <div className="w-full px-5 bg-white text-black shadow-[0_4px_6px_-1px_rgba(0,0,0,0.05)]">
    <div className="max-w-5xl m-auto flex justify-between">
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
      <div className="self-center">
        <ul className="grid grid-cols-3 gap-2">
          <li>
            <Link href="/" className="p-5 block text-center">
              Inicio
            </Link>
          </li>
          <li>
            <Link href="/ayudanos" className="p-5 block text-center">
              Ayudanos
            </Link>
          </li>
          <li>
            <Link href="/contacto" className="p-5 block text-center">
              Contacto
            </Link>
          </li>
        </ul>
      </div>
    </div>
  </div>
);
