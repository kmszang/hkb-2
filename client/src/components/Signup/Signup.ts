import { Component } from '../../utils/wooact';
import { div } from '../../utils/wooact/defaultElements'

interface IProps {}
interface IState {}

class Signup extends Component<IProps, IState> {
  // constructor(props: IProps) {
  // super(props)
  // const initialState: IState = {
  //
  // }
  // constructor(props: IProps) {
  //   super(props, state)
  constructor() {
    super()

    Object.setPrototypeOf(this, Signup.prototype)
    this.init()
  }

  render() {
    return div({ className: 'container' })
  }
}

export default Signup;


