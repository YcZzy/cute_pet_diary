exports.getReminders =  async (db, petId) => {
  const res = await db.collection('CPD_pets_reminders').where({ petId }).get()
  let reminders = []
  if (res.data.length !== 0) {
    reminders = res.data
  }
  return reminders
}

exports.getReminder =  async (db, _id) => {
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
  const res = await db.collection('CPD_pets_records').where({
    petId,
    show: 1
  }).get()
  let records = []
  if (res.data.length !== 0) {
    records = res.data
  }
  return records
}

exports.addRecord = async (db, record) => {
  const result = await db.collection('CPD_pets_records').where({
    name: record.name,
    petId: record.petId
  }).get()
  let res
  record.show = 1
  if (result.data.length) {
    let [rItem] = result.data.filter(r => r.show === 1) // 第1项
    await db.collection('CPD_pets_records').doc(rItem._id).update({
      data: {
        show: 0
      }
    })
  }
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