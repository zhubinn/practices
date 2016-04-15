/**
 * Created by c on 16/3/21.
 */
import { Route, IndexRoute } from 'react-router'

import MasterPage from 'containers/Master/Default'
import DemoTablePage from 'containers/__demo/Table'
import DemoLoginPage from 'containers/__demo/Login'
import DemoAutoCompletePage from 'containers/__demo/AutoComplete'
import DemoDatePickerPage from 'containers/__demo/DatePicker'
import DepToTreePage from 'containers/__demo/DepToTree'
import DemoModalPage from 'containers/__demo/Modal'
import DemoDataTablePage from 'containers/__demo/DataTable'
import Error_404 from 'containers/Error/404'

import AccountListPage from 'containers/Business/Account/List'



export default (
    <Route path="/" component={MasterPage}>
        <Route path="__demo">
            <Route path="table" component={DemoTablePage}/>
            <Route path="login" component={DemoLoginPage}/>
            <Route path="autocomplete" component={DemoAutoCompletePage}/>
            <Route path="datepicker" component={DemoDatePickerPage}/>
            <Route path="daterange" component={DemoDatePickerPage}/>
            <Route path="deptotree" component={DepToTreePage}/>
            <Route path="modal" component={DemoModalPage}/>
            <Route path="dataTable" component={DemoDataTablePage}/>
        </Route>



        <Route path="scrmweb/accounts/index/VISITID/1" component={AccountListPage}/>
        <Route path="*" component={Error_404}/>
    </Route>
)