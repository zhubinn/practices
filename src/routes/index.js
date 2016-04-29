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
import Account_List_Person_Page from 'containers/Business/Account/List/Person'
import Account_Detail_Page from 'containers/Business/Account/Detail'
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
            <Route path="accounts">
                <Route path="deptaccountdetail/VISITID/1" component={Account_Detail_Page}/>
                <Route path="list/VISITID/1" component={Account_List_Person_Page}/>
                <Route path="deptlist/VISITID/1" component={Account_List_Page}/>
            </Route>
            <Route path="business">
                <Route path="statistic/VISITID/1" component={BusinessStatistic} />
                <Route path="summary/VISITID/1" component={BusinessSummary} />
            </Route>
            <Route path="log">
                <Route path="datalog/VISITID/1" component={DataLog} />
                <Route path="func/VISITID/1" component={FuncLog} />
            </Route>
        </Route>

        <Route path="*" component={Error_404}/>
    </Route>


)