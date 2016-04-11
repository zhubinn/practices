/**
 * Created by c on 16/3/21.
 */
import { Route, IndexRoute } from 'react-router'

import IndexPage from 'containers/IndexPage'
import NoMatch from 'containers/NoMatch'
import DemoTablePage from 'containers/__demo/TablePage'
import DemoLoginPage from 'containers/__demo/LoginPage'

import HelloPage from 'containers/__demo/HelloPage'
import CustomEditFieldPage from 'containers/__demo/CustomEditFieldPage'
// import DemoPagination from 'containers/__demo/Pagination'
import DemoReportListPage from 'containers/report/DemoReportListPage'


import DemoAutoCompletePage from 'containers/__demo/AutoCompletePage'
import DemoDatePickerPage from 'containers/__demo/DatePickerPage'
import DemoModalPage from 'containers/__demo/ModalPage'


export default (
    <Route path="/" component={IndexPage}>
        <Route path="__demo">
            <Route path="table" component={DemoTablePage}/>
            <Route path="login" component={DemoLoginPage}/>
            <Route path="hello" component={HelloPage}/>
            <Route path="customEditFieldPage" component={CustomEditFieldPage}/>

            <Route path="autocomplete" component={DemoAutoCompletePage}/>
            <Route path="datepicker" component={DemoDatePickerPage}/>
            <Route path="daterange" component={DemoDatePickerPage}/>
            <Route path="modal" component={DemoModalPage}/>

        </Route>
        /*<Route path="report">
            <Route path="list" component={DemoReportListPage}/>
        </Route>*/

        <Route path="*" component={NoMatch}/>
    </Route>
)