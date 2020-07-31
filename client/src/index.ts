import { App } from './components/App/index'
import { domRenderer } from './utils/wooact'
import './styles/_fonts.scss'

domRenderer(new App({}), document.querySelector('#App'))
