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
import DemoPagination from 'containers/__demo/DemoPagination'
import DemoTodoList from 'containers/__demo/DemoTodoList'
import FormControl from 'components/common/base/FormControl'

import AccountListPage from 'containers/Business/Account/List'
import CustomizablePage from 'containers/Business/Account/Customizable'
import StatisticPage from 'containers/Business/Account/Statistic'
import SummaryPage from 'containers/Business/Account/Summary'
import DetailPage from 'containers/Business/Account/Detail'


import BusinessStatistic from 'containers/Business/Business/statistic'
import BusinessSummary from 'containers/Business/Business/summary'

export default (
    <Route path="/">
        <Route path="__demo" component={MasterPage}>
            <Route path="table" component={DemoTablePage}/>
            <Route path="login" component={DemoLoginPage}/>
            <Route path="Demopagination" component={DemoPagination}/>
            <Route path="DemoTodoList" component={DemoTodoList}/>
        </Route>
        <Route path="scrmweb" component={ModulePage}>
            <Route path="accounts/index/VISITID/1" component={AccountListPage} />
            <Route path="business/statistic/VISITID/1" component={BusinessStatistic} />
            <Route path="business/summary/VISITID/1" component={BusinessSummary} />
            <Route path="accounts/define/VISITID/1" component={CustomizablePage} />
            <Route path="accounts/statistic/VISITID/1" component={StatisticPage} />
            <Route path="accounts/summary/VISITID/1" component={SummaryPage} />
            <Route path="accounts/detail/VISITID/1" component={DetailPage} />
        </Route>
        <Route path="*" component={Error_404}/>
    </Route>
)