/**
 * Created by c on 16/3/21.
 */
import { Route, IndexRoute } from 'react-router'

import MasterPage from 'containers/Master/Default'
import DemoTablePage from 'containers/__demo/Table'
import DemoLoginPage from 'containers/__demo/Login'
import DemoQueryNestedTablePage from 'containers/__demo/QueryNestedTable'
import Error_404 from 'containers/Error/404'

export default (
    <Route path="/" component={MasterPage}>
        <Route path="__demo">
            <Route path="table" component={DemoTablePage}/>
            <Route path="login" component={DemoLoginPage}/>
            <Route path="nested_table" component={DemoQueryNestedTablePage}/>
        </Route>
        <Route path="*" component={Error_404}/>
    </Route>
)