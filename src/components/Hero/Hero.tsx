interface Props {
  children: React.ReactNode;
  bgImgSrc?: string;
  bgFixed?: boolean;
}

export const Hero: React.FC<Props> = ({
  children,
  bgImgSrc,
  bgFixed = true,
}) => (
  <div className="w-full block p-12 relative  border-b-gray-100 border-b">
    {bgImgSrc && (
      <div
        className={`absolute inset-0 -z-10 ${bgFixed ? 'bg-fixed' : ''}`}
        style={{
          backgroundImage: `url(${bgImgSrc})`,
        }}
      />
    )}

    <div className="w-5xl mx-auto">{children}</div>
  </div>
);
