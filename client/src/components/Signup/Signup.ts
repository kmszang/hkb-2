import { Component } from '../../utils/wooact'
import { div, section, h1, form } from '../../utils/wooact/defaultElements'
import { BoxInput } from '../BoxInput/index'
import {
  validateId,
  validateName,
  validatePassword,
  validatePasswordOverlap,
  checkAndmakeInputData,
} from '../../utils/authorization'
import { Button } from '../Button'
import { signUp } from '../../api/user'
import { errorHandler } from '../../utils/errorHandler'
interface IProps {}
interface IState {}
class Signup extends Component<IProps, IState> {
  constructor() {
    super()
    Object.setPrototypeOf(this, Signup.prototype)
    this.init()
  }
  signupHandler = async (e: Event) => {
    e.preventDefault()
    const inputs = Array.from(
      this.element.querySelectorAll('input')
    ) as HTMLInputElement[]

    const signupBody = checkAndmakeInputData(inputs)
    console.log(signupBody)
    if (!signupBody) return

    const [signUpResponse, signUpError] = await signUp(signupBody)

    if (signUpError) {
      return errorHandler(signUpError)
    }
  }
  render() {
    return section(
      { id: 'signup-box' },
      h1(
        { textContent: '회원가입' },
        form(
          { id: 'signup-form' },
          new BoxInput({
            placeholder: '아이디',
            name: 'userId',
            type: 'text',
            validateHandler: validateId,
            iconName: '아이디',
            errMessage: '아이디를 입력해주세요',
          }),
          new BoxInput({
            placeholder: '비밀번호',
            name: 'password',
            type: 'password',
            validateHandler: validatePassword,
            iconName: '비밀번호',
            errMessage: '비밀번호를 입력해주세요',
          }),
          new BoxInput({
            placeholder: '비밀번호 확인',
            name: 'passwordCheck',
            type: 'password',
            validateHandler: validatePasswordOverlap,
            iconName: '비밀번호 확인',
            errMessage: '비밀번호가 맞지 않습니다.',
          }),
          new BoxInput({
            placeholder: '이름',
            name: 'name',
            type: 'text',
            validateHandler: validateName,
            iconName: '이름',
            errMessage: '이름을 입력해주세요',
          }),
          new Button({
            value: '회원가입',
            onClickHandler: this.signupHandler,
          })
        )
      )
    )
  }
}

export default Signup
