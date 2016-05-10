/**
 * Created by c on 16/3/21.
 */
import { Route, IndexRoute } from 'react-router'

import IndexPage from 'containers'

import MasterPage from 'containers/Master/Default'
import ModulePage from 'containers/Master/Module'
import DemoTablePage from 'containers/__demo/Table'
import DemoLoginPage from 'containers/__demo/Login'
import selectPeoplePage from 'containers/__demo/selectPeople'

import DemoQueryNestedTablePage from 'containers/__demo/QueryNestedTable'

import Error_404 from 'containers/Error/404'


//客户
import CustomizablePage from 'containers/Business/Account/Customizable'
import DeptStatisticPage from 'containers/Business/Account/Statistic/DeptStatistic'
import PerStatisticPage from 'containers/Business/Account/Statistic/PerStatistic'
import DeptStatisticDetailPage from 'containers/Business/Account/Statistic/DeptStatisticDetail'
import DeptSummaryPage from 'containers/Business/Account/Summary/DeptSummary'
import PerSummaryPage from 'containers/Business/Account/Summary/PerSummary'
import DeptSummaryDetailPage from 'containers/Business/Account/Summary/DeptSummaryDetail'

import Account_List_Dept_Page from 'containers/Business/Account/List/Dept'
import Account_List_Person_Page from 'containers/Business/Account/List/Person'
import Account_Detail_Person_Page from 'containers/Business/Account/Detail/Person'
import Account_Detail_Dept_Page from 'containers/Business/Account/Detail/Dept'


//生意
import DeptStatistic from 'containers/Business/Business/Statistic/DeptStatistic'
import PerStatistic from 'containers/Business/Business/Statistic/PerStatistic'

import DeptSummary from 'containers/Business/Business/Summary/DeptSummary'
import PerSummary from 'containers/Business/Business/Summary/DeptSummary'

//日志
import FuncLog from 'containers/Business/Log/FuncLog'
import DataLog from 'containers/Business/Log/DataLog'

export default (
    <Route path="/">
        <Route path="__demo" component={MasterPage}>
            <Route path="table" component={DemoTablePage}/>
            <Route path="login" component={DemoLoginPage}/>
            <Route path="nested_table" component={DemoQueryNestedTablePage}/>
            <Route path="selectPeople" component={selectPeoplePage}/>

        </Route>


        <Route path="scrmweb" component={ModulePage}>
            <Route path="accounts">

                <Route path="define/:role/:id" component={CustomizablePage}/>
                <Route path="deptstatistic/:role/:id" component={DeptStatisticPage}/>
                <Route path="perstatistic/:role/:id" component={PerStatisticPage}/>
                <Route path="deptstatisticdetail/:role/:id" component={DeptStatisticDetailPage}/>
                <Route path="deptsummary/:role/:id" component={DeptSummaryPage}/>
                <Route path="persummary/:role/:id" component={PerSummaryPage}/>
                <Route path="deptsummarydetail/:role/:id" component={DeptSummaryDetailPage}/>
                <Route path="deptaccountdetail/:role/:id" component={Account_Detail_Dept_Page}/>
                <Route path="peraccountdetail/:role/:id" component={Account_Detail_Person_Page}/>
                <Route path="list/:role/:id" component={Account_List_Person_Page}/>
                <Route path="deptlist/:role/:id" component={Account_List_Dept_Page}/>
            </Route>
            <Route path="business">
                <Route path="deptstatistic/:role/:id" component={DeptStatistic} />
                <Route path="perstatistic/:role/:id" component={PerStatistic} />
                <Route path="deptsummary/:role/:id" component={DeptSummary} />
                <Route path="persummary/:role/:id" component={PerSummary} />
            </Route>
            <Route path="log">
                <Route path="datalog/:role/:id" component={DataLog} />
                <Route path="func/:role/:id" component={FuncLog} />
            </Route>
        </Route>

        <Route path="*" component={Error_404}/>
    </Route>


)