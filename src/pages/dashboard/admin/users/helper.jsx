export const calculateAge = (birthdate) => {
  const today = new Date() // Current date
  const birthdateObj = new Date(birthdate) // Birthdate as a Date object

  let age = today.getFullYear() - birthdateObj.getFullYear() // Calculate the difference in years

  // Check if the birthday has already occurred this year
  if (
    today.getMonth() < birthdateObj.getMonth() ||
    (today.getMonth() === birthdateObj.getMonth() &&
      today.getDate() < birthdateObj.getDate())
  ) {
    age-- // Subtract 1 year if the birthday hasn't occurred yet
  }

  return age
}
