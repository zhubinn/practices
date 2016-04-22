/**
 * Created by c on 16/3/21.
 */
import { Route, IndexRoute } from 'react-router'


//Develop Leesx
import HelloPage from 'containers/__demo/HelloPage'
import CustomEditFieldPage from 'containers/__demo/CustomEditFieldPage'
import NumberReportViewPage from 'containers/Business/numberReport/NumberReportViewPage'
import DispatchCluesPage from 'containers/Business/clues/DispatchCluesPage'
import ManageCluesPage from 'containers/Business/clues/ManageCluesPage'
// import DemoPagination from 'containers/__demo/Pagination'
import DemoReportListPage from 'containers/report/DemoReportListPage'

import MasterPage from 'containers/Master/Default'
import ModulePage from 'containers/Master/Module'
import DemoTablePage from 'containers/__demo/Table'
import DemoLoginPage from 'containers/__demo/Login'

import DemoDataTablePage from 'containers/__demo/DataTable'

import Error_404 from 'containers/Error/404'

import AccountListPage from 'containers/Business/Account/List'



export default (

<Route path="/" component={MasterPage}>
    <Route path="__demo">
    <Route path="table" component={DemoTablePage}/>
    <Route path="login" component={DemoLoginPage}/>
    <Route path="hello" component={HelloPage}/>
    <Route path="customEditFieldPage" component={CustomEditFieldPage}/>
    <Route path="dispatchCluesPage" component={DispatchCluesPage}/>
    <Route path="manageCluesPage" component={ManageCluesPage}/>

    </Route>
    <Route path="numberReport">
        <Route path="numberReportViewPage" component={NumberReportViewPage}/>
    </Route>
    /*报数查看路由*/
    <Route path="scrmnumreport/index/list/:role/:id/:template/:tid" component={NumberReportViewPage}/>
    /*线索分派路由*/
    <Route path="scrmweb/lead/dispatch/:role/:id" component={DispatchCluesPage}/>
    /*<Route path="scrmnumreport/index/list/VISITID/1/templateID/528" component={NumberReportViewPage}/>*/
    <Route path="scrmweb" component={ModulePage}>
        <Route path="accounts/index/VISITID/1" component={AccountListPage}/>
    </Route>

    <Route path="*" component={Error_404}/>


    </Route>
)