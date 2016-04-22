/**
 * Created by c on 16/3/21.
 */
import { Route, IndexRoute } from 'react-router'

import IndexPage from 'containers'

import MasterPage from 'containers/Master/Default'
import ModulePage from 'containers/Master/Module'
import DemoTablePage from 'containers/__demo/Table'
import DemoLoginPage from 'containers/__demo/Login'

import Error_404 from 'containers/Error/404'

import AccountListPage from 'containers/Business/Account/List'
import CustomizablePage from 'containers/Business/Account/Customizable'
import StatisticPage from 'containers/Business/Account/Statistic'
import DeptSummaryPage from 'containers/Business/Account/Summary/DeptSummary'
import PerSummaryPage from 'containers/Business/Account/Summary/PerSummary'
import DetailPage from 'containers/Business/Account/Detail'




export default (
    <Route path="/" >
        <Route path="__demo" component={MasterPage}>
            <Route path="table" component={DemoTablePage}/>
            <Route path="login" component={DemoLoginPage}/>
        </Route>

        <Route path="scrmweb" component={ModulePage}>
            <Route path="accounts/index/VISITID/1" component={AccountListPage}/>
            <Route path="accounts/define/VISITID/1" component={CustomizablePage}/>
            <Route path="accounts/statistic/VISITID/1" component={StatisticPage}/>
            <Route path="accounts/deptsummary/VISITID/1" component={DeptSummaryPage}/>
            <Route path="accounts/persummary/VISITID/1" component={PerSummaryPage}/>
            <Route path="accounts/detail/VISITID/1" component={DetailPage}/>

        </Route>
        <Route path="*" component={Error_404}/>
    </Route>
)