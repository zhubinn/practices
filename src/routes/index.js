/**
 * Created by c on 16/3/21.
 */
import { Route, IndexRoute } from 'react-router'

import MasterPage from 'containers/Master/Default'
import ModulePage from 'containers/Master/Module'
import DemoTablePage from 'containers/__demo/Table'
import DemoLoginPage from 'containers/__demo/Login'
import DemoAutoCompletePage from 'containers/__demo/AutoComplete'
import DemoDatePickerPage from 'containers/__demo/DatePicker'
import DepToTreePage from 'containers/__demo/DepToTree'
import DemoModalPage from 'containers/__demo/Modal'
//import DemoDataTablePage from 'containers/__demo/DataTable'
import Error_404 from 'containers/Error/404'
import DemoPagination from 'containers/__demo/DemoPagination'
import DemoTodoList from 'containers/__demo/DemoTodoList'
import FormControl from 'components/common/base/FormControl'

import AccountListPage from 'containers/Business/Account/List'

import businessStatistic from 'containers/Business/Business/statistic'
import businessSummary from 'containers/Business/Business/summary'

export default (
    <Route path="/" >
        <Route path="__demo" component={MasterPage}>
            <Route path="table" component={DemoTablePage}/>
            <Route path="login" component={DemoLoginPage}/>
            <Route path="autocomplete" component={DemoAutoCompletePage}/>
            <Route path="datepicker" component={DemoDatePickerPage}/>
            <Route path="daterange" component={DemoDatePickerPage}/>
            <Route path="deptotree" component={DepToTreePage}/>
            <Route path="modal" component={DemoModalPage}/>
            <Route path="Demopagination" component={DemoPagination}/>
            <Route path="DemoTodoList" component={DemoTodoList}/>
        </Route>
        <Route path="input" component={FormControl}>
        </Route>
        <Route path="scrmweb" component={ModulePage}>
             <Route path="accounts/index/VISITID/1" component={AccountListPage}/>
             <Route path="business/statistic/VISITID/1" component={businessStatistic}/>
             <Route path="business/summary/VISITID/1" component={businessSummary}/>
        </Route>
        <Route path="*" component={Error_404}/>
    </Route>

)