const MONTHLY_PAYMENT_TYPE = ["mes", "quincena", "dia"];

export function daysInMonth(month, year) {
  return new Date(year, month + 1, 0).getDate();
}

export function calculateNextPayDate(monthlyType) {
  let today = new Date();
  let nextPaymentDate = new Date(today);

  if (
    monthlyType === MONTHLY_PAYMENT_TYPE[0] &&
    daysInMonth(today.getMonth(), today.getFullYear()) === 30
  ) {
    nextPaymentDate.setDate(today.getDate() + 30);
  } else {
    nextPaymentDate.setDate(today.getDate() + 31);
  }
  if (monthlyType === MONTHLY_PAYMENT_TYPE[1]) {
    nextPaymentDate.setDate(today.getDate() + 15);
  }
  if (monthlyType === MONTHLY_PAYMENT_TYPE[2]) {
    nextPaymentDate.setDate(today.getDate() + 1);
  }
  console.log(nextPaymentDate);
  return nextPaymentDate;
}

export function calculateAge(body) {
  const currentDate = new Date();
  const birthdate = new Date(body.cli_additional_data.cli_birthdate);
  let age = currentDate.getFullYear() - birthdate.getFullYear();

  if (
    currentDate.getMonth() < birthdate.getMonth() ||
    (currentDate.getMonth() === birthdate.getMonth() &&
      currentDate.getDate() < birthdate.getDate())
  ) {
    age--;
  }
  console.log("age", age);
  return age;
}
