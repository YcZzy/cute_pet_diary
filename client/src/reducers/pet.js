import { GETPETS } from '../constants/pet'

const initialState = {
  pets: []
}

export default function Reducer (state = initialState, action) {
  const { type, payload } = action
  switch(type) {
    case GETPETS:
      return {
        ...state,
        pets: payload
      }
    default:
      return state
  }
}