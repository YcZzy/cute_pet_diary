import { INIT_VARIETY, INIT_RAR_REMINDER, INIT_RAR_RECORD } from '../constants/config'

const initialState = {
  variety: [],
  plan: [],
  cycles: [],
  record: []
}

export default function Reducer (state = initialState, action) {
  const { type, payload } = action
  switch(type) {
    case INIT_VARIETY:
      return {
        ...state,
        ...payload
      }
    case INIT_RAR_REMINDER:
      return {
        ...state,
        ...payload
      }
    case INIT_RAR_RECORD:
      return {
        ...state,
        ...payload
      }
    default:
      return state
  }
}