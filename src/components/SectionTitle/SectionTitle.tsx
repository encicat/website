import { PawPrint } from 'lucide-react';

interface Props {
  title: string;
  subtitle?: string;
}

export const SectionTitle: React.FC<Props> = ({ title, subtitle }) => (
  <div className="mb-20">
    {subtitle && (
      <div
        className={`
text-md text-gray-400 font-bold text-center uppercase
before:content[] before:inline-block before:relative before:top-[-7] before:w-[32] before:h-[2] before:mr-[10] before:bg-gray-400
after:content[]  after:inline-block  after:relative  after:top-[-7]  after:w-[32] after:h-[2] after:ml-[10] after:bg-gray-400`}
      >
        {subtitle}
      </div>
    )}
    <div className={`text-4xl uppercase text-center font-bold`}>{title}</div>
    <div className="flex justify-center mt-4">
      <PawPrint className='text-green-700' />
    </div>
  </div>
);
