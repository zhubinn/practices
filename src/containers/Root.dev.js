/**
 * Created by c on 16/3/21.
 */
import { Router } from 'react-router'
import { Provider } from 'react-redux'

import routes from '../routes'

var rootEle = document.createElement('div');
rootEle.id = 'root'
document.body.appendChild(rootEle);

export default class Root extends React.Component {
    render() {
        const { store, history } = this.props
        return (
            <Provider store={store}>
                <Router history={history} routes={routes}/>
            </Provider>
        )
    }
}

Root.propTypes = {
    store: React.PropTypes.object.isRequired,
    history: React.PropTypes.object.isRequired
}