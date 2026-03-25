import Link from 'next/link';

import { Button } from '../Button';
import { DateTag } from '../DateTag';
import Image from 'next/image';

interface Props {
  children?: React.ReactNode;
  title: string;
  imgSrc?: string;
  date?: string;
  url: string;
}

export const Card: React.FC<Props> = ({
  children,
  title,
  imgSrc = '',
  date = '',
  url = '',
}) => (
  <div className="bg-white flex flex-col group shadow-sm">
    {imgSrc != null && imgSrc !== '' && (
      <Link className="overflow-hidden relative h-62.5" href={url}>
        <Image
          src={imgSrc}
          alt={title}
          className="transition-all group-hover:scale-115 object-cover"
          fill
        />
      </Link>
    )}
    {date !== '' && <DateTag date={new Date(date)} />}
    <div className="p-8">
      <Link className="text-xl font-bold mb-4 block link" href={url}>
        {title}
      </Link>
      {children && <div className="mb-4">{children}</div>}
      <Button href={url}>Leer más...</Button>
    </div>
  </div>
);
