/**
 * Created by c on 16/3/21.
 */
import { compose, createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import createLogger from 'redux-logger'
import rootReducer from 'reducers'

export default function configureStore (initialState) {
    return createStore (rootReducer, initialState, applyMiddleware (thunk, createLogger ()))
}