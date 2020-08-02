import './styles/_normalize.scss'
import './styles/_fonts.scss'

import { App } from './components/App'
import { History } from './pages/History'
import { domRenderer } from './utils/wooact'

domRenderer(new History(), document.querySelector('#App'))
// domRenderer(new App({}), document.querySelector('#App'))
