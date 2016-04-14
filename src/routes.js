/**
 * Created by c on 16/3/21.
 */
import { Route, IndexRoute } from 'react-router'

import IndexPage from 'containers/IndexPage'
import NoMatch from 'containers/NoMatch'
import DemoTablePage from 'containers/__demo/TablePage'
import DemoLoginPage from 'containers/__demo/LoginPage'
import DemoAutoCompletePage from 'containers/__demo/AutoCompletePage'
import DemoDatePickerPage from 'containers/__demo/DatePickerPage'
import DepToTreePage from 'containers/__demo/DepToTreePage'
import DemoModalPage from 'containers/__demo/ModalPage'
import DemoPagination from 'containers/__demo/DemoPagination'
import FormControl from 'components/common/base/FormControl'
export default (
    <Route path="/" component={IndexPage}>
        <Route path="__demo">
            <Route path="table" component={DemoTablePage}/>
            <Route path="login" component={DemoLoginPage}/>
            <Route path="autocomplete" component={DemoAutoCompletePage}/>
            <Route path="datepicker" component={DemoDatePickerPage}/>
            <Route path="daterange" component={DemoDatePickerPage}/>
            <Route path="deptotree" component={DepToTreePage}/>
            <Route path="modal" component={DemoModalPage}/>
            <Route path="Demopagination" component={DemoPagination}/>
        </Route>
        <Route path="form">
            <Route path="FormControl" component={FormControl}/>
        </Route>
        <Route path="*" component={NoMatch}/>
    </Route>
)