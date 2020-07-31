export const getCSVNumber = (num: number) => {
  const regexp = /\B(?=(\d{3})+(?!\d))/g
  const strNum = num.toString().replace(regexp, ',')
  return strNum
}
