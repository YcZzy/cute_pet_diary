import { GET_REMINDERS } from '../constants/rar'
import { cloudAdapter } from '@utils/adapter'

export function getReminders (petId) {
  return async (dispatch) => {
    const res = await cloudAdapter('rar', 'getReminders', { petId })
    if (res.code === 0) {
      dispatch({
        type: GET_REMINDERS,
        payload: {
          reminders: res.data,
          loading: false
        }
      })
    }
  }
}