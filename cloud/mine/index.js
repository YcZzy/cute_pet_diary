// 云函数入口文件
const cloud = require('wx-server-sdk')
const TcbRouter = require('tcb-router')
const { addUser } = require('./db')

cloud.init()

// 云函数入口函数
exports.main = async (event, context) => {
  const db = cloud.database()
  const app = new TcbRouter({ event })

  app.router('addUser', async (ctx, next) => {
    const { user } = event.params, { openId } = event.userInfo
    console.log(user)
    const res = await addUser(db, openId, user)
    ctx.body = { code: 0, data: res }
    await next()
  })

  return app.serve()
}