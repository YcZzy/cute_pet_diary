import { combineReducers } from 'redux'
import mine from './mine'
import pet from './pet'

export default combineReducers({
  mine,
  pet
})