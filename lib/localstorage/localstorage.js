// =================Get Item From LocalStorage=======================
export const setItemInLocalStorage = (name, item) => {
  if (typeof window !== 'undefined') {
    localStorage.setItem(name, JSON.stringify(item))
  }
}

export const getItemFromLocalStorage = (item) => {
  if (typeof window !== 'undefined') {
    const find = localStorage.getItem(item)
    const result = find ? JSON.parse(find) : null
    return result
  }
}

export const removeItemFromLocalStorage = (item) => {
  if (typeof window !== 'undefined') {
    localStorage.removeItem(item)
  }
}
