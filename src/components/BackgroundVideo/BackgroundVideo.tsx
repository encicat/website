import { useRef, useEffect, useState } from 'react';

interface Props {
  videoId: string;
}

export const BackgroundVideo: React.FC<Props> = ({ videoId }) => {
  const [shouldLoadVideo, setShouldLoadVideo] = useState(false);
  const containerRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setShouldLoadVideo(true);
            observer.disconnect(); // Deja de observar una vez cargado
          }
        });
      },
      {
        rootMargin: '50px', // Carga un poco antes de que sea visible
        threshold: 0.1,
      },
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => {
      observer.disconnect();
    };
  }, []);

  return (
    <div className='absolute w-full h-full overflow-hidden -z-10'>
      {/* Miniatura de fondo siempre visible mientras carga */}
      <div
        className="absolute inset-0 bg-cover bg-center transition-opacity duration-700"
        style={{
          backgroundImage: `url(https://img.youtube.com/vi/${videoId}/maxresdefault.jpg)`,
          opacity: shouldLoadVideo ? 0 : 1,
        }}
      />

      {/* Iframe del video que se activa cuando es visible */}
      {
        <iframe
          src={`https://www.youtube.com/embed/${videoId}?autoplay=1&mute=1&loop=1&playlist=${videoId}&controls=0&showinfo=0&modestbranding=1&iv_load_policy=3&rel=0&disablekb=1&fs=0&playsinline=1&enablejsapi=0`}
          title="Background video"
          allow="autoplay; encrypted-media"
          className="border-0 absolute inset-0 w-full h-full scale-120 pointer-events-none"
        />
      }

      {/* Overlay oscuro */}
      <div className="absolute inset-0 bg-black/60 z-10" />
    </div>
  );
};
