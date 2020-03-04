import { GETPETS } from '../constants/pet'

const initialState = {
  pets: [],
  loading: true
}

export default function Reducer (state = initialState, action) {
  const { type, payload } = action
  switch(type) {
    case GETPETS:
      return {
        ...state,
        ...payload
      }
    default:
      return state
  }
}