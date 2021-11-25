export function timeFrom(timestamp) {
  const now = new Date();
  const created = new Date(+timestamp);
  const diff = timeDifference(now, created);
  let timeString = '';
  if (diff.seconds > 0) {
    timeString = ' ' + diff.seconds + ' ' + declOfNum(diff.seconds, ['секунду', 'секунды', 'секунд']);
  }
  if (diff.minutes > 0) {
    timeString = ' ' + diff.minutes + ' ' + declOfNum(diff.minutes, ['минуту', 'минуты', 'минут']);
  }
  if (diff.hours > 0) {
    timeString = ' ' + diff.hours + ' ' + declOfNum(diff.hours, ['час', 'часа', 'часов']) + timeString;
  }
  if (diff.month > 0) {
    timeString = ' ' + diff.month + ' ' + declOfNum(diff.month, ['месяц', 'месяца', 'месяцев']) + timeString;
  }
  if (diff.year > 0) {
    timeString = diff.year + ' ' + declOfNum(diff.year, ['год', 'года', 'лет']) + timeString;
  }
  return timeString;
  // 1. 1 минуту назад
  // 2. 5 минут назад
  // 3. 10 минут назад
  // 4. 30 минут назад
  // 5. hours.minutes
  // 6. day.month
  // 7. day.moth.year
};

function timeDifference(date1, date2) {
  let difference = date1.getTime() - date2.getTime();
  const year = date1.getYear() - date2.getYear();
  const month = year > 0 ? (date1.getMonth() - date2.getMonth() - year * 12) : date1.getMonth() - date2.getMonth();

  const days_ = Math.floor(difference / 1000 / 60 / 60 / 24);
  const days = monthDays(date1, year, month, days_);
  difference -= days_ * 1000 * 60 * 60 * 24;
  const hours = Math.floor(difference / 1000 / 60 / 60);
  difference -= hours * 1000 * 60 * 60;
  const minutes = Math.floor(difference / 1000 / 60);
  difference -= minutes * 1000 * 60;
  const seconds = Math.floor(difference / 1000);
  return { year, month, days, hours, minutes, seconds };
};

function monthDays(date1, year, month, days) {
  let newDate1;
  if (year > 0) {
    newDate1 = new Date(date1.getYear() - year, date1.getMonth(), date1.getDate());
  } else {
    newDate1 = date1;
  }
  let daysSum = 0;
  for (let i = 0; i < month; i++) {
    const days1 = new Date(newDate1.getYear(), newDate1.getMonth() + i, 0).getDate();
    daysSum += days1;
  }
  return (days - daysSum);
};

function declOfNum(n, textForms) {
  n = Math.abs(n) % 100;
  const n1 = n % 10;
  if (n > 10 && n < 20) { return textForms[2]; }
  if (n1 > 1 && n1 < 5) { return textForms[1]; }
  if (n1 === 1) { return textForms[0]; }
  return textForms[2];
};
