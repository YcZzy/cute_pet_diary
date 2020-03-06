import { combineReducers } from 'redux'
import mine from './mine'
import pet from './pet'
import config from './config'
import rar from './rar'

export default combineReducers({
  mine,
  pet,
  config,
  rar
})