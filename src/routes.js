/**
 * Created by c on 16/3/21.
 */
import { Route, IndexRoute } from 'react-router'

import IndexPage from 'containers/IndexPage'
import NoMatch from 'containers/NoMatch'
import DemoTablePage from 'containers/__demo/TablePage'
import DemoLoginPage from 'containers/__demo/LoginPage'
import DemoAutoCompletePage from 'containers/__demo/AutoCompletePage'
import DemoDatePickerPage from 'containers/__demo/DatePickerPage'
import DemoModalPage from 'containers/__demo/ModalPage'

import DemoTodosPage from 'containers/__demo/TodosPage'
import DataTablePage from 'containers/DataTablePage'
import ContactPage from 'containers/ContactPage'
import TwoDataTablePage from 'containers/__dataTableDemo/twoTables'


export default (
    <Route path="/" component={IndexPage}>
        <Route path="__demo">
            <Route path="table" component={DemoTablePage}/>
            <Route path="login" component={DemoLoginPage}/>
            <Route path="autocomplete" component={DemoAutoCompletePage}/>
            <Route path="datepicker" component={DemoDatePickerPage}/>
            <Route path="daterange" component={DemoDatePickerPage}/>
            <Route path="modal" component={DemoModalPage}/>

            <Route path="todos" component={DemoTodosPage}/>

        </Route>
        <Route path="dataTable" component={DataTablePage}/>
        <Route path="contact" component={ContactPage}/>
        <Route path="twoDataTable" component={TwoDataTablePage}/>
        <Route path="scrmweb/accounts/index/VISITID/1" component={DataTablePage}/>


        <Route path="*" component={NoMatch}/>
    </Route>
)