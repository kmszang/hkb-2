#!/usr/bin/env bash

if [ -z "$*" ]; then
 echo "put argument with ComponentName"
 exit 0

fi


FOLDER="components"
FILE_NAME=$1
LOWER="$(tr '[:upper:]' '[:lower:]' <<< ${FILE_NAME:0})"

echo `mkdir src/${FOLDER}/${FILE_NAME}`

echo `echo "@import '../../styles/_variables.scss';" > src/${FOLDER}/${FILE_NAME}/${FILE_NAME}.scss`

echo `echo "import './${FILE_NAME}.scss'
export { default as ${FILE_NAME} } from './${FILE_NAME}'" > src/${FOLDER}/${FILE_NAME}/index.ts`

echo `echo "import { Component } from '../../utils/wooact';
import { div } from '../../utils/wooact/defaultElements'

interface IProps {}
interface IState {}

class ${FILE_NAME} extends Component<IProps, IState> {
  // usually get props through constructor
  // state iniitailized in constructor and pass down to state

  // constructor(props: IProps) {
  // const initialState: IState = {
  //
  // }
  // super(props, initialState)

  constructor() {

    // super get props and state, if not existed just send null or nothing.
    super()

    Object.setPrototypeOf(this, ${FILE_NAME}.prototype)

    // connectStore should be inintialized in here
    // before init method called
    // this.connectStore("name")
    this.init()
  }

  render() {
    return div({ className: '${LOWER}-container' })
  }
}

export default ${FILE_NAME};

" > src/${FOLDER}/${FILE_NAME}/${FILE_NAME}.ts`

echo `echo "import { default as ${FILE_NAME} } from './${FILE_NAME}'
import { domRenderer } from '../../utils/wooact'

let ${LOWER}Component: ${FILE_NAME}
let ${LOWER}Element: HTMLElement
let app: HTMLElement = null

beforeAll(() => {
  document.body.innerHTML = '<div id="Test">' + '</div>'
  app = document.querySelector('#Test')
})

beforeEach(() => {
  ${LOWER}Component = new ${FILE_NAME}()
  domRenderer(${LOWER}Component, app)
  ${LOWER}Element = ${LOWER}Component.getElement()
})

afterEach(() => {
  ${LOWER}Element.remove()
})

afterAll(() => {
  app.remove()
})

describe('[${FILE_NAME} Component]', () => {
  test('${FILE_NAME}이 정상적으로 렌더된다.', () => {
    //given
    // rendered

    // when
    // rendered

    // then
    expect(app.hasChildNodes).toBeTruthy()
    expect(app.contains(${LOWER}Element)).toBeTruthy()
  })
})


" > src/${FOLDER}/${FILE_NAME}/${FILE_NAME}.test.ts`
