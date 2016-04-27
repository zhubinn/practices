/**
 * Created by janeluck on 4/25/16.
 */

import { combineReducers } from 'redux'

import account_list from './account/list'
import account_summary from './account/summary'

const componentReducers = combineReducers({
    account_list,
    account_summary
})

export default componentReducers