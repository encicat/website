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
        <a href={`mailto:${email}`} className="flex items-center">
          <Mail className="mr-2" />
          {email}
        </a>
        {phone !== '' && (
          <a href={toTelHref(phone)} className="flex items-center">
            <Phone className="mr-2" />
            {phone}
          </a>
        )}
      </div>
      <div className="flex">
        <ul className="flex">
          {socials_networks.map((item) => {
            const Icon = getSocialIcon(item.name);
            return (
              <li key={item.name} className="pl-2">
                <a href={item.url} target="_blank" rel="noopener noreferrer">
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
