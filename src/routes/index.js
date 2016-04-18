/**
 * Created by c on 16/3/21.
 */
import { Route, IndexRoute } from 'react-router'

import IndexPage from 'containers'

import MasterPage from 'containers/Master/Default'
import ModulePage from 'containers/Master/Module'
import DemoTablePage from 'containers/__demo/Table'
import DemoLoginPage from 'containers/__demo/Login'

import DemoAutoCompletePage from 'containers/__demo/AutoComplete'
import DemoDatePickerPage from 'containers/__demo/DatePicker'
import DepToTreePage from 'containers/__demo/DepToTree'
import DemoModalPage from 'containers/__demo/Modal'
import DemoDataTablePage from 'containers/__demo/DataTable'
import Error_404 from 'containers/Error/404'

import AccountListPage from 'containers/Business/Account/List'
import CustomizablePage from 'containers/Business/Account/Customizable'


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
            <Route path="search" component={DemoSearchPage}/>
            <Route path="customizable" component={CustomizablePage}/>
            <Route path="dataTable" component={DemoDataTablePage}/>

        </Route>
        <Route path="scrmweb" component={ModulePage}>
            <Route path="accounts/index/VISITID/1" component={AccountListPage}/>
            <Route path="search" component={DemoSearchPage}/>
            <Route path="accounts/define/VISITID/1" component={CustomizablePage}/>
        </Route>


        <Route path="*" component={Error_404}/>
    </Route>

)