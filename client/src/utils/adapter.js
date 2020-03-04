import Taro from '@tarojs/taro'

export function cloudAdapter(funcName, url, params) {
  return new Promise((resolve, reject) => {
    Taro.cloud.callFunction({
      name: funcName,//小程序云函数的名称  
      data: {
        $url: url,
        params
      }
    }).then(res => {
      console.log(`云函数${funcName}/${url}调用成功`, res)
      resolve(res.result)
    }).catch(err => {
      console.log(`云函数${funcName}/${url}调用失败`, err)
    })
  })
}

export function upload (url, image_files) {
  return new Promise((resolve,reject)=>{
    var images_fileID = []
    for(let i = 0; i < image_files.length; i++){
      // url add-pet; path pet-info
      let filePath = image_files[i].url || image_files[i].path
      var imageUrl = filePath.split('/')
      var name = imageUrl[imageUrl.length-1]
      Taro.cloud.uploadFile({
        cloudPath: `${url}${name}`,
        filePath,
        success:res => {
          images_fileID.push(res.fileID)
          if(images_fileID.length === image_files.length){
            resolve(images_fileID)
          }
        },
        fail:error => {
          reject(error)
        }
      })
    }
  })
}

export function deleteFiles (fileList) {
  // console.log(fileList)
  return new Promise((resolve, reject) => {
    Taro.cloud.deleteFile({
      fileList
    }).then(res => {
      resolve(res.fileList)
    }).catch(error => {
      reject(error)
    })
  })
}