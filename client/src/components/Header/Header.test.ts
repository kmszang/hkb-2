import { default as Header } from './Header'
import { domRenderer } from '../../utils/wooact'

let headerComponent: Header
let headerElement: HTMLElement
let app: HTMLElement = null

beforeAll(() => {
  document.body.innerHTML = '<div id=Test>' + '</div>'
  app = document.querySelector('#Test')
})

beforeEach(() => {
  headerComponent = new Header()
  domRenderer(headerComponent, app)
  headerElement = headerComponent.getElement()
})

afterEach(() => {
  headerElement.remove()
})

afterAll(() => {
  app.remove()
})

describe('[Header Component]', () => {
  test('Header이 정상적으로 렌더된다.', () => {
    //given
    // rendered

    // when
    // rendered

    // then
    expect(app.hasChildNodes).toBeTruthy()
    expect(app.contains(headerElement)).toBeTruthy()
  })
})



