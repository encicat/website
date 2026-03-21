import {
  differenceInDays,
  differenceInMonths,
  differenceInYears,
} from 'date-fns';

const months = [
  'Ene',
  'Feb',
  'Mar',
  'Abr',
  'May',
  'Jun',
  'Jul',
  'Ago',
  'Sep',
  'Oct',
  'Nov',
  'Dic',
];

export const getMonth = (date: Date) => months[date.getMonth()];
export const getDay = (date: Date) => String(date.getDate()).padStart(2, '0');

export const getAgeMaximized = (date: string) => {
  const now = Date.now();
  const years = differenceInYears(now, date);
  if (years !== 0) {
    return {
      amount: years,
      unit: getYearsUnit(years),
    };
  }

  const months = differenceInMonths(now, date);
  if (months !== 0) {
    return {
      amount: months,
      unit: getMonthsUnit(months),
    };
  }

  const days = differenceInDays(now, date);
  return {
    amount: days,
    unit: getDaysUnit(days),
  };
};

export const getDaysUnit = (n: number) => (n > 1 ? 'días' : 'día');
export const getMonthsUnit = (n: number) => (n > 1 ? 'meses' : 'mes');
export const getYearsUnit = (n: number) => (n > 1 ? 'años' : 'año');
