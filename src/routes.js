/**
 * Created by c on 16/3/21.
 */
import { Route, IndexRoute } from 'react-router'
import { IndexPage, NoMatch, DemoIndexPage, DemoLoginPage } from 'containers'

export default (
    <Route path="/" component={IndexPage}>
        <Route path="scrmnumreport/index/index/VISITID/:id"/>
        <Route path="__demo">
            <Route path="index" component={DemoIndexPage}/>
            <Route path="login" component={DemoLoginPage}/>
        </Route>
        <Route path="*" component={NoMatch}/>
    </Route>
)