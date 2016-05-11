/**
 * Created by chenhf on 16-3-11.
 */
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import Hello from 'components/__demo/hello'

import { sayHello,clickHello,addHello,deleteHello,searchHello } from 'actions/__demo/hello'


class HelloPage extends React.Component {


    render () {
        const { sayHello, mapState,clickHello,addHello,deleteHello,searchHello} = this.props;
        return (
            <div>
                <Hello  sayHello = {sayHello} clickHello = { clickHello } addHello = { addHello } deleteHello = {deleteHello}
                        mapState = {mapState} searchHello = {searchHello} />
            </div>
        )
    }
}


const mapStateToProps = (state, ownProps) => {
    return {
        mapState: state.hello
    }
};

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators(TodoActions, dispatch)
    }
}


export default connect(mapStateToProps,{
    sayHello,
    clickHello,
    addHello,
    deleteHello,
    searchHello
})(HelloPage)