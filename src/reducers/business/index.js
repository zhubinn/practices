/**
 * Created by chenhf on 16-4-13.
 */
import { combineReducers } from 'redux'
import account_list from './account/list'

const businessReducers = combineReducers({
    account_list,
})

export default businessReducers