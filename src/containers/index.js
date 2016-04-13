/**
 * Created by c on 16/3/21.
 */
import { Router } from 'react-router'
import { Provider } from 'react-redux'

import routes from 'routes'

export default class RootElement extends React.Component {
    render() {
        const { store, history } = this.props
        return (
            <Provider store={store}>
                <Router history={history} routes={routes}/>
            </Provider>
        )
    }
}

RootElement.propTypes = {
    store: React.PropTypes.object.isRequired,
    history: React.PropTypes.object.isRequired
}