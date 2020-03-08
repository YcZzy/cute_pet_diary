// 云函数入口文件
const cloud = require('wx-server-sdk')
const TcbRouter = require('tcb-router')
const { 
  addReminder, 
  getReminders, 
  getReminder, 
  getRecords, 
  getRecord,
  addRecord, 
  updateReminder,
  updateRecord,
  deleteById,
  deleteByTitle,
  getRecordsByName
} = require('./db')

cloud.init()

// 云函数入口函数
exports.main = async (event, context) => {
  const db = cloud.database()
  const app = new TcbRouter({ event })

  // 通过宠物id获取
  app.router('getReminders', async (ctx, next) => {
    let { petId } = event.params
    const res = await getReminders(db, petId)
    ctx.body = { code: 0, data: res } 
    await next()
  })
  // 通过_id
  app.router('getReminder', async (ctx, next) => {
    let { _id } = event.params
    const res = await getReminder(db, _id)
    ctx.body = { code: 0, data: res } 
    await next()
  })

  app.router(['addReminder', 'updateReminder'], async (ctx, next) => {
    let reminder = event.params, res
    const { openId } = event.userInfo
    reminder.openId = openId
    if (!reminder._id) {
      res = await addReminder(db, reminder)
    }else {
      res = await updateReminder(db, reminder)
    }
    ctx.body = { code: 0, data: res } 
    await next()
  })

  app.router('getRecords', async (ctx, next) => {
    let { petId } = event.params
    const res = await getRecords(db, petId)
    ctx.body = { code: 0, data: res } 
    await next()
  })
  app.router('getRecord', async (ctx, next) => {
    let { _id } = event.params
    const res = await getRecord(db, _id)
    ctx.body = { code: 0, data: res } 
    await next()
  })

  app.router(['addRecord', 'updateRecord'], async (ctx, next) => {
    let record = event.params, res
    if (!record._id) {
      res = await addRecord(db, record)
    }else {
      res = await updateRecord(db, record)
    }
    ctx.body = { code: 0, data: res } 
    await next()
  })

  app.router(['deleteReminder', 'deleteRecord'], async (ctx, next) => {
    let { _id } = event.params, res, table
    if (event.$url === 'deleteReminder') {
      table = 'CPD_pets_reminders'
    }else {
      table = 'CPD_pets_records'
      // 删除照片
      const result = await getRecord(db, _id)
      if (result.pictures.length) {
        await cloud.callFunction({
          name: 'deleteFiles',
          data: {
            fileIDs: result.pictures
          }
        })
      }
    }
    res = await deleteById(db, table, _id)
    ctx.body = { code: 0, data: res } 
    await next()
  })

  app.router(['deleteReminders', 'deleteRecords'], async (ctx, next) => {
    let { petId, title } = event.params, res, table, arg
    if (event.$url === 'deleteReminders') {
      table = 'CPD_pets_reminders'
      arg = 'plan'
    }else {
      table = 'CPD_pets_records'
      arg = 'name'
      const result = await getRecordsByName(db, title)
      for(let i = 0; i < result.length; i++) {
        if (result[i].pictures.length) {
          await cloud.callFunction({
            name: 'deleteFiles',
            data: {
              fileIDs: result[i].pictures
            }
          })
        }
      }
    }
    res = await deleteByTitle(db, table, { petId, [arg]: title })
    ctx.body = { code: 0, data: res } 
    await next()
  })

  return app.serve()
}