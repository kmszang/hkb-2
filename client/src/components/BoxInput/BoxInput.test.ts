import { default as BoxInput } from './BoxInput'
import { domRenderer } from '../../utils/wooact'

let boxinputComponent: BoxInput
let boxinputElement: HTMLElement
let app: HTMLElement = null

beforeAll(() => {
  document.body.innerHTML = '<div id=Test>' + '</div>'
  app = document.querySelector('#Test')
})

beforeEach(() => {
  boxinputComponent = new BoxInput()
  domRenderer(boxinputComponent, app)
  boxinputElement = boxinputComponent.getElement()
})

afterEach(() => {
  boxinputElement.remove()
})

afterAll(() => {
  app.remove()
})

describe('[BoxInput Component]', () => {
  test('BoxInput이 정상적으로 렌더된다.', () => {
    //given
    // rendered

    // when
    // rendered

    // then
    expect(app.hasChildNodes).toBeTruthy()
    expect(app.contains(boxinputElement)).toBeTruthy()
  })
})



