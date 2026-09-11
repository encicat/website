import { Mail, Phone } from 'lucide-react';

import { toTelHref } from '@/src/helpers/phone';
import { getSocialIcon, type SocialNetworks } from '@/src/helpers/social';

interface Props {
  socials_networks?: SocialNetworks;
  email: string;
  phone?: string;
}

export const TopBar: React.FC<Props> = ({
  email,
  phone = '',
  socials_networks = [],
}) => (
  <div className="w-full py-2 px-5 bg-green-800 text-white">
    <div className="max-w-5xl m-auto flex flex-wrap items-center justify-between gap-x-4 gap-y-1">
      <div className="flex flex-wrap items-center gap-x-4">
        <a href={`mailto:${email}`} aria-label="Escríbenos" className="flex">
          <Mail aria-hidden="true" />
        </a>
        {phone !== '' && (
          <a href={toTelHref(phone)} aria-label="Llámanos" className="flex">
            <Phone aria-hidden="true" />
          </a>
        )}
      </div>
      <div className="flex">
        <ul className="flex">
          {socials_networks.map((item) => {
            const Icon = getSocialIcon(item.name);
            return (
              <li key={item.name} className="pl-2">
                <a
                  href={item.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={item.name}
                >
                  <Icon title={item.name} />
                </a>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  </div>
);
