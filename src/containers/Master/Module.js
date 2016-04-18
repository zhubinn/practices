/**
 * Created by janeluck on 4/7/16.
 */

import { connect } from 'react-redux'
import { Link } from 'react-router'

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