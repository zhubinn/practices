/**
 * Created by janeluck on 4/25/16.
 */

import { combineReducers } from 'redux'

import account_list from './account/list'
import account_list_person from './account/list/person'
import account_detail from './account/detail'

const componentReducers = combineReducers({
    account_list,
    account_detail,
    account_list_person
})

export default componentReducers