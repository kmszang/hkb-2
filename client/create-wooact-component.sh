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
