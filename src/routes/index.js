/**
 * Created by c on 16/3/21.
 */
import { Route, IndexRoute } from 'react-router'

import IndexPage from 'containers'

import MasterPage from 'containers/Master/Default'
import ModulePage from 'containers/Master/Module'
import DemoTablePage from 'containers/__demo/Table'
import DemoLoginPage from 'containers/__demo/Login'


import DemoDataTablePage from 'containers/__demo/DataTable'
import Error_404 from 'containers/Error/404'

import AccountListPage from 'containers/Business/Account/List'
import CustomizablePage from 'containers/Business/Account/Customizable'
import StatisticPage from 'containers/Business/Account/Statistic'




export default (
    <Route path="/" >
        <Route path="__demo" component={MasterPage}>
            <Route path="table" component={DemoTablePage}/>
            <Route path="login" component={DemoLoginPage}/>

            <Route path="dataTable" component={DemoDataTablePage}/>

        </Route>
        <Route path="scrmweb" component={ModulePage}>
            <Route path="accounts/index/VISITID/1" component={AccountListPage}/>
            <Route path="accounts/define/VISITID/1" component={CustomizablePage}/>
            <Route path="accounts/statistic/VISITID/1" component={StatisticPage}/>

        </Route>


        <Route path="*" component={Error_404}/>
    </Route>

)