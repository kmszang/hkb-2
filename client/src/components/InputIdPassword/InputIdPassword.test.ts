import { default as InputIdPassword } from './InputIdPassword'
import { domRenderer } from '../../utils/wooact'

let inputidpasswordComponent: InputIdPassword
let inputidpasswordElement: HTMLElement
let app: HTMLElement = null

beforeAll(() => {
  document.body.innerHTML = '<div id=Test>' + '</div>'
  app = document.querySelector('#Test')
})

beforeEach(() => {
  inputidpasswordComponent = new InputIdPassword()
  domRenderer(inputidpasswordComponent, app)
  inputidpasswordElement = inputidpasswordComponent.getElement()
})

afterEach(() => {
  inputidpasswordElement.remove()
})

afterAll(() => {
  app.remove()
})

describe('[InputIdPassword Component]', () => {
  test('InputIdPassword이 정상적으로 렌더된다.', () => {
    //given
    // rendered

    // when
    // rendered

    // then
    expect(app.hasChildNodes).toBeTruthy()
    expect(app.contains(inputidpasswordElement)).toBeTruthy()
  })
})



