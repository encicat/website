'use client';

import * as React from 'react';

import { Button } from '../Button';

const STORAGE_KEY = 'encicat-cookie-banner';

interface Props {
  children: React.ReactNode;
}

export const Cookies: React.FC<Props> = ({ children }) => {
  const [show, setShow] = React.useState(false);

  React.useEffect(() => {
    setShow(window.localStorage.getItem(STORAGE_KEY) !== 'hide');
  }, []);

  return (
    show && (
      <div className="fixed bottom-0 bg-white m-8 p-8 border-green-700 border lg:w-1/2 rounded-4xl z-1000 shadow-xl">
        {children}
        <Button
          onClick={() => {
            window.localStorage.setItem(STORAGE_KEY, 'hide');
            setShow(false);
          }}
        >
          Entendido!
        </Button>
      </div>
    )
  );
};
