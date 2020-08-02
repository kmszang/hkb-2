import { default as AddNewTransaction } from './AddNewTransaction'
import { domRenderer } from '../../utils/wooact'

let addnewtransactionComponent: AddNewTransaction
let addnewtransactionElement: HTMLElement
let app: HTMLElement = null

beforeAll(() => {
  document.body.innerHTML = '<div id=Test>' + '</div>'
  app = document.querySelector('#Test')
})

beforeEach(() => {
  addnewtransactionComponent = new AddNewTransaction()
  domRenderer(addnewtransactionComponent, app)
  addnewtransactionElement = addnewtransactionComponent.getElement()
})

afterEach(() => {
  addnewtransactionElement.remove()
})

afterAll(() => {
  app.remove()
})

describe('[AddNewTransaction Component]', () => {
  test('AddNewTransaction이 정상적으로 렌더된다.', () => {
    //given
    // rendered

    // when
    // rendered

    // then
    expect(app.hasChildNodes).toBeTruthy()
    expect(app.contains(addnewtransactionElement)).toBeTruthy()
  })
})



