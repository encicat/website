import Image from 'next/image';
import Link from 'next/link';

import { Button } from '../Button';

interface Props {
  children?: React.ReactNode;
  title: string;
  titleExtra?: React.ReactNode;
  imgSrc?: string;
  url: string;
  priority?: boolean;
}

export const Card: React.FC<Props> = ({
  children,
  title,
  titleExtra,
  imgSrc = '',
  url = '',
  priority = false,
}) => (
  <div className="bg-white flex flex-col group shadow-sm">
    {imgSrc != null && imgSrc !== '' && (
      <Link className="overflow-hidden relative h-62.5" href={url}>
        <Image
          src={imgSrc}
          alt={title}
          className="transition-all group-hover:scale-115 object-cover"
          fill
          sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
          priority={priority}
        />
      </Link>
    )}
    <div className="p-8">
      <div className="flex items-center gap-2 mb-4">
        <Link className="text-xl font-bold link" href={url}>
          {title}
        </Link>
        {titleExtra}
      </div>
      {children && <div className="mb-4">{children}</div>}
      <Button href={url} ariaLabel={`Leer más sobre ${title}`}>
        Leer más...
      </Button>
    </div>
  </div>
);
