export default {
  $ (selector, container) {
    if (!container || !container.querySelectorAll) {
      container = document.body
    }
    let el = container.querySelectorAll(selector)
    return el.length > 1 ? el : el.length == 1 ? el[0] : undefined
  }
}
