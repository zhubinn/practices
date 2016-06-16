/**
 * Created by c on 16/3/21.
 */
import { Route, IndexRoute } from 'react-router'



//Develop Leesx
//报数-报数查看
import NumberReportViewPage from 'containers/Business/NumberReport/ListView'
//线索-线索分派
import DispatchCluesPage from 'containers/Business/Clues/DispatchClues'
// import DemoPagination from 'containers/__demo/Pagination'


import IndexPage from 'containers'

import MasterPage from 'containers/Master/Default'
import ModulePage from 'containers/Master/Module'


import Error_404 from 'containers/Error/404'

import DemoTodoList from 'containers/__demo/DemoTodoList'

import DemoFullCalender from 'containers/__demo/DemoFullCalender'



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
import StatisticDetail from 'containers/Business/Business/Statistic/StatisticDetail'

import DeptSummary from 'containers/Business/Business/Summary/DeptSummary'
import PerSummary from 'containers/Business/Business/Summary/PerSummary'
import SummaryDetail from 'containers/Business/Business/Summary/SummaryDetail'

import DeptList from 'containers/Business/Business/List/Dept'
import PersonList from 'containers/Business/Business/List/Person'
import DeptDetail from 'containers/Business/Business/Detail/Dept'
import PersonDetail from 'containers/Business/Business/Detail/Person'
//客户穿透到生意列表明细
import PenetrateDetail from 'containers/Business/Business/Detail/PenetrateList'

//日志
import FuncLog from 'containers/Business/Log/FuncLog'
import DataLog from 'containers/Business/Log/DataLog'

export default (
    <Route path="/">
        <Route path="__demo" component={MasterPage}>
           <Route path="DemoTodoList" component={DemoTodoList}/>
           <Route path="DemoFullCalender" component={DemoFullCalender}/>
        </Route>


        <Route path="scrmweb" component={ModulePage}>
            <Route path="accounts">

                <Route path="define/*" component={CustomizablePage}/>
                <Route path="deptstatistic/*" component={DeptStatisticPage}/>
                <Route path="perstatistic/*" component={PerStatisticPage}/>
                <Route path="deptstatisticdetail/*" component={DeptStatisticDetailPage}/>
                <Route path="deptsummary/*" component={DeptSummaryPage}/>
                <Route path="persummary/*" component={PerSummaryPage}/>
                <Route path="deptsummarydetail/*" component={DeptSummaryDetailPage}/>
                <Route path="deptaccountdetail/*" component={Account_Detail_Dept_Page}/>
                <Route path="peraccountdetail/*" component={Account_Detail_Person_Page}/>
                <Route path="list/*" component={Account_List_Person_Page}/>
                <Route path="deptlist/*" component={Account_List_Dept_Page}/>
            </Route>
            <Route path="business">
                <Route path="deptsummary/*" component={DeptSummary} />
                <Route path="persummary/*" component={PerSummary} />

                <Route path="deptsummarydetail/*" component={SummaryDetail} />

                <Route path="deptstatistic/*" component={DeptStatistic} />
                <Route path="perstatistic/*" component={PerStatistic} />
                <Route path="deptstatisticdetail/*" component={StatisticDetail} />

                <Route path="deptlist/*" component={DeptList} />
                <Route path="list/*" component={PersonList} />
                <Route path="deptlistdetail/*" component={DeptDetail} />
                <Route path="listdetail/*" component={PersonDetail} />
                <Route path="penetratelist/*" component={PenetrateDetail} />

            </Route>
            <Route path="log">
                <Route path="datalog/*" component={DataLog} />
                <Route path="func/*" component={FuncLog} />
            </Route>

            <Route path="numreport">
                <Route path="list/*" component={NumberReportViewPage} />
            </Route>

            <Route path="lead">
                <Route path="dispatch/*" component={DispatchCluesPage} />
            </Route>

        </Route>

        <Route path="*" component={Error_404}/>
    </Route>


)