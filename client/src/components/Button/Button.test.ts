import { default as Button } from './Button'
import { domRenderer } from '../../utils/wooact'

let buttonComponent: Button
let buttonElement: HTMLElement
let app: HTMLElement = null

beforeAll(() => {
  document.body.innerHTML = '<div id=Test>' + '</div>'
  app = document.querySelector('#Test')
})

beforeEach(() => {
  buttonComponent = new Button()
  domRenderer(buttonComponent, app)
  buttonElement = buttonComponent.getElement()
})

afterEach(() => {
  buttonElement.remove()
})

afterAll(() => {
  app.remove()
})

describe('[Button Component]', () => {
  test('Button이 정상적으로 렌더된다.', () => {
    //given
    // rendered

    // when
    // rendered

    // then
    expect(app.hasChildNodes).toBeTruthy()
    expect(app.contains(buttonElement)).toBeTruthy()
  })
})



