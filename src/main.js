import './styles/index.css'
import Flexible from './libs/flexible'
import App from './Components/App'

(function () {
  Flexible(1080)
  window.app = new App()
})()
