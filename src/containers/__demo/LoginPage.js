/**
 * Created by chenhf on 16-3-11.
 */
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import Login from 'components/__demo/Login'
import { userLogin } from 'actions/__demo/user'

class UserLoginPage extends React.Component {
    render () {
        const { userLogin, mapState } = this.props
        const pending = mapState.get ('pending')

        return (
            <Login ref="ck_login" login={ userLogin } pending={ pending }/>
        )
    }
}

const mapStateToProps = (state, ownProps) => {
    return {
        mapState: state.user
    }
}

export default connect (mapStateToProps, {
    userLogin
}) (UserLoginPage)