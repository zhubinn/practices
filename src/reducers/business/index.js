/**
 * Created by chenhf on 16-4-13.
 */
import { combineReducers } from 'redux'
import account_list from './account/list'
import account_Customizable from './account/Customizable'
import account_statistic from './account/Statistic'
import account_summary from './account/Summary'

const businessReducers = combineReducers({
    account_list,
    account_Customizable,
    account_statistic,
    account_summary,
})

export default businessReducers