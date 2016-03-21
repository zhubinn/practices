/**
 * Created by c on 16/3/21.
 */
import { Route, IndexRoute } from 'react-router'
import { IndexPage } from 'containers/IndexPage'

export default (
    <Route path="/" component={IndexPage}>
        <Route path="scrmnumreport/index/index/VISITID/:id"/>
    </Route>
)