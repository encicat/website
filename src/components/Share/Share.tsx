'use client';

import * as React from 'react';

import { networks } from './networks';

interface Props {
  shareText?: string;
}

const className =
  'w-10 h-10 transition-all bg-green-700 hover:bg-green-800 rounded-3xl text-white font-bold';
const iconClassName = 'w-10 h-10 px-2 py-2 ';

export const Share: React.FC<Props> = ({ shareText = '' }) => {
  const [url, setUrl] = React.useState<string>();

  React.useEffect(() => {
    setUrl(window.location.href);
  }, []);

  return (
    url && (
      <div>
        <div className="font-bold text-xl mb-2">{shareText}</div>
        <div className="flex gap-2">
          {networks.map(({ Button, Icon }, idx) => (
            <Button url={url} key={idx}>
              <div className={className}>
                <Icon className={iconClassName} />
              </div>
            </Button>
          ))}
        </div>
      </div>
    )
  );
};
