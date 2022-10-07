function event(name: string) {
  const event = new Event(name)
  document.dispatchEvent(event)
  return event
}

export default function (el: HTMLElement) {
  if (el.tagName.toLocaleUpperCase() !== 'INPUT') {
    const els = el.getElementsByTagName('input')
    if (els.length !== 1) {
      throw new Error(
        `v-eager directive requires 1 input, found ${els.length}`,
      )
    }
    else {
      el = els[0]
    }
  }

  el.oninput = function (evt) {
    if (!evt.isTrusted) {
      return
    }
    el.dispatchEvent(event('input'))
  }
}

// import eager from "./directive";
// function install(Vue) {
//   Vue.directive("eager", eager);
// }
//
// export default install;
// export { eager };
