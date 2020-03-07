// 云函数入口文件
const cloud = require('wx-server-sdk')
const TcbRouter = require('tcb-router')
const { initVariety, initRarReminder, initRarRecord } = require('./db')

cloud.init()

// 云函数入口函数
exports.main = async (event, context) => {
  const db = cloud.database()
  const app = new TcbRouter({ event })

  app.router('initVariety', async (ctx, next) => {
    const variety = await initVariety(db)
    ctx.body = { code: 0, data: variety }
    await next()
  })

  app.router('initRarReminder', async (ctx, next) => {
    const res = await initRarReminder(db)
    ctx.body = { code: 0, data: res }
    await next()
  })

  app.router('initRarRecord', async (ctx, next) => {
    const res = await initRarRecord(db)
    ctx.body = { code: 0, data: res }
    await next()
  })

  return app.serve()
}