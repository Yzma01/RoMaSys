const MONTHLY_PAYMENT_TYPE = ["mes", "quincena", "dia"];

export function daysInMonth(month, year) {
  return new Date(year, month + 1, 0).getDate();
}

export function calculateNextPayDate(monthlyType, nextPaymentDate) {
  let today = new Date();

  if (nextPaymentDate < today) {
    nextPaymentDate = new Date(today);
  }

  let newPaymentDate = new Date(nextPaymentDate);

  if (monthlyType === MONTHLY_PAYMENT_TYPE[0]) {
    let daysInNextMonth = daysInMonth(
      newPaymentDate.getMonth(),
      newPaymentDate.getFullYear()
    );
    newPaymentDate.setDate(newPaymentDate.getDate() + daysInNextMonth);
  } else if (monthlyType === MONTHLY_PAYMENT_TYPE[1]) {
    newPaymentDate.setDate(newPaymentDate.getDate() + 15);
  } else if (monthlyType === MONTHLY_PAYMENT_TYPE[2]) {
    newPaymentDate.setDate(newPaymentDate.getDate() + 1);
  }

  return newPaymentDate;
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
