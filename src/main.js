import './styles/index.css'

function sayHello () {
  const name = 'Tofuxb'
  document.getElementById('main').innerHTML = `Hello, ${name}`
}
window.onload = sayHello
