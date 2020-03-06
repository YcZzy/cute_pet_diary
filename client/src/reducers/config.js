import { INIT_VARIETY, INIT_RAR_REMINDER } from '../constants/config'

const initialState = {
  variety: [],
  plan: [],
  cycles: []
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
    default:
      return state
  }
}