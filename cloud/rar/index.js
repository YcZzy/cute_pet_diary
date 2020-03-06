// 云函数入口文件
const cloud = require('wx-server-sdk')
const TcbRouter = require('tcb-router')
const { addReminder, getReminders } = require('./db')

cloud.init()

// 云函数入口函数
exports.main = async (event, context) => {
  const db = cloud.database()
  const app = new TcbRouter({ event })

  // 通过宠物id获取
  app.router('getReminders', async (ctx, next) => {
    let { petId } = event.params
    const res = await getReminders(db, petId)
    ctx.body = { code: 0, data: res, petId } // 将数据返回给云函数，用ctx.body
    await next()
  });

  app.router(['addReminder', 'updateReminder'], async (ctx, next) => {
    let reminder = event.params, res
    if (!reminder._id) {
      const { openId } = event.userInfo
      reminder.openId = openId
      res = await addReminder(db, reminder)
    }else {
      res = await updateReminder(db, reminder)
    }
    ctx.body = { code: 0, data: res } // 将数据返回给云函数，用ctx.body
    await next()
  });

  return app.serve()
}