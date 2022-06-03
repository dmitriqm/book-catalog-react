export const includesStringInArray = (str: string, array: string[]) => {
  for (let i = 0; i < array.length; i++) {
    if (array[i].toLocaleLowerCase().includes(str.toLocaleLowerCase())) {
      return true
    }
  }

  return false
}
