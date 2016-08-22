import { combineReducers } from 'redux'

function list(state = [], action){
  switch (action.type) {
    case 'INIT_LIST':
      return action.state;
    default:
      return state;

  }
}


export default combineReducers({
  list
})
