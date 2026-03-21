'use client';

import Image from 'next/image';
import { BackgroundVideo } from '../BackgroundVideo';

interface Props {}

export const Slider: React.FC<Props> = () => (
  <div
    className="block relative border-b-gray-100 border-b"
    style={{
      height: 'calc(60dvh - 80px - 40px)',
      backgroundImage: 'url(/images/bg-256.png)',
    }}
  >
    <div className="relative z-20 flex flex-col items-center justify-center h-full px-4">
      <div className="text-7xl">Bienvenido a EnciCat</div>
      <div className="text-2xl">
        Tu protectora de confianza en nuestro ámbito territorial
      </div>
    </div>
  </div>
);

interface Props1 {
  videoId: string;
}

export const Slider2: React.FC<Props1> = ({ videoId }) => (
  <div
    className="text-white block relative"
    style={{ height: 'calc(100dvh - 80px - 40px)' }}
  >
    <BackgroundVideo videoId={videoId} />

    <div className="relative z-20 flex flex-col items-center justify-end h-full">
      <div className="text-white text-7xl">Bienvenido a EnciCat</div>
      <div className="text-white text-2xl">
        Tu protectora de confianza en nuestro ámbito territorial
      </div>
      <Image src="/images/cat.png" alt="Ornamentación de slider" />
    </div>
  </div>
);
