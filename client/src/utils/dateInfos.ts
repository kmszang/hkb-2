export type CustomDate = {
  year: number
  month: number
  monthName: string
  date: number
  day: number
  dayName: string
}

export const MONTH_IN_ENG = [
  'JAN',
  'FEB',
  'MAR',
  'APR',
  'MAY',
  'JUN',
  'JUL',
  'AUG',
  'SEP',
  'OCT',
  'NOV',
  'DEC',
]

export const DAY_IN_ENG = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT']

export const getFullDateIn = (year: number, month: number): CustomDate[] => {
  const endDate = new Date(year, month, 0).getDate()
  const startDay = new Date(year, month, 5).getDay()

  const currentMonthDate = [...Array(endDate)].map((_, i) => i + 1)

  return currentMonthDate.map<CustomDate>((date, i) => {
    const monthName = MONTH_IN_ENG[month - 1]
    const day = (startDay + i) % 7
    const dayName = DAY_IN_ENG[day]
    return {
      date,
      year,
      month,
      monthName,
      day,
      dayName,
    }
  })
}

export const getFormattedDate = (date: CustomDate) => {
  return `${date.year}-${getTwoWidthNumber(date.month)}-${getTwoWidthNumber(
    date.date
  )}`
}

export const getTwoWidthNumber = (num: number): string => {
  const numStr = num.toString()

  if (numStr.length === 2) {
    return numStr
  }

  return `0${numStr}`
}
