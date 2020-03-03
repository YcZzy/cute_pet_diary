import Taro from '@tarojs/taro'

export function cloudAdapter(funcName, url, params) {
  return new Promise((resolve, reject) => {
    Taro.cloud.callFunction({
      name: funcName,//小程序云函数的名称  
      data: {
        $url: url,
        ...params
      }
    }).then(res => {
      console.log(`云函数${funcName}调用成功`, res)
      resolve(res.result)
    }).catch(err => {
      console.log(`云函数${funcName}调用失败`, err)
    })
  })
}