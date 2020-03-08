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

const arr = [0, 31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31] // 每月天数

export const computeFromBirthday = (birthday) => {
  const date = new Date()
  let nowM = date.getMonth() + 1
  let nowY = date.getFullYear()
  let nowD = date.getDate()

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

export const computeFromArrivalDate = (arrival_date) => {
  if (!arrival_date) return 0;
  let [arrY, arrM, arrD] = arrival_date.split('-').map(item => Number(item))
  let [nowY, nowM, nowD] = getYMD().split('-').map(item => Number(item))
  let sumDays = 0
  if (arrY === nowY) {
    if (nowD < arrD) {
      sumDays = arr[nowM - 1] + nowD - arrD
      if(nowM = 3 && isLeapY(nowY)) sumDays += 1
      nowM -= 1
    }else {
      sumDays = nowD - arrD
    }

    if (nowM > arrM) {
      for(let i = arrM; i < nowM; i++) sumDays += arr[i]
      if (isLeapY[nowY] && nowM > 2) sumDays += 1
    }
  }
  if (arrY < nowY) {
    for(let i = arrY + 1; i < nowY; i++) {
      if (isLeapY(i)) {
        sumDays += 366
      }else {
        sumDays += 365
      }
    }
    // 到达之年部分
    const arrFlag = isLeapY(arrY)
    for(let i = arrM + 1; i <= 12; i++) sumDays += arr[i]
    if (arrM === 1 && arrFlag) sumDays += 1
    sumDays += arr[arrM] - arrD
    if (arrM === 2 && arrFlag) sumDays += 1

    // 今年部分
    const nowFlag = isLeapY(nowY)
    for(let i = 1; i < nowM; i++) sumDays += arr[i]
    if (nowM > 2 && nowFlag) sumDays += 1
    sumDays += arr[nowM] - nowD
    if (nowM === 2 && nowFlag) sumDays += 1
  }
  return sumDays
}

export const switchTime = (time) => {
  if (typeof time === 'string') {
    return new Date(time).getTime()
  }else {
    let date = new Date(time)
    let ymd = date.toLocaleDateString().split('/').map(item => {
      return item.length < 2 ? '0' + item : item
    }).join('-')
    let hm = date.toTimeString().substr(0, 5)
    return `${ymd} ${hm}`
  }
}