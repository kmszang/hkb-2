import { default as TransactionItem } from './TransactionItem'
import { domRenderer } from '../../utils/wooact'

let transactionitemComponent: TransactionItem
let transactionitemElement: HTMLElement
let app: HTMLElement = null

beforeAll(() => {
  document.body.innerHTML = '<div id=Test>' + '</div>'
  app = document.querySelector('#Test')
})

beforeEach(() => {
  transactionitemComponent = new TransactionItem()
  domRenderer(transactionitemComponent, app)
  transactionitemElement = transactionitemComponent.getElement()
})

afterEach(() => {
  transactionitemElement.remove()
})

afterAll(() => {
  app.remove()
})

describe('[TransactionItem Component]', () => {
  test('TransactionItem이 정상적으로 렌더된다.', () => {
    //given
    // rendered

    // when
    // rendered

    // then
    expect(app.hasChildNodes).toBeTruthy()
    expect(app.contains(transactionitemElement)).toBeTruthy()
  })
})



