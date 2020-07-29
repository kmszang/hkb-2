import { Component } from '../../utils/wooact'
import { div, input } from '../../utils/wooact/defaultElements'

interface IProps {
  loginHandler: (e: Event) => {}
}
interface IState {}

class InputIdPassword extends Component<IProps, IState> {
  // constructor(props: IProps) {
  // super(props)
  // const initialState: IState = {
  //
  // }
  // constructor(props: IProps) {
  //   super(props, state)
  constructor(props: IProps) {
    super(props)
    Object.setPrototypeOf(this, InputIdPassword.prototype)
    this.init()
  }

  render() {
    return div(
      {},
      input({ className: 'login-input', placeholder: '아이디' }),
      input({
        type: 'password',
        className: 'login-input',
        placeholder: '비밀번호',
      }),
      input({
        type: 'submit',
        value: '로그인',
        className: 'login-btn',
        onclick: (e) => this.props.loginHandler(e),
      })
    )
  }
}

export default InputIdPassword
