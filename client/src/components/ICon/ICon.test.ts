import { default as ICon } from './ICon'
import { domRenderer } from '../../utils/wooact'

let iconComponent: ICon
let iconElement: HTMLElement
let app: HTMLElement = null

beforeAll(() => {
  document.body.innerHTML = '<div id=Test>' + '</div>'
  app = document.querySelector('#Test')
})

beforeEach(() => {
  iconComponent = new ICon()
  domRenderer(iconComponent, app)
  iconElement = iconComponent.getElement()
})

afterEach(() => {
  iconElement.remove()
})

afterAll(() => {
  app.remove()
})

describe('[ICon Component]', () => {
  test('ICon이 정상적으로 렌더된다.', () => {
    //given
    // rendered

    // when
    // rendered

    // then
    expect(app.hasChildNodes).toBeTruthy()
    expect(app.contains(iconElement)).toBeTruthy()
  })
})



