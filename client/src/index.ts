import './styles/_normalize.scss'
import './styles/_fonts.scss'

import { App } from './components/App'
import { domRenderer } from './utils/wooact'

domRenderer(new App({}), document.querySelector('#App'))
