import { GET_REMINDERS, GET_RECORDS } from '../constants/rar'
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

export function getRecords (petId) {
  return async (dispatch) => {
    const res = await cloudAdapter('rar', 'getRecords', { petId })
    if (res.code === 0) {
      dispatch({
        type: GET_RECORDS,
        payload: {
          records: res.data,
          loading: false
        }
      })
    }
  }
}