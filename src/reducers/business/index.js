/**
 * Created by chenhf on 16-4-13.
 */
import { combineReducers } from 'redux'

import datalog from "./log/datalog"
import FuncLog from "./log/funclog"

import deptstatistic from "./business/deptstatistic"

import account_list from './account/list'
import account_list_person from './account/list/person'
import account_detail from './account/detail'

const businessReducers = combineReducers({
	deptstatistic,
	datalog,
	FuncLog,
    account_list,
    account_detail,
    account_list_person
})

export default businessReducers
