import { combineReducers } from 'redux';
import formLogicReducer from '../features/formlogic/formlogicSlice';
import homeReducer from '../features/home/homeSlice';
import formMemoryReducer from '../features/formmemory/formmemorySlice';

const rootReducer = combineReducers({
    formLogic: formLogicReducer,
    home: homeReducer,
    formMemory: formMemoryReducer
  })
  
  export default rootReducer
