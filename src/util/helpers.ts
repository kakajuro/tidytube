// https://stackoverflow.com/questions/52867999/javascript-function-throttling
export const throttle = (func, limit) => {
  let inThrottle
  return (...args) => {
    if (!inThrottle) {
      func(...args)
      inThrottle = setTimeout(() => inThrottle = false, limit)
    }
  }
}

export const delay = (ms) => {
  return new Promise((resolve) => {
    setTimeout(resolve, ms)
  })
}