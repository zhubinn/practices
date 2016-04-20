/**
 * Created by c on 16/3/21.
 */
import { Route, IndexRoute } from 'react-router'

import MasterPage from 'containers/Master/Default'
import ModulePage from 'containers/Master/Module'
import DemoTablePage from 'containers/__demo/Table'
import DemoLoginPage from 'containers/__demo/Login'
import Error_404 from 'containers/Error/404'

import AccountListPage from 'containers/Business/Account/List'



export default (
    <Route path="/" >
        <Route path="__demo" component={MasterPage}>
            <Route path="table" component={DemoTablePage}/>
            <Route path="login" component={DemoLoginPage}/>
        </Route>

        <Route path="scrmweb" component={ModulePage}>
            <Route path="accounts/index/VISITID/1" component={AccountListPage}/>
        </Route>
        <Route path="*" component={Error_404}/>
    </Route>
)