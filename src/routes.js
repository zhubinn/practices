/**
 * Created by c on 16/3/21.
 */
import { Route, IndexRoute } from 'react-router'
import { IndexPage, NoMatch } from 'containers'

export default (
    <Route path="/" component={IndexPage}>
        <Route path="scrmnumreport/index/index/VISITID/:id"/>
        <Route path="*" component={NoMatch}/>
    </Route>
)