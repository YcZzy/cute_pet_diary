import { INIT_VARIETY, INIT_RAR_REMINDER, INIT_RAR_RECORD } from '../constants/config'
import { cloudAdapter } from '@utils/adapter'

export function initVariety () {
  return async (dispatch) => {
    const res = await cloudAdapter('config', 'initVariety')
    if (res.code === 0) {
      dispatch({
        type: INIT_VARIETY,
        payload: {
          variety: res.data
        }
      })
    }
  }
}

export function initRarReminder() {
  return async (dispatch) => {
    const res = await cloudAdapter('config', 'initRarReminder')
    if (res.code === 0) {
      dispatch({
        type: INIT_RAR_REMINDER,
        payload: {
          plan: res.data.plan,
          cycles: res.data.cycles
        }
      })
    }
  }
}

export function initRarRecord() {
  return async (dispatch) => {
    const res = await cloudAdapter('config', 'initRarRecord')
    if (res.code === 0) {
      dispatch({
        type: INIT_RAR_RECORD,
        payload: {
          record: res.data
        }
      })
    }
  }
}