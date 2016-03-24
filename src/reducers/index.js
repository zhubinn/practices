/**
 * Created by c on 16/3/21.
 */
import { combineReducers } from 'redux'
import { routerReducer as routing } from 'react-router-redux'
import userReducer from './__demo/user'

export default combineReducers ({
    userReducer,
    routing
})