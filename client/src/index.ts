import { App } from './components/App/index'
import { domRenderer } from './utils/wooact'

domRenderer(new App({}), document.querySelector('#App'))
