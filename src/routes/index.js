/**
 * Created by c on 16/3/21.
 */
import { Route, IndexRoute } from 'react-router'

import MasterPage from 'containers/Master/Default'
import ModulePage from 'containers/Master/Module'
import DemoTablePage from 'containers/__demo/Table'
import DemoLoginPage from 'containers/__demo/Login'
import DemoQueryNestedTablePage from 'containers/__demo/QueryNestedTable'
import Account_Summary_Page from 'containers/Business/Account/Summary'
import Error_404 from 'containers/Error/404'

export default (
    <Route path="/">
        <Route path="__demo"  component={MasterPage}>
            <Route path="table" component={DemoTablePage}/>
            <Route path="login" component={DemoLoginPage}/>
            <Route path="nested_table" component={DemoQueryNestedTablePage}/>
        </Route>


        <Route path="scrmweb" component={ModulePage}>
            <Route path="accounts/deptsummary/VISITID/1" component={Account_Summary_Page}/>
        </Route>
        <Route path="*" component={Error_404}/>
    </Route>


)