/**
 * Created by c on 16/3/21.
 */
import { Route, IndexRoute } from 'react-router'

import MasterPage from 'containers/Master/Default'
import ModulePage from 'containers/Master/Module'
import DemoTablePage from 'containers/__demo/Table'
import DemoLoginPage from 'containers/__demo/Login'
<<<<<<< HEAD
import DemoDataTablePage from 'containers/__demo/DataTable'
=======
>>>>>>> develop_ytm_0420
import Error_404 from 'containers/Error/404'
import DemoPagination from 'containers/__demo/DemoPagination'
import DemoTodoList from 'containers/__demo/DemoTodoList'
import FormControl from 'components/common/base/FormControl'

import AccountListPage from 'containers/Business/Account/List'

import BusinessStatistic from 'containers/Business/Business/statistic'
import BusinessSummary from 'containers/Business/Business/summary'

export default (
    <Route path="/">
        <Route path="__demo" component={MasterPage}>
            <Route path="table" component={DemoTablePage}/>
            <Route path="login" component={DemoLoginPage}/>
<<<<<<< HEAD
            <Route path="Demopagination" component={DemoPagination}/>
            <Route path="DemoTodoList" component={DemoTodoList}/>
        </Route>
        <Route path="input" component={FormControl}>
=======
>>>>>>> develop_ytm_0420
        </Route>

        <Route path="scrmweb" component={ModulePage}>
            <Route path="accounts/index/VISITID/1" component={AccountListPage}/>
            <Route path="business/statistic/VISITID/1" component={BusinessStatistic}/>
            <Route path="business/summary/VISITID/1" component={BusinessSummary}/>
        </Route>
        <Route path="*" component={Error_404}/>
    </Route>
)