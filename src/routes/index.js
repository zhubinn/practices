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


import IndexPage from 'containers'

import MasterPage from 'containers/Master/Default'
import ModulePage from 'containers/Master/Module'
import DemoTablePage from 'containers/__demo/Table'
import DemoLoginPage from 'containers/__demo/Login'
import DemoQueryNestedTablePage from 'containers/__demo/QueryNestedTable'


import Account_List_Dept_Page from 'containers/Business/Account/List/Dept'
import Account_List_Person_Page from 'containers/Business/Account/List/Person'
import Account_Detail_Page from 'containers/Business/Account/Detail'
import Account_Detail_Person_Page from 'containers/Business/Account/Detail/Person'

import Error_404 from 'containers/Error/404'
import DemoPagination from 'containers/__demo/DemoPagination'
import DemoTodoList from 'containers/__demo/DemoTodoList'
import FormControl from 'components/common/base/FormControl'

import CustomizablePage from 'containers/Business/Account/Customizable'
import StatisticPage from 'containers/Business/Account/Statistic'
import DeptSummaryPage from 'containers/Business/Account/Summary/DeptSummary'
import PerSummaryPage from 'containers/Business/Account/Summary/PerSummary'
import DetailPage from 'containers/Business/Account/Detail'

//生意
import Deptstatistic from 'containers/Business/Business/Statistic/deptstatistic'

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

                <Route path="deptaccountdetail/:role/:id" component={Account_Detail_Page}/>
                <Route path="peraccountdetail/:role/:id" component={Account_Detail_Person_Page}/>
                <Route path="list/:role/:id" component={Account_List_Person_Page}/>
                <Route path="deptlist/:role/:id" component={Account_List_Dept_Page}/>
            </Route>
            <Route path="business">
                <Route path="deptstatistic/VISITID/1" component={Deptstatistic} />
            </Route>
            <Route path="log">
                <Route path="datalog/VISITID/1" component={DataLog} />
                <Route path="func/VISITID/1" component={FuncLog} />
            </Route>
        </Route>

        <Route path="*" component={Error_404}/>
    </Route>


)