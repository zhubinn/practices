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


export default (
    <Route path="/" component={IndexPage}>
        <Route path="__demo">
            <Route path="table" component={DemoTablePage}/>
            <Route path="login" component={DemoLoginPage}/>
            <Route path="hello" component={HelloPage}/>
            <Route path="customEditFieldPage" component={CustomEditFieldPage}/>
        </Route>
        /*<Route path="report">
            <Route path="list" component={DemoReportListPage}/>
        </Route>*/

        <Route path="*" component={NoMatch}/>
    </Route>
)