/**
 * Created by c on 16/3/21.
 */
import { Route, IndexRoute } from 'react-router'

<<<<<<< HEAD:src/routes.js
import IndexPage from 'containers/IndexPage'
import NoMatch from 'containers/NoMatch'
import DemoTablePage from 'containers/__demo/TablePage'
import DemoLoginPage from 'containers/__demo/LoginPage'

import HelloPage from 'containers/__demo/HelloPage'
import CustomEditFieldPage from 'containers/__demo/CustomEditFieldPage'
import NumberReportViewPage from 'containers/numberReport/NumberReportViewPage'
// import DemoPagination from 'containers/__demo/Pagination'
import DemoReportListPage from 'containers/report/DemoReportListPage'


import DemoAutoCompletePage from 'containers/__demo/AutoCompletePage'
import DemoDatePickerPage from 'containers/__demo/DatePickerPage'
import DepToTreePage from 'containers/__demo/DepToTreePage'
import DemoModalPage from 'containers/__demo/ModalPage'
=======
import MasterPage from 'containers/Master/Default'
import DemoTablePage from 'containers/__demo/Table'
import DemoLoginPage from 'containers/__demo/Login'
import DemoAutoCompletePage from 'containers/__demo/AutoComplete'
import DemoDatePickerPage from 'containers/__demo/DatePicker'
import DepToTreePage from 'containers/__demo/DepToTree'
import DemoModalPage from 'containers/__demo/Modal'
import Error_404 from 'containers/Error/404'
>>>>>>> edea6834b571935104b73013b17a1c07db74ebc5:src/routes/index.js


export default (
    <Route path="/" component={MasterPage}>
        <Route path="__demo">
            <Route path="table" component={DemoTablePage}/>
            <Route path="login" component={DemoLoginPage}/>
            <Route path="hello" component={HelloPage}/>
            <Route path="customEditFieldPage" component={CustomEditFieldPage}/>


            <Route path="autocomplete" component={DemoAutoCompletePage}/>
            <Route path="datepicker" component={DemoDatePickerPage}/>
            <Route path="daterange" component={DemoDatePickerPage}/>
            <Route path="deptotree" component={DepToTreePage}/>
            <Route path="modal" component={DemoModalPage}/>

        </Route>
<<<<<<< HEAD:src/routes.js
        <Route path="numberReport">
            <Route path="numberReportViewPage" component={NumberReportViewPage}/>
        </Route>
        /*<Route path="report">
            <Route path="list" component={DemoReportListPage}/>
        </Route>*/

        <Route path="*" component={NoMatch}/>
=======
        <Route path="*" component={Error_404}/>
>>>>>>> edea6834b571935104b73013b17a1c07db74ebc5:src/routes/index.js
    </Route>
)