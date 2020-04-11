exports.addUser = async (db, openId, user) => {
  let _id = openId
  const res = await db.collection('CPD_users').add({
    data: {
      _id,
      ...user
    }
  })
  return res
}