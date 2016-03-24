/**
 * Created by c on 16/3/21.
 */
import { connect } from 'react-redux'

class IndexPage extends React.Component {
    render() {
        return (
            <div>
                <a href="/__demo/login">Login</a>
                <br/>
                <a href="/scrmnumreport/index/index/VISITID/1">crm</a>
                <br/>
                <a href="/__demo/index">table</a>
                {this.props.children}
            </div>
        )
    }
}

export default connect()(IndexPage)