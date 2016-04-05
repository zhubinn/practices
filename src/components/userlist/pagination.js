/**
 * Created by chenhf on 16-3-11.
 */
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

class Pagination extends React.Component {
    render () {
        return (
            <div>222
            <button onClick={this.props.demoEvent}>event</button>
            </div>
            )
    }
}

export default Pagination
