// 云函数入口文件
const cloud = require('wx-server-sdk')
const TcbRouter = require('tcb-router')
const { getPets } = require('./db')

cloud.init()

// 云函数入口函数
exports.main = async (event, context) => {
  const db = cloud.database()
  const app = new TcbRouter({ event })

  app.router('getPets', async (ctx, next) => {
    const { openId } = event.userInfo
    const pets = await getPets(db, openId)
    ctx.body = { code: 0, data: pets }; // 将数据返回给云函数，用ctx.body
  });

  return app.serve()
}