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

import CustomizablePage from 'containers/Business/Account/Customizable'
import DeptStatisticPage from 'containers/Business/Account/Statistic/DeptStatistic'
import PerStatisticPage from 'containers/Business/Account/Statistic/PerStatistic'
import DeptStatisticDetailPage from 'containers/Business/Account/Statistic/DeptStatisticDetail'
import DeptSummaryPage from 'containers/Business/Account/Summary/DeptSummary'
import PerSummaryPage from 'containers/Business/Account/Summary/PerSummary'
import DeptSummaryDetailPage from 'containers/Business/Account/Summary/DeptSummaryDetail'



export default (
    <Route path="/">
        <Route path="__demo" component={MasterPage}>
            <Route path="table" component={DemoTablePage}/>
            <Route path="login" component={DemoLoginPage}/>
            <Route path="nested_table" component={DemoQueryNestedTablePage}/>
        </Route>


        <Route path="scrmweb" component={ModulePage}>
            <Route path="accounts">

                <Route path="deptaccountdetail/VISITID/1" component={Account_Detail_Page}/>
                <Route path="list/VISITID/1" component={Account_List_Person_Page}/>
                <Route path="deptlist/VISITID/1" component={Account_List_Page}/>
                <Route path="define/VISITID/1" component={CustomizablePage}/>
                <Route path="deptstatistic/VISITID/1" component={DeptStatisticPage}/>
                <Route path="perstatistic/VISITID/1" component={PerStatisticPage}/>
                <Route path="deptstatisticdetail/VISITID/1" component={DeptStatisticDetailPage}/>
                <Route path="deptsummary/VISITID/1" component={DeptSummaryPage}/>
                <Route path="persummary/VISITID/1" component={PerSummaryPage}/>
                <Route path="deptsummarydetail/VISITID/1" component={DeptSummaryDetailPage}/>

            </Route>

        </Route>

        <Route path="*" component={Error_404}/>
    </Route>


)