import { Mars, Venus } from 'lucide-react';

import { Chip } from '../Chip';

const genderMap = {
  male: { text: 'Macho', icon: <Mars /> },
  female: { text: 'Hembra', icon: <Venus /> },
};

interface Props {
  gender: 'male' | 'female';
}

export const Gender: React.FC<Props> = ({ gender }) => {
  return <Chip icon={genderMap[gender].icon}>{genderMap[gender].text}</Chip>;
};
