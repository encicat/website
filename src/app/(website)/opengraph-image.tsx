import { ImageResponse } from 'next/og';

import { getCachedSettings } from '@/src/helpers/cached';

export const alt = 'EnciCat, protectora de animales';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default async function Image() {
  const settings = await getCachedSettings();

  return new ImageResponse(
    <div
      style={{
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#008138',
        color: '#ffffff',
        textAlign: 'center',
        padding: '0 80px',
      }}
    >
      <div style={{ fontSize: 120, fontWeight: 700 }}>
        {settings.title ?? 'EnciCat'}
      </div>
      <div style={{ fontSize: 44, marginTop: 24 }}>{settings.slogan ?? ''}</div>
    </div>,
    { ...size },
  );
}
