'use client';

import * as React from 'react';

import { Button } from '../Button';
import { hasCookie, setCookie } from 'cookies-next/client';
import { getCookie } from 'cookies-next';

interface Props {
  children: React.ReactNode;
}

export const Cookies: React.FC<Props> = ({ children }) => {
  const [show, setShow] = React.useState(false);

  React.useEffect(() => {
    if (
      !hasCookie('encicat-cookie-banner') ||
      getCookie('encicat-cookie-banner') !== 'hide'
    ) {
      setShow(true);
    }
  }, []);

  return (
    show && (
      <div className="fixed bottom-0 bg-white m-8 p-8 border-green-700 border lg:w-1/2 rounded-4xl z-1000 shadow-xl">
        {children}
        <Button
          onClick={() => {
            setCookie('encicat-cookie-banner', 'hide');
            setShow(false);
            return false;
          }}
        >
          Entendido!
        </Button>
      </div>
    )
  );
};
