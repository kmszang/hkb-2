import { Component } from '../../utils/wooact'
import { div, section, svg, p } from '../../utils/wooact/defaultElements'
import { ITransactionResponse } from '../../api/transaction'
interface IProps {
  transaction: { price: number; categoryName: string }[]
}
interface IState {}
class BarChart extends Component<IProps, IState> {
  private svgWidth: number
  private svgHeight: number
  private totalMoney: number
  private dataSet: ITransactionResponse[]
  constructor(props: IProps) {
    // super get props and state, if not existed just send null or nothing.
    super(props)

    Object.setPrototypeOf(this, BarChart.prototype)

    // svg의 크기를 정한다
    this.svgWidth = 600
    this.svgHeight = 500
    this.dataSet = this.props.transaction
    console.log(this.dataSet)
    this.totalMoney = this.getTotalMoney()
    this.init()
  }
  getTotalMoney() {
    let totalMoney = 0
    this.dataSet.forEach((data) => {
      totalMoney += data.price
    })
    return totalMoney
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
    const barPadding = 5
    const barHeight = this.svgHeight / this.dataSet.length

    this.makeListItemStyle(barHeight, barPadding)

    let i = 0

    const rectList = []
    const $svg = this.makeSvg()
    const categoryList = []
    const percentList = []
    const priceList = []
    const colors = [
      '#207567',
      '#358873',
      '#4E9C81',
      '#6BAF92',
      '#8DC3A7',
      '#B4D6C1',
      '#DFEAE2',
      '#FAF3DD',
    ]
    this.dataSet.forEach((data, idx) => {
      const $rect = this.makeRect({
        data,
        barHeight,
        i,
        barPadding,
        color: colors[idx],
      })
      $svg.appendChild($rect)
      categoryList.push(this.makeCategory(data))
      percentList.push(this.makePercent(data, this.totalMoney))
      priceList.push(this.makePrice(data))
      i++
    })
    return { $svg, categoryList, percentList, priceList }
  }
  makeRect({ data, barHeight, i, barPadding, color }) {
    const $rect = document.createElementNS('http://www.w3.org/2000/svg', 'rect')
    const percent = (data.price / this.totalMoney) * 100
    const translate = [0, barHeight * i]
    $rect.setAttribute('width', percent + '%')
    $rect.setAttribute('height', String(barHeight - barPadding))
    $rect.setAttribute('transform', 'translate(' + translate + ')')
    $rect.setAttribute('class', 'line')
    $rect.style['stroke'] = color
    $rect.style['fill'] = color

    const $animate = this.makeAnimtaterForRect(percent, color)
    $rect.appendChild($animate)

    return $rect
  }

  makeAnimtaterForRect(percent, color) {
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
    return p({ textContent: data.categoryName, className: 'list-item' })
  }
  makePercent(data, totalMoney) {
    const percent = (data.price / totalMoney) * 100
    let textPercent = 0
    if (percent < 1) {
      textPercent = Math.floor(percent * 100) / 100
    } else {
      textPercent = Math.floor((data.price / totalMoney) * 100)
    }
    return p({ textContent: textPercent + '%', className: 'list-item' })
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
