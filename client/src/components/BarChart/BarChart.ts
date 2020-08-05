import { Component } from '../../utils/wooact'
import { div, section, svg, p } from '../../utils/wooact/defaultElements'

interface IProps {}
interface IState {}
class BarChart extends Component<IProps, IState> {
  private svgWidth: number
  private svgHeight: number

  constructor() {
    // super get props and state, if not existed just send null or nothing.
    super()

    Object.setPrototypeOf(this, BarChart.prototype)

    // svg의 크기를 정한다
    this.svgWidth = 200
    this.svgHeight = 500
    this.init()
  }
  makeListItemStyle(barHeight, barPadding) {
    const pStyle = document.createElement('style')
    pStyle.type = 'text/css'
    pStyle.innerHTML = `.list-item{padding-top: ${
      (barHeight - barPadding - 12) / 2
    }px; height : ${barHeight - barPadding}px; margin-bottom : ${barPadding}px}`

    document.getElementsByTagName('head')[0].appendChild(pStyle)
  }
  loopDateSet() {
    const dataSet = [
      {
        category: '생활',
        price: 315000,
      },
      {
        category: '식비',
        price: 72000,
      },
      {
        category: '교통',
        price: 18000,
      },
      {
        category: '쇼핑/뷰티',
        price: 18000,
      },
      {
        category: '의료/건강',
        price: 9000,
      },
    ]

    const barPadding = 5
    const totalMoney = 444790
    const barHeight = this.svgHeight / dataSet.length

    this.makeListItemStyle(barHeight, barPadding)

    let i = 0

    const rectList = []
    const $svg = this.makeSvg()
    const categoryList = []
    const percentList = []
    const priceList = []

    dataSet.forEach((data) => {
      const $rect = this.makeRect({
        data,
        barHeight,
        i,
        totalMoney,
        barPadding,
      })
      $svg.appendChild($rect)
      categoryList.push(this.makeCategory(data))
      percentList.push(this.makePercent(data, totalMoney))
      priceList.push(this.makePrice(data))
      i++
    })
    return { $svg, categoryList, percentList, priceList }
  }
  makeRect({ data, barHeight, i, totalMoney, barPadding }) {
    const $rect = document.createElementNS('http://www.w3.org/2000/svg', 'rect')
    const percent = (data.price / totalMoney) * 100
    const translate = [0, barHeight * i]
    $rect.setAttribute('width', percent + '%')
    $rect.setAttribute('height', String(barHeight - barPadding))
    $rect.setAttribute('transform', 'translate(' + translate + ')')
    $rect.setAttribute('class', 'line')

    const $animate = this.makeAnimtaterForRect(percent)
    $rect.appendChild($animate)

    return $rect
  }

  makeAnimtaterForRect(percent) {
    const $animate = document.createElementNS(
      'http://www.w3.org/2000/svg',
      'animate'
    )
    $animate.setAttribute('attribute', 'CSS')
    $animate.setAttribute('attributeName', 'width')
    $animate.setAttribute('from', '0')
    $animate.setAttribute('to', percent + '%')
    $animate.setAttribute('dur', '1s')

    return $animate
  }

  makeCategory(data) {
    return p({ textContent: data.category, className: 'list-item' })
  }
  makePercent(data, totalMoney) {
    const percent = Math.floor((data.price / totalMoney) * 100) + '%'
    return p({ textContent: percent, className: 'list-item' })
  }
  makePrice(data) {
    return p({ textContent: data.price + '원', className: 'list-item' })
  }
  makeSvg() {
    const $svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg')
    $svg.setAttribute('width', this.svgWidth + 'px')
    $svg.setAttribute('height', this.svgHeight + 'px')
    $svg.setAttribute('id', 'bar-chart')
    return $svg
  }
  render() {
    const { $svg, categoryList, percentList, priceList } = this.loopDateSet()

    return section(
      { className: 'bar-chart-box' },
      div({ id: 'category-list', class: 'list' }, ...categoryList),
      div({ id: 'percent-list', class: 'list' }, ...percentList),
      $svg,
      div({ id: 'price-list', class: 'list' }, ...priceList)
    )
  }
}

export default BarChart
