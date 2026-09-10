interface Props {
  children: React.ReactNode;
}

export const Title: React.FC<Props> = ({ children }) => (
  <div>
    <div className="text-2xl text-center md:text-left">{children}</div>
    <hr className="border-gray-200 border my-4 w-15 mx-auto md:mx-0" />
  </div>
);
