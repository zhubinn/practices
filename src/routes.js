/**
 * Created by c on 16/3/21.
 */
import { Route, IndexRoute } from 'react-router'

import IndexPage from 'containers/IndexPage'
import NoMatch from 'containers/NoMatch'
import DemoTablePage from 'containers/__demo/TablePage'
import DemoLoginPage from 'containers/__demo/LoginPage'
<<<<<<< HEAD
import HelloPage from 'containers/__demo/HelloPage'
import CustomEditFieldPage from 'containers/__demo/CustomEditFieldPage'
// import DemoPagination from 'containers/__demo/Pagination'
import DemoReportListPage from 'containers/report/DemoReportListPage'

=======
import DemoAutoCompletePage from 'containers/__demo/AutoCompletePage'
import DemoDatePickerPage from 'containers/__demo/DatePickerPage'
import DemoModalPage from 'containers/__demo/ModalPage'
>>>>>>> b6ac639e4f87b0f971501f6f8d77f8583cb19300

export default (
    <Route path="/" component={IndexPage}>
        <Route path="__demo">
            <Route path="table" component={DemoTablePage}/>
            <Route path="login" component={DemoLoginPage}/>
<<<<<<< HEAD
            <Route path="hello" component={HelloPage}/>
            <Route path="customEditFieldPage" component={CustomEditFieldPage}/>
=======
            <Route path="autocomplete" component={DemoAutoCompletePage}/>
            <Route path="datepicker" component={DemoDatePickerPage}/>
            <Route path="daterange" component={DemoDatePickerPage}/>
            <Route path="modal" component={DemoModalPage}/>
>>>>>>> b6ac639e4f87b0f971501f6f8d77f8583cb19300
        </Route>
        /*<Route path="report">
            <Route path="list" component={DemoReportListPage}/>
        </Route>*/

        <Route path="*" component={NoMatch}/>
    </Route>
)