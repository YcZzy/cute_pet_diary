// 云函数入口文件
const cloud = require('wx-server-sdk')
const TcbRouter = require('tcb-router')
const { getPets, addPets, updatePets } = require('./db')

cloud.init()

// 云函数入口函数
exports.main = async (event, context) => {
  const db = cloud.database()
  const app = new TcbRouter({ event })

  app.router('getPets', async (ctx, next) => {
    const { openId } = event.userInfo
    const pets = await getPets(db, openId)
    ctx.body = { code: 0, data: pets } // 将数据返回给云函数，用ctx.body
    await next()
  });

  app.router(['addPets', 'updatePets'], async (ctx, next) => {
    const { openId } = event.userInfo
    let pet = event.params
    pet.openId = openId
    let res
    if (!pet._id) {
      res = await addPets(db, pet)
    }else {
      res = await updatePets(db, pet)
    }
    ctx.body = { code: 0, data: res }
    await next()
  })

  return app.serve()
}