/**
 * Created by janeluck on 4/25/16.
 */

import { combineReducers } from 'redux'

import account_list from './account/list'
import account_list_person from './account/list/person'
import account_summary from './account/summary'

const componentReducers = combineReducers({
    account_list,
    account_summary,
    account_list_person
})

export default componentReducers