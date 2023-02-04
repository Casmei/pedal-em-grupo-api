import { isBefore } from 'date-fns';

export const compareDates = (startDate: Date, endDate: Date) => {
  return isBefore(startDate, endDate);
};
