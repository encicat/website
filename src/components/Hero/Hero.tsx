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
  <div className="w-full block px-6 py-12 md:p-12 relative shadow-[0_4px_6px_-1px_rgba(0,0,0,0.05)]">
    {bgImgSrc && (
      <>
        <div
          className={`absolute inset-0 -z-10 ${bgFixed ? 'md:bg-fixed' : ''}`}
          style={{
            backgroundImage: `url(${bgImgSrc})`,
          }}
        />
        <div className="absolute inset-0 -z-10 bg-white/80" />
      </>
    )}

    <div className="max-w-5xl mx-auto">{children}</div>
  </div>
);
