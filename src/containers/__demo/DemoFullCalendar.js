/**
 * Created by yangtm on 16-06-16.
 */
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import FullCalender from 'components/__demo/FullCalendar'

class DemoFullCalendar extends React.Component {
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
        $$mapState: state.__demo.DemoFullCalendar
    }
}

export default connect (mapStateToProps, {
}) (DemoFullCalendar)