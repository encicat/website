interface Props {
  children: React.ReactNode;
}

export const Title: React.FC<Props> = ({ children }) => (
  <div>
    <div className="text-2xl">{children}</div>
    <hr className="border-gray-200 border my-4 w-15" />
  </div>
);
