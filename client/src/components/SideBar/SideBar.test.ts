import { default as SideBar } from './SideBar'
import { domRenderer } from '../../utils/wooact'

let sidebarComponent: SideBar
let sidebarElement: HTMLElement
let app: HTMLElement = null

beforeAll(() => {
  document.body.innerHTML = '<div id=Test>' + '</div>'
  app = document.querySelector('#Test')
})

beforeEach(() => {
  sidebarComponent = new SideBar()
  domRenderer(sidebarComponent, app)
  sidebarElement = sidebarComponent.getElement()
})

afterEach(() => {
  sidebarElement.remove()
})

afterAll(() => {
  app.remove()
})

describe('[SideBar Component]', () => {
  test('SideBar이 정상적으로 렌더된다.', () => {
    //given
    // rendered

    // when
    // rendered

    // then
    expect(app.hasChildNodes).toBeTruthy()
    expect(app.contains(sidebarElement)).toBeTruthy()
  })
})



