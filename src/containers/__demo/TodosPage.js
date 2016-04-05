/**
 * Created by janeluck on 4/5/16.
 */

import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import Todos from 'components/__demo/Todos'
import  addTodo  from 'actions/__demo/addTodo'

class TodosPage extends React.Component {
    render () {
        const { addTodo} = this.props

        const items =  this.props.mapState.items
        return (
            <Todos  add = {addTodo}  items = {items}/>

        )
    }
}

const mapStateToProps = (state, ownProps) => {
    return {
        mapState: state.todos
    }
}

export default connect (mapStateToProps, {
    addTodo
}) (TodosPage)