/**
 * Created by c on 16/3/21.
 */
import { connect } from 'react-redux'
import 'ucjs_modules/jquery-deptotree/1.0.0/jquery-deptotree.css'
import 'ucjs_modules/jquery-deptotree/1.0.0/jquery-deptotree.js'

class DepToTreePage extends React.Component {
    componentDidMount() {
        deptotree('#date-range0')
    }

    render() {
        return (
            <div>
                <input id="date-range0" size="40" value=""/>
            </div>
        )
    }
}

export default connect()(DepToTreePage)