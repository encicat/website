interface Props {
  tagline?: string;
}

export const Slider: React.FC<Props> = ({ tagline = '' }) => (
  <div
    className="block relative border-b-gray-100 border-b"
    style={{
      height: 'calc(60dvh - 80px - 40px)',
      backgroundImage: 'url(/images/bg.png)',
    }}
  >
    <div className="relative z-20 flex flex-col items-center justify-center h-full px-4 text-center">
      <div className="text-4xl md:text-7xl">Bienvenido a EnciCat</div>
      <div className="text-lg md:text-2xl">{tagline}</div>
    </div>
  </div>
);
