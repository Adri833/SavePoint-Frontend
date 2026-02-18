export const getLastYearRange = (): string => {
  const today = new Date();
  const lastYear = new Date();
  lastYear.setFullYear(today.getFullYear() - 1);

  return `${lastYear.toISOString().split('T')[0]},${today.toISOString().split('T')[0]}`;
};

export const getFromTodayToNextYear = (): string => {
  const today = new Date();
  const nextYear = new Date();
  nextYear.setFullYear(today.getFullYear() + 1);

  return `${today.toISOString().split('T')[0]},${nextYear.toISOString().split('T')[0]}`;
};

export const getCurrentWeekRange = (): string => {
  const today = new Date();
  const first = today.getDate() - today.getDay();
  const last = first + 6;

  const start = new Date(today.setDate(first));
  const end = new Date(today.setDate(last));

  return `${start.toISOString().split('T')[0]},${end.toISOString().split('T')[0]}`;
};
