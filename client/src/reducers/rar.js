import { GET_REMINDERS } from '../constants/rar'

const initialState = {
  reminders: [],
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
    default:
      return state
  }
}