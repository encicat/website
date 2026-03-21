import { getDay, getMonth } from '@/src/helpers/date';

interface Props {
  date: Date;
}

export const DateTag: React.FC<Props> = ({ date }) => (
  <div className="flex text-white">
    <div className="bg-green-800 px-2">{getDay(date)}</div>
    <div className="bg-green-700 px-2">{getMonth(date)}</div>
    <div className="bg-green-600 px-2">{date.getFullYear()}</div>
  </div>
);
