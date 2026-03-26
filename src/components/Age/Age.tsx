import { Cake } from 'lucide-react';

import { getAgeMaximized } from '@/src/helpers/date';
import { Chip } from '../Chip';

interface Props {
  birthdate: string;
}

export const Age: React.FC<Props> = ({ birthdate }) => {
  const age = getAgeMaximized(birthdate);
  return <Chip icon={<Cake />}>{`${age.amount} ${age.unit}`}</Chip>;
};
