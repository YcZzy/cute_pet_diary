export function init() {
  const date = new Date()
  const years = []
  const months = []
  const days = []
  const hours = []
  const minutes = []
  for (let i = date.getFullYear(); i <= date.getFullYear() + 10; i++) {
    years.push(i)
  }
  for (let i = 1; i <= 12; i++) {
    months.push(i)
  }
  for (let i = 1; i <= 31; i++) {
    days.push(i)
  }
  for (let i = 0; i <= 23; i++) {
    hours.push(i)
  }
  for (let i = 0; i <= 60; i++) {
    minutes.push(i)
  }
  return { years, months, days, hours, minutes }
}

export function isOne (value) {
  return value < 10 ? '0' + value : value
}

export function formDate(year, month, day, hour, minute) {
  return `${year}-${isOne(month)}-${isOne(day)} ${isOne(hour)}:${isOne(minute)}`
}