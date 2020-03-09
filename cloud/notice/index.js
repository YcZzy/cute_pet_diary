// 云函数入口文件
const cloud = require('wx-server-sdk')
const TcbRouter = require('tcb-router')
const Exac = require('exac.js')
cloud.init({
  env: 'ldh-xinaa'
})

// 云函数入口函数
exports.main = async (event, context) => {
  const db = cloud.database()
  let res = await db.collection('CPD_pets_reminders').get()

  let tasks = res.data, execTasks = []
  for(let i = 0; i < tasks.length; i++) {
    let now = new Date().getTime()
    let nextTime = tasks[i].nextTime
    // 提前10分钟提醒 :21~:30的任务:20将提醒
    if (now + 10 * 60 * 1000 >= nextTime) {
      execTasks.push(tasks[i])
      let cycle = Number(tasks[i].cycle.match(/.*(?=天)/)[0])
      await db.collection('CPD_pets_reminders').doc(tasks[i]._id).update({
        data: {
          nextTime: nextTime + cycle * 24 * 60 * 60 * 1000
        }
      })
    }
  }

  for(let i = 0; i < execTasks.length; i++) {
    let task = execTasks[i]
    let pet = await db.collection('CPD_pets').doc(task.petId).get()
    await Exac(task, pet.data)
  }
}