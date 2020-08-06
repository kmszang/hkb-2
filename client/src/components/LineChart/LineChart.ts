import { Component } from '../../utils/wooact'
import { div, svg } from '../../utils/wooact/defaultElements'
import { dataSet } from './dummyData'
import { ITransactionResponse } from '../../api/transaction'
interface IProps {}
interface IState {}

class LineChart extends Component<IProps, IState> {
  private svgWidth: 900
  private svgHeight: 600

  private startX: number
  private startY: number
  private endX: number
  private endY: number

  // 현재 월
  private currentMonth: number

  private January: number

  private paddingX: number
  private paddingY: number

  private circlePadding: number

  private endOfMonth: number
  private dateInterval: number
  private intervalX: number

  private highestExpense: number
  private totalExpense: number
  private topOfLabel: number

  private intervalY: number
  private averageExpense: number
  private dataSet: Array<ITransactionResponse>

  constructor() {
    super()

    Object.setPrototypeOf(this, LineChart.prototype)

    this.connectStore('transaction')
    this.initValues()
    this.init()
  }

  initValues() {
    // 데이터 설정 필요
    this.currentMonth = 7
    this.dataSet = this.store.transaction.data
    //

    this.svgWidth = 900
    this.svgHeight = 600

    this.startX = 100
    this.startY = 570
    this.endX = 850
    this.endY = 30

    // 현재 월

    // 1월
    this.January = 1

    this.paddingX = 5
    this.paddingY = 20

    this.circlePadding = 5
    // 해당 월의 마지막 날짜
    this.endOfMonth = new Date(2020, this.currentMonth, 0).getDate()
    // 5일 기준
    this.dateInterval = 5

    this.intervalX = (this.endX - this.startX) / this.endOfMonth

    const { highestExpense, totalExpense } = this.getTotalAndAverageExpense()
    this.highestExpense = highestExpense
    this.totalExpense = totalExpense
    this.averageExpense = totalExpense / this.endOfMonth
  }

  getTotalAndAverageExpense() {
    let highestExpense = 0
    let totalExpense = 0
    this.dataSet.forEach((data: ITransactionResponse) => {
      if (highestExpense < data.price) highestExpense = data.price
      totalExpense += data.price
    })
    return { highestExpense, totalExpense }
  }

  makeSvg() {
    const $svg = this.createSvgElement('svg')

    this.setAttribute($svg, {
      style: `width : ${this.svgWidth}px; height : ${this.svgHeight}px`,
      viewBox: `0 0 ${this.svgWidth} ${this.svgHeight}`,
      id: 'line-chart',
      class: 'graph',
    })

    const $dateLabels = this.makeDateLabels()
    const $moneyLabels = this.makeMoneyLabels()
    const $markers = this.makeMarkers()
    const $averageLine = this.makeAverageLine()

    this.appendChildren($svg, [
      $dateLabels,
      $moneyLabels,
      $markers,
      $averageLine,
    ])

    return $svg
  }

  makeAverageLine() {
    const $g = this.createSvgElement('g')
    const $line = this.createSvgElement('line')
    const $text = this.createSvgElement('text')

    const linePaddingTop = 4
    const textPaddingLeft = 40
    const textPaddingTop = 10
    const ratio = this.averageExpense / this.topOfLabel
    const length = this.startY - this.endY
    const height = ratio * length

    const y1 = this.startY - height - linePaddingTop
    const y2 = y1

    this.setAttribute($line, {
      x1: this.startX,
      y1,
      x2: this.endX,
      y2,
      class: 'average-line',
    })

    this.setAttribute($text, {
      x: this.endX - textPaddingLeft,
      y: this.startY - height - textPaddingTop,
    })

    $text.textContent = '이번달 월 평균 지출'

    this.appendChildren($g, [$line, $text])
    return $g
  }

  makeMarkers() {
    let startDate = 1
    let polyLinePoints = ''
    let startMarkerX = this.startX + this.paddingX + this.circlePadding

    const $g = this.createSvgElement('g')

    const markerPaddingTop = 4

    this.setAttribute($g, {
      class: 'data',
    })

    let i = 0

    while (startDate <= this.endOfMonth) {
      let height = 4

      if (
        dataSet[i] &&
        startDate === new Date(this.dataSet[i].createdAt).getDate()
      ) {
        const ratio = dataSet[i].price / this.topOfLabel
        const length = this.startY - this.endY
        height = length * ratio + markerPaddingTop
        i++
      }

      polyLinePoints += ` ${startMarkerX},${this.startY - height}`

      const $marker = this.makeMarker(startMarkerX, height)
      this.appendChildren($g, [$marker])

      startMarkerX += this.intervalX
      startDate++
    }

    const $polyLine = this.makePolyLine(polyLinePoints)
    this.appendChildren($g, [$polyLine])

    return $g
  }

  makePolyLine(polyLinePoints: string) {
    const $polyLine = this.createSvgElement('polyline')
    this.setAttribute($polyLine, {
      points: polyLinePoints,
      class: 'poly-line',
    })
    return $polyLine
  }

  makeMarker(startMarkerX: number, height: number) {
    const circlePadding = 10
    const radius = 3

    const $marker = this.createSvgElement('circle')

    this.setAttribute($marker, {
      r: radius,
      cx: startMarkerX,
      cy: this.startY - height,
    })

    return $marker
  }

  appendChildren(element: Element, children: Array<Element>) {
    children.forEach((child) => {
      element.appendChild(child)
    })
  }

  makeMoneyLabels() {
    const $g = this.createSvgElement('g')

    const { labelCount, paddingTop } = this.determineCountAndPadding()
    this.topOfLabel = this.highestExpense + paddingTop

    const intervalY = Math.floor((this.startY - this.endY) / labelCount)

    let intervalMoney = this.topOfLabel / labelCount
    let startTextY = this.startY
    let currentMoney = 0
    let count = labelCount

    while (count + 1) {
      const $label = this.makeMoneyLabel(startTextY, count, currentMoney)
      this.appendChildren($g, [$label])

      count--
      startTextY -= intervalY
      currentMoney += intervalMoney
    }

    return $g
  }

  makeMoneyLabel(startTextY, labelCount: number, currentMoney: number) {
    const linePadding = 4
    const paddingX = 60
    const paddingY = 20
    const intervalMoney = this.topOfLabel / labelCount
    const startTextX = 10

    const $label = this.createSvgElement('g')
    const $text = this.createSvgElement('text')
    const $line = this.createSvgElement('line')

    this.setAttribute($text, {
      x: startTextX,
      y: startTextY,
    })

    $text.textContent = String(currentMoney)

    this.setAttribute($line, {
      x1: this.startX,
      y1: startTextY - linePadding,
      x2: this.endX,
      y2: startTextY - linePadding,
      class: ' line',
    })

    this.appendChildren($label, [$text, $line])

    return $label
  }

  determineCountAndPadding() {
    let labelCount = 0
    let paddingTop = 0

    if (this.highestExpense < 50000) {
      labelCount = 5
      paddingTop = 10000
    } else if (this.highestExpense < 100000) {
      labelCount = 7
      paddingTop = 30000
    } else {
      labelCount = 10
      paddingTop = 50000
    }
    return { labelCount, paddingTop }
  }
  makeDateLabels() {
    const $g = this.createSvgElement('g')
    const dateDistance = this.dateInterval * this.intervalX

    let labelCount = Math.ceil(this.endOfMonth / this.dateInterval)
    let startDate = 1
    let startTextX = this.startX + this.paddingX - 7

    while (labelCount) {
      const $text = this.createSvgElement('text')

      this.setAttribute($text, {
        x: startTextX,
        y: this.startY + this.paddingY,
      })

      $text.textContent = `${this.currentMonth}.${startDate}`
      $g.appendChild($text)

      startDate += this.dateInterval
      labelCount--
      startTextX += dateDistance
    }

    return $g
  }
  createSvgElement(type: string) {
    const $element = document.createElementNS(
      'http://www.w3.org/2000/svg',
      type
    )

    return $element
  }

  setAttribute(element: Element, attributes: Object) {
    for (let key in attributes) {
      element.setAttribute(key, attributes[key])
    }
  }

  render() {
    const $svg = this.makeSvg()
    console.log($svg)

    return $svg
  }
}

export default LineChart
