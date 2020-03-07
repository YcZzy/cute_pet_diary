exports.initVariety =  async (db) => {
  const res = await db.collection('CPD_config_variety').get()
  let variety = []
  if (res.data.length !== 0) {
    variety = res.data
  }
  return variety
}

exports.initRarReminder =  async (db) => {
  const res1 = await db.collection('CPD_config_plan').get()
  let plan = []
  if (res1.data.length !== 0) {
    plan = res1.data
  }
  const res2 = await db.collection('CPD_config_cycle').get()
  let cycles = []
  if (res2.data.length !== 0) {
    cycles = res2.data
  }
  return { plan, cycles }
}

exports.initRarRecord = async (db) => {
  const res = await db.collection('CPD_config_record').get()
  let record = []
  if (res.data.length !== 0) {
    record = res.data
  }
  return record
}