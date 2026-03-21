import { SiPaypal } from '@icons-pack/react-simple-icons';
import { Landmark } from 'lucide-react';
import Image from 'next/image';

import { TextCard } from '../TextCard';

const icons = {
  bizum: (
    <Image
      src="/images/bizum.svg"
      alt="Logotipo de Bizum"
      width={24}
      height={24}
    />
  ),
  teaming: (
    <Image
      src="/images/teaming.svg"
      alt="Logotipo de Teaming"
      width={24}
      height={24}
    />
  ),
  paypal: <SiPaypal />,
  'lista de deseos de amazon': (
    <Image
      src="/images/amazon.svg"
      alt="Logotipo de Amazon"
      width={24}
      height={24}
    />
  ),
  'cuenta bancaria': <Landmark />,
};

function isValidKey(key: string): key is keyof typeof icons {
  return key in icons;
}

const getIcon = (name: string) => {
  const key = name.toLowerCase();
  if (isValidKey(key)) {
    return icons[key];
  }
};

interface Props {
  name: string;
  url?: string;
  code?: string;
  children: React.ReactNode;
}

export const DonationItem: React.FC<Props> = ({
  name,
  url = '',
  code = '',
  children,
}) => {
  return (
    <div>
      <TextCard icon={getIcon(name)} title={name} url={url}>
        <div className="text-center">
          {code !== '' && <div className="text-xl font-bold mb-4">{code}</div>}
          <div>{children}</div>
        </div>
      </TextCard>
    </div>
  );
};
