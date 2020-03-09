const cloud = require('wx-server-sdk')
const { switchTime } = require('date.js')
cloud.init({
  env: 'ldh-xinaa'
})

const Exac = async (task, pet) => {
  try {
    const result = await cloud.openapi.subscribeMessage.send({
        touser: task.openId,
        page: 'index',
        lang: 'zh_CN',
        data: {
          thing1: {
            value: `${pet.nickname}-${task.plan}`
          },
          date3: {
            value: switchTime(task.nextTime)
          },
          thing8: {
            value: task.note || '请一定要准时为您的爱宠服务哦！'
          }
        },
        templateId: 'kqHePUKZxtp8JTF5AHvrCgAdYUib7u2pMsCdBdoD5GQ',
        miniprogramState: 'developer'
      })
    console.log(result)
    return result
  } catch (err) {
    console.log(err)
    return err
  }
}

module.exports = Exac