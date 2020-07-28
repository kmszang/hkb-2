import { default as User } from './User'
import { domRenderer } from '../../utils/wooact'

let userComponent: User
let userElement: HTMLElement
let app: HTMLElement = null

beforeAll(() => {
  document.body.innerHTML = '<div id=Test>' + '</div>'
  app = document.querySelector('#Test')
})

beforeEach(() => {
  userComponent = new User()
  domRenderer(userComponent, app)
  userElement = userComponent.getElement()
})

afterEach(() => {
  userElement.remove()
})

afterAll(() => {
  app.remove()
})

describe('[User Component]', () => {
  test('User이 정상적으로 렌더된다.', () => {
    //given
    // rendered

    // when
    // rendered

    // then
    expect(app.hasChildNodes).toBeTruthy()
    expect(app.contains(userElement)).toBeTruthy()
  })
})



