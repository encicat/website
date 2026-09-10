interface Props {
  children: React.ReactNode;
  bgImgSrc?: string;
  bgColor?: string;
  bgFixed?: boolean;
  rised?: boolean;
  inset?: boolean;
}

export const Section: React.FC<Props> = ({
  children,
  bgImgSrc,
  bgColor = 'transparent',
  bgFixed = true,
  rised = false,
  inset = false,
}) => (
  <div
    className={`w-full relative ${rised ? 'shadow-sm' : ''} ${inset ? 'inset-shadow-sm' : ''}`}
  >
    {(bgImgSrc || bgColor) && (
      <div
        className={`absolute inset-0 -z-10 ${bgFixed ? 'md:bg-fixed' : ''}`}
        style={{
          ...(bgImgSrc
            ? {
                backgroundImage: `url(${bgImgSrc})`,
              }
            : {}),
          backgroundColor: bgColor,
        }}
      />
    )}
    <div className="max-w-5xl mx-auto pt-12 pb-16">{children}</div>
  </div>
);
