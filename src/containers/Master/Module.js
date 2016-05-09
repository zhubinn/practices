/**
 * Created by janeluck on 4/25/16.
 */

import { connect } from 'react-redux'
import { Link } from 'react-router'


class ModulePage extends React.Component {
    render() {
        return (
            <div>
                {this.props.children}
            </div>
        )
    }
}

export default connect()(ModulePage)
