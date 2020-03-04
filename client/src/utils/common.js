import Taro from '@tarojs/taro'

export const navigateTo = (path) => {
  Taro.navigateTo({
    url: path
  })
}
export const navigateBack = (title, duration = 2000, delta = 1) => {
  Taro.showToast({
    title: title,
    icon: 'success',
    duration,
  })
  setTimeout(() => {
    Taro.navigateBack({ delta })
  }, duration)
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

// 获取 YYYY-MM-DD
export const getYMD = () => {
  let date = new Date().toLocaleDateString()
  let arr = date.split('/')
  if (arr[1].length === 1) {
    arr[1] = '0' + arr[1]
  } 
  if (arr[2].length === 1) {
    arr[2] = '0' + arr[2]
  }
  return arr.join('-')
}

// 判断闰年
export const isLeapY = (year) => {
  return (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0
}

export const computedFromBirthday = (birthday) => {
  const arr = [0, 31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31] // 每月天数
  let nowM = new Date().getMonth() + 1
  let nowY = new Date().getFullYear()
  let nowD = new Date().getDate()

  if (!birthday) birthday = getYMD()
  let barr = birthday.split('-').map(item => Number(item))
  let flag = isLeapY(nowM) // 今年是否为闰年
  let countdown = -1 
  
  // 生日月份比现在月份大，还没过生日
  if (barr[1] > nowM) {
    countdown += parseInt(barr[2])
    for(let i = nowM + 1; i < barr[1]; i++) countdown += arr[i]
    if (flag && nowM === 2) {
      countdown += (29 - barr[2])
    }else if (flag && nowM === 1) {
      countdown += 1 // 2月份 29天
      countdown += (arr[1] - barr[2]) // 1月份剩余天数
    }else { // M > 2 或 不是闰年
      countdown += (arr[nowM] - barr[2])
    }
    countdown += 1
  }
  if (barr[1] === nowM && nowD <= barr[2]) {
    countdown += (barr[2] - nowD)
    countdown += 1
  }

  // x岁x个月x天
  let ys, ms, ds, ymd = ''
  if (nowD < barr[2]) {
    ds = arr[nowM - 1] + nowD - barr[2]
    if(nowM = 3 && flag) ds += 1
    nowM -= 1
  }else {
    ds = nowD - barr[2]
  }
  if (ds) ymd = `${ds}天`

  if (nowM < barr[1]) {
    ms = 12 + nowM - barr[1]
    nowY -= 1
  }else {
    ms = nowM - barr[1]
  }
  if (ms) ymd = `${ms}个月` + ymd

  ys = nowY - barr[0]
  if (ys) ymd = `${ys}年` + ymd
  if (!ymd.length) ymd = '刚刚来到新世界的萌宠'

  return {
    countdown,
    ymd
  }
}