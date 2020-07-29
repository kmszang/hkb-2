import { default as Login } from './Login'
import { domRenderer } from '../../utils/wooact'

let loginComponent: Login
let loginElement: HTMLElement
let app: HTMLElement = null

beforeAll(() => {
  document.body.innerHTML = '<div id=Test>' + '</div>'
  app = document.querySelector('#Test')
})

beforeEach(() => {
  loginComponent = new Login()
  domRenderer(loginComponent, app)
  loginElement = loginComponent.getElement()
})

afterEach(() => {
  loginElement.remove()
})

afterAll(() => {
  app.remove()
})

describe('[Login Component]', () => {
  test('Login이 정상적으로 렌더된다.', () => {
    //given
    // rendered

    // when
    // rendered

    // then
    expect(app.hasChildNodes).toBeTruthy()
    expect(app.contains(loginElement)).toBeTruthy()
  })
})
