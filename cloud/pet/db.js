exports.getPets =  async (db, openId) => {
  const res = await db.collection('CPD_pets').where({ openId }).get()
  let pets = []
  if (res.data.length !== 0) {
    pets = res.data
  }
  return pets
}

exports.addPets = async (db, pet) => {
  const res = await db.collection('CPD_pets').add({
    data: pet
  })
  return res
}

exports.updatePets = async (db, pet) => {
  let _id = pet._id
  delete pet._id 
  const res = await db.collection('CPD_pets').doc(_id).update({
    data: pet
  })
  return res
}