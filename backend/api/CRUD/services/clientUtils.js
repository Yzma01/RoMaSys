const MONTHLY_PAYMENT_TYPE = ["mes", "quincena", "dia"];

export function daysInMonth(month, year) {
  return new Date(year, month + 1, 0).getDate();
}

export function calculateNextPayDate(monthlyType,nextPaymentDate) {
  let today = new Date();

  if(nextPaymentDate < today){
    nextPaymentDate = new Date(today);
  }

  if (monthlyType === MONTHLY_PAYMENT_TYPE[0]) {
    let daysInCurrentMonth = daysInMonth(today.getMonth(), today.getFullYear());
    nextPaymentDate.setDate(today.getDate() + daysInCurrentMonth);
  } else if (monthlyType === MONTHLY_PAYMENT_TYPE[1]) {
    nextPaymentDate.setDate(today.getDate() + 15);
  } else if (monthlyType === MONTHLY_PAYMENT_TYPE[2]) {
    nextPaymentDate.setDate(today.getDate() + 1);
  }

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
