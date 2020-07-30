import { default as Signup } from './Signup'
import { domRenderer } from '../../utils/wooact'

let signupComponent: Signup
let signupElement: HTMLElement
let app: HTMLElement = null

beforeAll(() => {
  document.body.innerHTML = '<div id=Test>' + '</div>'
  app = document.querySelector('#Test')
})

beforeEach(() => {
  signupComponent = new Signup()
  domRenderer(signupComponent, app)
  signupElement = signupComponent.getElement()
})

afterEach(() => {
  signupElement.remove()
})

afterAll(() => {
  app.remove()
})

describe('[Signup Component]', () => {
  test('Signup이 정상적으로 렌더된다.', () => {
    //given
    // rendered

    // when
    // rendered

    // then
    expect(app.hasChildNodes).toBeTruthy()
    expect(app.contains(signupElement)).toBeTruthy()
  })
})



