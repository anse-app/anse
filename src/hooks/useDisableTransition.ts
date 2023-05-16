export const useDisableTransition = () => {
  // https://paco.me/writing/disable-theme-transitions
  const css = document.createElement('style')
  const disableTransition = () => {
    css.type = 'text/css'
    css.appendChild(
      document.createTextNode(
        `* {
       -webkit-transition: none !important;
       -moz-transition: none !important;
       -o-transition: none !important;
       -ms-transition: none !important;
       transition: none !important;
    }`,
      ),
    )
    document.head.appendChild(css)
  }

  // Calling getComputedStyle forces the browser to redraw
  const removeDisableTransition = () => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const _ = window.getComputedStyle(css).opacity
    document.head.removeChild(css)
  }

  return {
    css,
    disableTransition,
    removeDisableTransition,
  }
}
