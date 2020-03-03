import Taro from '@tarojs/taro'

export const navigateTo = (path) => {
  Taro.navigateTo({
    url: path
  })
}

export const debounce = (fn, delay = 250) => {
  let timer = null
  return (...arg) => {
    if (timer) clearTimeout(timer)
    timer = setTimeout(() => {
      fn.apply(this, arg)
    }, delay)
  }
}