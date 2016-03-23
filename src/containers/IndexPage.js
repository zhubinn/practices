/**
 * Created by c on 16/3/21.
 */
import { connect } from 'react-redux'

class IndexPage extends React.Component {
    render() {
        return (
            <div>
                {this.props.children}
            </div>
        )
    }
}

export default connect()(IndexPage)