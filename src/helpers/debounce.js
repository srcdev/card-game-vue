export default function debounce (fn, wait) {
  let timeout = null
  const timer = wait

  const debounced = function (...args) {
    const later = () => {
      timeout = null

      fn.apply(this, args)
    }

    clearTimeout(timeout)
    timeout = setTimeout(later, timer)

    if (!timeout) {
      fn.apply(this, args)
    }
  }

  debounced.cancel = () => {
    clearTimeout(timeout)
    timeout = null
  }

  return debounced
}
