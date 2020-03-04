import { GETPETS } from '../constants/pet'
import { cloudAdapter } from '@utils/adapter'

export function getPets () {
  return async (dispatch) => {
    const res = await cloudAdapter('pet', 'getPets')
    if (res.code === 0) {
      dispatch({
        type: GETPETS,
        payload: {
          pets: res.data,
          loading: false
        }
      })
    }
  }
}