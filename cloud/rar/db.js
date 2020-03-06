exports.getReminders =  async (db, petId) => {
  const res = await db.collection('CPD_pets_reminders').where({ petId }).get()
  let reminders = []
  if (res.data.length !== 0) {
    reminders = res.data
  }
  return reminders
}

exports.addReminder = async (db, reminder) => {
  const res = await db.collection('CPD_pets_reminders').add({
    data: reminder
  })
  return res
}

exports.updateReminder = async (db, reminder) => {
  let _id = pet._id
  delete reminder._id 
  const res = await db.collection('CPD_pets_reminders').doc(_id).update({
    data: reminder
  })
  return res
}