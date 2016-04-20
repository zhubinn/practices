/**
 * Created by chenhf on 16-4-13.
 */
import { combineReducers } from 'redux'
import account_list from './account/list'
import statistic from './business/statistic'

const businessReducers = combineReducers({
    account_list,
    statistic,
})

export default businessReducers