/**
 * Created by chenhf on 16-3-23.
 */
import { isPlainObject, isFunction, isString } from 'lodash'
import warning from 'fbjs/lib/warning'

class ReportList extends React.Component {
    render() {
        return (
            <div>222

            <button onClick={this.props.update}>update</button>
            </div> 
        )
    }
}
export default ReportList