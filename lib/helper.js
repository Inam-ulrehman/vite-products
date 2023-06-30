//  helper functions for the app

//================>>>> Capitalize first Letter

export const capitalizeFirstLetter = (string) => {
  return string.charAt(0).toUpperCase() + string.slice(1)
}

//================>>>> Add object in state
export const addObjectInState = (payload, state) => {
  const objectArray = Object.entries(payload)
  return objectArray.forEach(([key, value]) => {
    state[key] = value
  })
}
