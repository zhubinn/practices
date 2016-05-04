/**
 * Created by janeluck on 4/25/16.
 */

import { combineReducers } from 'redux'

import account_list_dept from './account/list/dept'
import account_list_person from './account/list/person'
import account_detail_person from './account/detail/person'

const componentReducers = combineReducers({

    account_detail_person,
    account_list_dept,
    account_list_person
})

export default componentReducers