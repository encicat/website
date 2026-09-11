import { PawPrint } from 'lucide-react';

interface Props {
  title: string;
  subtitle?: string;
  as?: 'h1' | 'h2';
}

export const SectionTitle: React.FC<Props> = ({
  title,
  subtitle,
  as: Heading = 'h2',
}) => (
  <div className="mb-8 px-6 lg:px-0">
    {subtitle && (
      <div className="text-sm text-gray-500 font-bold text-center uppercase">
        {subtitle}
      </div>
    )}
    <Heading className="text-4xl uppercase text-center font-bold">
      {title}
    </Heading>
    <div className="flex justify-center mt-4">
      <PawPrint className="text-green-700" aria-hidden="true" />
    </div>
  </div>
);
