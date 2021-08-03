// import { configureStore } from '@reduxjs/toolkit';
// import counterReducer from '../features/counter/counterSlice';
// import formLogicReducer from '../features/formlogic/formlogicSlice';
// import headerReducer from '../features/headers/headerSlice';
// import formMemoryReducer from '../features/formmemory/formmemorySlice';
import { createStore, applyMiddleware, compose } from 'redux'
import thunkMiddleware from 'redux-thunk'
import rootReducer from './reducer'

const loggerMiddleware = storeAPI => next => action => {
    console.log('dispatching', action)
    let result = next(action)
    console.log('next state', storeAPI.getState())
    return result
  }

const composedEnhancer = compose(
    applyMiddleware(thunkMiddleware),
    applyMiddleware(loggerMiddleware))

// The store now has the ability to accept thunk functions in `dispatch`
const store = createStore(rootReducer, composedEnhancer)

// const fetchSomeData = (dispatch, getState) => {
//   // Make an async HTTP request
//   fetch('http://localhost:9000/output').then(headers => {
//     // Dispatch an action with the todos we received
//     dispatch({ type: 'todos/todosLoaded', payload: headers })
//     // Check the updated store state after dispatching
//     const allHeaders = getState().headers
//     console.log('Number of headers after loading: ', allHeaders.length)
//   })
// }

// // Pass the _function_ we wrote to `dispatch`
// store.dispatch(fetchSomeData)

export default store;


// export const store = configureStore({
//   reducer: {
//     counter: counterReducer,
//     formLogic: formLogicReducer,
//     header: headerReducer,
//     formMemory: formMemoryReducer
//   },
// });

