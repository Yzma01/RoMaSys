const GENDERS = ["masculino", "femenino"];

export function filterByAge(filter, age) {
  filter.rut_min_age = { $lte: age };
  filter.rut_max_age = { $gte: age };
}

export function filterByGoal(filter, additionalData) { 
  console.log("🏠🏠🏠🏠",additionalData.cli_goal.toLowerCase() )
  filter.rut_goal = additionalData.cli_goal.toLowerCase(); 
}

export function filterByGender(filter, additionalData) {
  filter.rut_gender =
    additionalData.cli_gender === GENDERS[0] ||
    additionalData.cli_gender === GENDERS[1]
      ? additionalData.cli_gender
      : GENDERS[0];
}

