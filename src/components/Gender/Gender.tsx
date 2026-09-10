import { Mars, Venus } from 'lucide-react';

import { Chip } from '../Chip';

const genderMap = {
  male: { text: 'Macho', icon: <Mars /> },
  female: { text: 'Hembra', icon: <Venus /> },
};

interface Props {
  gender: 'male' | 'female';
  iconOnly?: boolean;
}

export const Gender: React.FC<Props> = ({ gender, iconOnly = false }) => {
  const { text, icon } = genderMap[gender];

  if (iconOnly) {
    return (
      <span title={text} aria-label={text} className="text-green-700">
        {icon}
      </span>
    );
  }

  return <Chip icon={icon}>{text}</Chip>;
};
