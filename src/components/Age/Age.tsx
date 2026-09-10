import { Cake } from 'lucide-react';

import { getAgeMaximized } from '@/src/helpers/date';
import { Chip } from '../Chip';

interface Props {
  birthdate: string;
  plain?: boolean;
}

export const Age: React.FC<Props> = ({ birthdate, plain = false }) => {
  const age = getAgeMaximized(birthdate);
  const label = `${age.amount} ${age.unit}`;

  return plain ? <span>{label}</span> : <Chip icon={<Cake />}>{label}</Chip>;
};
