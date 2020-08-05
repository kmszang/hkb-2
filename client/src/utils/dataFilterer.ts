import { ITransactionResponse } from '../api/transaction'

interface IFilteredByDayTransactions {
  [date: string]: {
    transactions: ITransactionResponse[]
    sumOfIncome: number
    sumOfOutcome: number
  }
}

export const filterByDate = (
  transactions: ITransactionResponse[]
): IFilteredByDayTransactions => {
  return transactions.reduce<IFilteredByDayTransactions>((acc, transaction) => {
    const key = transaction.createdAt.toString().split('T')[0]
    if (!acc[key]) {
      acc[key] = { transactions: [], sumOfOutcome: 0, sumOfIncome: 0 }
    }

    acc[key].transactions.push(transaction)

    if (transaction.isIncome) {
      acc[key].sumOfIncome += transaction.price
    } else {
      acc[key].sumOfOutcome += transaction.price
    }

    return acc
  }, {})
}

export const getRecordedDate = (transactions: ITransactionResponse[]) => {
  // const getDatesInfo = (date: string) => date.split('-').map(v => parseInt(v));
  // const [year, month, date] =getDatesInfo()
  //   const getNumYear = (date: string) => parseInt(date.split('-')[1])
  const getNumDate = (date: string) => parseInt(date.split('-')[2])

  const recordedDates = Array.from(
    new Set(
      transactions.map(({ createdAt }) => createdAt.toString().split('T')[0])
    )
  ).sort((a, b) => getNumDate(b) - getNumDate(a))

  return recordedDates
}
