import { Component } from '../../utils/wooact'
import { div, input, i, p } from '../../utils/wooact/defaultElements'

interface IProps {
  iconName: string
  name: string
  placeholder: string
  type: string
  validateHandler: (target: HTMLInputElement) => boolean
  errMessage: string
}
interface IState {}

class BoxInput extends Component<IProps, IState> {
  private errorElement: HTMLElement
  constructor(props: IProps) {
    super(props)
    Object.setPrototypeOf(this, BoxInput.prototype)
    this.init()
    this.errorElement = this.element.querySelector('p')
  }

  onChagneHandler(e: Event) {
    const $target = e.target as HTMLInputElement
    const isValidInput = this.props.validateHandler($target)
    if (isValidInput) {
      return this.errorElement.classList.remove('visible')
    }
    this.errorElement.classList.add('visible')
    // $target.focus()
  }

  render() {
    const { iconName, placeholder, errMessage, name, type } = this.props

    return div(
      { className: 'box-input-container' },
      i({ className: `framework7-${iconName}` }),
      input({
        placeholder,
        name,
        type,
        iconName: iconName,
        oninput: (e) => this.onChagneHandler(e),
        onfocusout: (e) => this.onChagneHandler(e),
      }),
      p({ textContent: errMessage, className: 'error' })
    )
  }
}

export default BoxInput
