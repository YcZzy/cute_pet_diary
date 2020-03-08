const cloud = require('wx-server-sdk')
cloud.init({
  env: 'ldh-xinaa'
})

exports.main = async (event, context) => {
  const fileIDs = event.fileIDs
  const result = await cloud.deleteFile({
    fileList: fileIDs,
  })
  return result.fileList
}