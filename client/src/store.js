import thunk from 'redux-thunk'
import rootReducer from './reducers/root'
import { applyMiddleware, createStore } from 'redux'

const middlewares = [thunk]

const loadStore = preloadedState => createStore(rootReducer, preloadedState, applyMiddleware(...middlewares))

export default loadStore