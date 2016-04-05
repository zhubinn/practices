/**
 * Created by chenhf on 16-3-11.
 */
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import Pagination from 'components/pagination/index'
import { demoevent } from 'actions/userlist/index'

class Userlist extends React.Component {
	constructor(){
        super()
        this.demoeventFn = this.demoeventFn.bind(this)
    }
	demoeventFn() {
		const { demoevent } = this.props
		demoevent();
	}
    render() {
    	const { demoeventFn } = this
    	const { userlistdata } = this.props
    	const pending = userlistdata.get ('pending')
        const preDisabled = userlistdata.get('pagination').get ('preDisabled')
        return (
            <div>
            {pending}
            <Pagination preDisabled = {preDisabled} demoEvent={demoeventFn}/>
            </div>
        )
    }
}

const mapStateToProps = (state, ownProps) => {
    return {
        userlistdata: state.userlist
    }
}


export default connect(mapStateToProps, {
    demoevent
})(Userlist)