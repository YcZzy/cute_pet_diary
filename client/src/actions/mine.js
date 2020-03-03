import { LOGIN } from '../constants/mine'

export const login = (user) => {
  return {
    type: LOGIN,
    payload: user
  }
}