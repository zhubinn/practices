/**
 * Created by yangtm on 16-06-16.
 */
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import FullCalender from 'components/__demo/FullCalender'

class DemoFullCalender extends React.Component {
	constructor(){
        super()
    }
    render() {
        return (
            <div>
                <FullCalender />
            </div>
        )
    }
}


const mapStateToProps = (state, ownProps) => {
    return {
        $$mapState: state.__demo.DemoFullCalender
    }
}

export default connect (mapStateToProps, {
}) (DemoFullCalender)