exports.switchTime = (time) => {
  if (typeof time === 'string') {
    return new Date(time).getTime()
  }else {
    let date = new Date(time)
    let ymd = date.toLocaleDateString().split('/').map(item => {
      return item.length < 2 ? '0' + item : item
    }).join('-')
    let hm = date.toTimeString().substr(0, 5)
    return `${ymd} ${hm}`
  }
}