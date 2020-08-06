import { Component } from '../../utils/wooact'
import { div } from '../../utils/wooact/defaultElements'
import { ITransactionResponse } from '../../api/transaction'
// import { dataSet } from './dummyData'
interface IProps {}
interface IState {}

class PieChart extends Component<IProps, IState> {
  private colorList: Array<string>
  private radius: number
  private diameter: number
  private circumference: number

  private centerCoordinate = [0, 0]
  private fullAngle = 2 * Math.PI
  private dataSet: Array<ITransactionResponse>

  constructor() {
    super()

    Object.setPrototypeOf(this, PieChart.prototype)

    this.initValues()
    this.init()
  }
  initValues() {
    this.colorList = ['yellow', 'red', 'blue', 'purple', 'gray', 'black']
    this.radius = 7
    this.diameter = 2 * this.radius
    this.circumference = this.fullAngle * this.radius
    // this.dataSet = dataSet
  }

  getTotalExpense() {
    let totalExpense = 0
    this.dataSet.forEach((data: ITransactionResponse) => {
      totalExpense += data.price
    })
    return totalExpense
  }

  makeSvg() {
    const $svg = this.createSvgElement('svg')
    let strokeDashOffSet = 0
    let previousAngle = 0
    const totalExpense = this.getTotalExpense()
    this.dataSet.forEach((data, i) => {
      const moneyRatio = data.price / totalExpense
      const circleRatio = moneyRatio * this.circumference
      const circleAngle = this.fullAngle * moneyRatio
      const $pie = this.makePie({
        strokeDashOffSet,
        previousAngle,
        moneyRatio,
        i,
      })

      this.appendChildren($svg, [$pie])

      strokeDashOffSet = strokeDashOffSet - circleRatio
      previousAngle += circleAngle
    })

    return $svg
  }

  makePie({ strokeDashOffSet, previousAngle, moneyRatio, i }) {
    const totalExpense = this.getTotalExpense()
    const $pie = this.createSvgElement('g')

    const circleRatio = moneyRatio * this.circumference
    const circleAngle = this.fullAngle * moneyRatio

    const $circle = this.makeCircle(strokeDashOffSet, circleRatio, i)
    const $label = this.makeLabel(previousAngle, circleAngle)

    this.hideSmallPercent(moneyRatio, $circle, $label)

    this.appendChildren($pie, [$circle, $label])
    return $pie
  }
  hideSmallPercent(moneyRatio, $circle, $label) {
    const standard = 0.05
    if (moneyRatio < standard) {
      this.addEvent('mouseover', $circle, this.mouseoverHandler)
      this.addEvent('mouseout', $circle, this.mouseoutHandler)
      $label.setAttribute('class', 'low-percent')
    }
  }
  addEvent(event, element, callback) {
    element.addEventListener(event, callback)
  }
  mouseoverHandler(e) {
    const $label = e.target.nextElementSibling
    $label.classList.remove('low-percent')
  }
  mouseoutHandler(e) {
    const $label = e.target.nextElementSibling
    $label.classList.add('low-percent')
  }
  makeLabel(previousAngle, circleAngle) {
    const $label = this.createSvgElement('g')
    const x = Math.sin(previousAngle + circleAngle / 2)
    const y = -Math.cos(previousAngle + circleAngle / 2)

    const pathLength = 1.5
    const secondPathLength = x < 0 ? -10 : 10

    const startPointX = this.diameter * x
    const startPointY = this.diameter * y

    const textPositionX = x < 0 ? -15 : 10

    const $line = this.makeFirstLine({ startPointX, startPointY, pathLength })
    const $line2 = this.makeSecondLine({
      startPointX,
      startPointY,
      pathLength,
      secondPathLength,
    })
    const $text = this.makeText({
      startPointX,
      startPointY,
      textPositionX,
      pathLength,
    })
    this.appendChildren($label, [$line, $line2, $text])
    return $label
  }
  appendChildren(element: Element, children: Array<Element>) {
    children.forEach((child) => {
      element.appendChild(child)
    })
  }
  makeText({ startPointX, startPointY, textPositionX, pathLength }) {
    const $text = this.createSvgElement('text')
    const text = '카테고리'
    this.setAttribute($text, {
      x: startPointX + textPositionX,
      y: startPointY * pathLength,
      class: 'label-text',
    })
    $text.textContent = text
    return $text
  }
  makeFirstLine({ startPointX, startPointY, pathLength }) {
    const $line = this.createSvgElement('line')
    this.setAttribute($line, {
      x1: startPointX,
      y1: startPointY,
      x2: startPointX * pathLength,
      y2: startPointY * pathLength,
    })

    return $line
  }
  makeSecondLine({ startPointX, startPointY, pathLength, secondPathLength }) {
    const $line = this.createSvgElement('line')

    this.setAttribute($line, {
      x1: startPointX * pathLength,
      y1: startPointY * pathLength,
      x2: startPointX * secondPathLength,
      y2: startPointY * pathLength,
    })
    return $line
  }

  makeCircle(strokeDashOffSet, circleRatio, i) {
    const $circle = this.createSvgElement('circle')
    const rotateAngle = 90

    this.setAttribute($circle, {
      transform: `rotate(-${rotateAngle})`,
      r: this.radius,
      cx: this.centerCoordinate[0],
      cy: this.centerCoordinate[1],
      fill: 'transparent',
      'stroke-width': this.diameter,
    })

    this.setStyle($circle, {
      strokeDasharray: `${circleRatio}, 10000`,
      strokeDashoffset: strokeDashOffSet,
      stroke: this.colorList[i],
    })

    return $circle
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
  setStyle(element, attributes) {
    for (let key in attributes) {
      element.style[key] = attributes[key]
    }
  }
  render() {
    const $svg = this.makeSvg()
    return $svg
  }
}

export default PieChart
