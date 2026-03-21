import Image from "next/image";

interface Props {
  src: string;
  alt: string;
}

export const Polaroid: React.FC<Props> = ({ src, alt }) => (
  <div className="p-3 pb-10 bg-white shadow-sm absolute w-64 h-64 mt-[-10] ml-[-10] rotate-358">
    <div className="overflow-hidden block w-57 h-51">
      <Image
        className="transition-all hover:scale-115 object-cover object-center block w-57 h-51"
        src={src}
        alt={alt}
      />
    </div>
  </div>
);
