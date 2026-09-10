import { PawPrint } from 'lucide-react';

interface Props {
  title: string;
  subtitle?: string;
}

export const SectionTitle: React.FC<Props> = ({ title, subtitle }) => (
  <div className="mb-10 px-6 lg:px-0">
    {subtitle && (
      <div className="text-md text-gray-400 font-bold text-center uppercase">
        {subtitle}
      </div>
    )}
    <div className={`text-4xl uppercase text-center font-bold`}>{title}</div>
    <div className="flex justify-center mt-4">
      <PawPrint className="text-green-700" />
    </div>
  </div>
);
