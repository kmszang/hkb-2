import { Component } from '../../utils/wooact'
import { div, i } from '../../utils/wooact/defaultElements'

interface IProps {
  isSelected: boolean
  onClickHandler: () => void
  isIncome?: boolean
  name: string
  iconName: string
}
interface IState {}

class ICon extends Component<IProps, IState> {
  constructor(props: IProps) {
    super(props)

    Object.setPrototypeOf(this, ICon.prototype)

    this.init()
  }

  render() {
    const { isSelected, onClickHandler, isIncome, iconName, name } = this.props
    const iconClass =
      isIncome === undefined ? '' : isIncome ? 'income' : 'outcome'
    return div(
      {
        className: `icon-container ${isSelected ? 'selected' : ''}`,
        onclick: () => onClickHandler(),
      },
      i({
        className: `f7-icons ${iconClass}`,
        textContent: iconName,
      }),
      div({ className: 'icon-description', textContent: name })
    )
  }
}

export default ICon
