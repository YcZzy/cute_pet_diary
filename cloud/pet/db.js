exports.getPets =  async (db, openId) => {
  const res = await db.collection('CPD_pets').where({ openId }).get()
  let pets = []
  if (res.data.length !== 0) {
    pets = res.data
  }
  return pets
}