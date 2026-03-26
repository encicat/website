import { Mail } from 'lucide-react';

import { getSocialIcon, type SocialNetworks } from '@/src/helpers/social';

interface Props {
  socials_networks?: SocialNetworks;
  email: string;
}

export const TopBar: React.FC<Props> = ({ email, socials_networks = [] }) => (
  <div className="w-full py-2 px-5 bg-green-800 text-white">
    <div className="max-w-5xl m-auto flex justify-between">
      <a href={`mailto:${email}`} className="flex">
        <Mail className="mr-2" />
        {email}
      </a>
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
