exports.getReminders =  async (db, petId) => {
  const res = await db.collection('CPD_pets_reminders').where({ petId }).get()
  let reminders = []
  if (res.data.length !== 0) {
    reminders = res.data
  }
  return reminders
}

exports.getReminder =  async (db, _id) => {
  // where返回的是数组格式
  const res = await db.collection('CPD_pets_reminders').where({ _id }).get()
  return res ? res.data : []
}

exports.addReminder = async (db, reminder) => {
  const res = await db.collection('CPD_pets_reminders').add({
    data: reminder
  })
  return res
}

exports.updateReminder = async (db, reminder) => {
  let _id = reminder._id
  delete reminder._id 
  const res = await db.collection('CPD_pets_reminders').doc(_id).update({
    data: reminder
  })
  return res
}

exports.getRecords =  async (db, petId) => {
  const $ = db.command.aggregate
  const res = await db.collection('CPD_pets_records').aggregate().match({
    petId
  }).sort({
    time: -1
  }).end()
  const { list } = await db.collection('CPD_pets_records').aggregate().match({
    petId
  }).group({
    _id: '$name'
  }).end()
  let records = []
  if (res.list.length !== 0) {
    let types = []
    for(let i = 0; i < res.list.length && types.length < list.length; i++) {
      if (!types.includes(res.list[i].name)) {
        types.push(res.list[i].name)
        records.push(res.list[i])
      }
    }
  }
  return records
}
exports.getRecord =  async (db, _id) => {
  // doc返回的是对象格式
  const res = await db.collection('CPD_pets_records').doc(_id).get()
  return res.data
}

exports.addRecord = async (db, record) => {
  res = await db.collection('CPD_pets_records').add({
    data: record
  })
  return res
}

exports.updateRecord = async (db, record) => {
  let _id = record._id
  delete record._id 
  const res = await db.collection('CPD_pets_records').doc(_id).update({
    data: record
  })
  return res
}

exports.deleteById= async (db, table, _id) => {
  const res = await db.collection(table).doc(_id).remove()
  return res
}
exports.deleteByTitle = async (db, table, params) => {
  const res = await db.collection(table).where(params).remove()
  return res
}

exports.getRecordsByName = async (db, name) => {
  const res = await db.collection('CPD_pets_records').where({ name }).get()
  return res.data
}