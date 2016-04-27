/**
 * Created by c on 16/3/21.
 */
import { Route, IndexRoute } from 'react-router'

import IndexPage from 'containers'

import MasterPage from 'containers/Master/Default'
import ModulePage from 'containers/Master/Module'
import DemoTablePage from 'containers/__demo/Table'
import DemoLoginPage from 'containers/__demo/Login'
import DemoQueryNestedTablePage from 'containers/__demo/QueryNestedTable'
import Account_List_Page from 'containers/Business/Account/List'
import Account_Summary_Page from 'containers/Business/Account/Summary'
import Error_404 from 'containers/Error/404'
import DemoPagination from 'containers/__demo/DemoPagination'
import DemoTodoList from 'containers/__demo/DemoTodoList'
import FormControl from 'components/common/base/FormControl'

import AccountListPage from 'containers/Business/Account/List'
import CustomizablePage from 'containers/Business/Account/Customizable'
import StatisticPage from 'containers/Business/Account/Statistic'
import DeptSummaryPage from 'containers/Business/Account/Summary/DeptSummary'
import PerSummaryPage from 'containers/Business/Account/Summary/PerSummary'
import DetailPage from 'containers/Business/Account/Detail'

//生意
import BusinessStatistic from 'containers/Business/Business/Statistic'
import BusinessSummary from 'containers/Business/Business/Summary'

//日志
import FuncLog from 'containers/Business/Log/FuncLog'
import DataLog from 'containers/Business/Log/DataLog'

import searchPeople from 'containers/__demo/searchPeople'

export default (
    <Route path="/">
        <Route path="__demo" component={MasterPage}>
            <Route path="table" component={DemoTablePage}/>
            <Route path="login" component={DemoLoginPage}/>
            <Route path="Demopagination" component={DemoPagination}/>
            <Route path="DemoTodoList" component={DemoTodoList}/>
            <Route path="searchPeople" component={searchPeople}/>
            <Route path="nested_table" component={DemoQueryNestedTablePage}/>
        </Route>
        <Route path="scrmweb" component={ModulePage}>
            <Route path="accounts/index/VISITID/1" component={AccountListPage}/>
            <Route path="accounts/define/VISITID/1" component={CustomizablePage}/>
            <Route path="accounts/statistic/VISITID/1" component={StatisticPage}/>
            <Route path="accounts/deptsummary/VISITID/1" component={DeptSummaryPage}/>
            <Route path="accounts/persummary/VISITID/1" component={PerSummaryPage}/>
            <Route path="accounts/detail/VISITID/1" component={DetailPage}/>

            <Route path="business/statistic/VISITID/1" component={BusinessStatistic} />
            <Route path="business/summary/VISITID/1" component={BusinessSummary} />
            <Route path="log/datalog/VISITID/1" component={DataLog} />
            <Route path="log/func/VISITID/1" component={DemoQueryNestedTablePage} />
        </Route>
        <Route path="*" component={Error_404}/>
    </Route>


)