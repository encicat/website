interface Props {}

export const Slider: React.FC<Props> = () => (
  <div
    className="block relative border-b-gray-100 border-b"
    style={{
      height: 'calc(60dvh - 80px - 40px)',
      backgroundImage: 'url(/images/bg.png)',
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
