/**
 * Created by chenhf on 16-4-13.
 */
import { combineReducers } from 'redux'
import statistic from './business/statistic'

import datalog from "log/datalog";
import funclog from "log/funclog";
import clearlog from "log/clearlog";

import account_list from './account/list'
import account_Customizable from './account/Customizable'
import account_statistic from './account/Statistic'
import account_summary from './account/Summary'
import account_detail from './account/Detail'

const businessReducers = combineReducers({
	datalog,
	funclog,
	clearlog,
    statistic,
    account_list,
    account_Customizable,
    account_statistic,
    account_summary,
    account_detail,
})

export default businessReducers