import { default as BarChart } from './BarChart'
import { domRenderer } from '../../utils/wooact'

let barchartComponent: BarChart
let barchartElement: HTMLElement
let app: HTMLElement = null

beforeAll(() => {
  document.body.innerHTML = '<div id=Test>' + '</div>'
  app = document.querySelector('#Test')
})

beforeEach(() => {
  barchartComponent = new BarChart()
  domRenderer(barchartComponent, app)
  barchartElement = barchartComponent.getElement()
})

afterEach(() => {
  barchartElement.remove()
})

afterAll(() => {
  app.remove()
})

describe('[BarChart Component]', () => {
  test('BarChart이 정상적으로 렌더된다.', () => {
    //given
    // rendered

    // when
    // rendered

    // then
    expect(app.hasChildNodes).toBeTruthy()
    expect(app.contains(barchartElement)).toBeTruthy()
  })
})



