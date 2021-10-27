/* Shared */
let previousBodyOverflow

/* PC */
let previousBodyBoxSizing
let previousBodyPaddingRight

/* Mobile */
let previousHTMLHeight
let previousHTMLOverflow
let previousBodyTop
let previousBodyWidth
let previousBodyHeight
let previousBodyPosition
let previousScrollTop

const isMobileOS = (userAgent) => {
  const ua = userAgent || navigator.userAgent
  const ipad = /(iPad).*OS\s([\d_]+)/.test(ua)
  const iphone = !ipad && /(iPhone\sOS)\s([\d_]+)/.test(ua)
  const android = /(Android);?[\s/]+([\d.]+)?/.test(ua)

  return android || iphone || ipad
}

const lockScrollPC = () => {
  const $body = document.body
  const scrollBarWidth = window.innerWidth - $body.clientWidth

  previousBodyOverflow = $body.style.overflow
  previousBodyBoxSizing = $body.style.boxSizing
  previousBodyPaddingRight = $body.style.paddingRight

  $body.style.overflow = 'hidden'
  $body.style.boxSizing = 'border-box'
  $body.style.paddingRight = `${scrollBarWidth + $body.style.paddingRight}px`
}

const unlockScrollPC = () => {
  const $body = document.body

  $body.style.overflow = previousBodyOverflow
  $body.style.boxSizing = previousBodyBoxSizing
  $body.style.paddingRight = previousBodyPaddingRight

  previousBodyOverflow = ''
  previousBodyBoxSizing = ''
  previousBodyPaddingRight = ''
}

const lockScrollMobile = () => {
  const $html = document.documentElement
  const $body = document.body

  previousScrollTop = $html.scrollTop || $body.scrollTop
  previousHTMLHeight = $html.style.height
  previousHTMLOverflow = $html.style.overflow

  previousBodyTop = $body.style.top
  previousBodyWidth = $body.style.width
  previousBodyHeight = $body.style.height
  previousBodyPosition = $body.style.position
  previousBodyOverflow = $body.style.overflow

  $html.style.height = '100%'
  $html.style.overflow = 'hidden'

  $body.style.top = `-${previousScrollTop}px`
  $body.style.width = '100%'
  $body.style.height = 'auto'
  $body.style.position = 'fixed'
  $body.style.overflow = 'hidden'
}

const unlockScrollMobile = () => {
  const supportsNativeSmoothScroll =
    'scrollBehavior' in document.documentElement.style
  const $html = document.documentElement
  const $body = document.body

  $html.style.height = previousHTMLHeight
  $html.style.overflow = previousHTMLOverflow

  $body.style.top = previousBodyTop
  $body.style.width = previousBodyWidth
  $body.style.height = previousBodyHeight
  $body.style.position = previousBodyPosition
  $body.style.overflow = previousBodyOverflow

  if (supportsNativeSmoothScroll) {
    window.scrollTo({
      top: previousScrollTop,
      behavior: 'auto',
    })
  } else {
    window.scrollTo(0, previousScrollTop)
  }

  previousBodyOverflow = ''
  previousHTMLHeight = ''
  previousHTMLOverflow = ''
  previousBodyTop = ''
  previousBodyWidth = ''
  previousBodyHeight = ''
  previousBodyPosition = ''
  previousScrollTop = ''
}

const lockScroll = () => {
  if (isMobileOS()) {
    lockScrollMobile()
  }

  lockScrollPC()
}

const unlockScroll = () => {
  if (isMobileOS()) {
    unlockScrollMobile()
  }

  unlockScrollPC()
}

export { lockScroll, unlockScroll }
