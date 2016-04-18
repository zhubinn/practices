/**
 * Created by chenhf on 16-4-13.
 */
import { combineReducers } from 'redux'
import account_list from './account/list'
import account_Customizable from './account/Customizable'

const businessReducers = combineReducers({
    account_list,
    account_Customizable,
})

export default businessReducers