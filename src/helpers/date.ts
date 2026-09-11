import {
  differenceInDays,
  differenceInMonths,
  differenceInYears,
} from 'date-fns';

const getDaysUnit = (n: number) => (n > 1 ? 'días' : 'día');
const getMonthsUnit = (n: number) => (n > 1 ? 'meses' : 'mes');
const getYearsUnit = (n: number) => (n > 1 ? 'años' : 'año');

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
