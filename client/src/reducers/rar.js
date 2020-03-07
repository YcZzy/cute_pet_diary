import { GET_REMINDERS, GET_RECORDS } from '../constants/rar'

const initialState = {
  reminders: [],
  records: [],
  loading: true
}

export default function Reducer (state = initialState, action) {
  const { type, payload } = action
  switch(type) {
    case GET_REMINDERS:
      return {
        ...state,
        ...payload
      }
    case GET_RECORDS:
      return { // 返回的对象是新的state
        ...state,
        ...payload
      }
    default:
      return state
  }
}