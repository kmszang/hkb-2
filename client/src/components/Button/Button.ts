import { Component } from '../../utils/wooact'
import { div, input, button } from '../../utils/wooact/defaultElements'

interface IProps {
  value: string
  onClickHandler: (e) => void
}
interface IState {}

class Button extends Component<IProps, IState, undefined> {
  constructor(props: IProps) {
    super({ props })

    Object.setPrototypeOf(this, Button.prototype)
    this.init()
  }

  render() {
    const { value, onClickHandler } = this.props
    return button({ textContent: value, onclick: onClickHandler })
  }
}

export default Button
