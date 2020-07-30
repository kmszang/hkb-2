import { default as TransactionList } from './TransactionList'
import { domRenderer } from '../../utils/wooact'

let transactionlistComponent: TransactionList
let transactionlistElement: HTMLElement
let app: HTMLElement = null

beforeAll(() => {
  document.body.innerHTML = '<div id=Test>' + '</div>'
  app = document.querySelector('#Test')
})

beforeEach(() => {
  transactionlistComponent = new TransactionList()
  domRenderer(transactionlistComponent, app)
  transactionlistElement = transactionlistComponent.getElement()
})

afterEach(() => {
  transactionlistElement.remove()
})

afterAll(() => {
  app.remove()
})

describe('[TransactionList Component]', () => {
  test('TransactionList이 정상적으로 렌더된다.', () => {
    //given
    // rendered

    // when
    // rendered

    // then
    expect(app.hasChildNodes).toBeTruthy()
    expect(app.contains(transactionlistElement)).toBeTruthy()
  })
})



