import { LOGIN, GETUSER } from '../constants/mine'
import Taro from '@tarojs/taro'

export const login = (user) => {
  return {
    type: LOGIN,
    payload: user
  }
}

export const getUser = () => {
  return (dispatch) => {
    Taro.getSetting({
      success: function (res) {
        if (res.authSetting["scope.userInfo"]) {
          Taro.getUserInfo({
            success: function (res) {
              var user = res.userInfo
              dispatch({
                type: GETUSER,
                payload: user
              })
            },
            fail: function (res) {
              dispatch({
                type: GETUSER,
                payload: null
              })
            }
          })
        } else {
          dispatch({
            type: GETUSER,
            payload: null
          })
        }
      },
      fail: function (res) {
        dispatch({
          type: GETUSER,
          payload: null
        })
      }
    })
  }
}