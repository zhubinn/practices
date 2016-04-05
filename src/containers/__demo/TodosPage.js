/**
 * Created by janeluck on 4/5/16.
 */

import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import Todos from 'components/__demo/Todos'
import  {addTodo, changeStatus, showCompleted, showAll}  from 'actions/__demo/todo'

class TodosPage extends React.Component {
    render () {
        const { addTodo,  changeStatus, showCompleted, showAll} = this.props

        const items =  this.props.mapState.items

        return (
            <Todos  add = {addTodo} showCompleted = {showCompleted} showAll = {showAll}

                items = { this.props.mapState.showFilter === 'ALL' ? items : items.filter(function(item){return item.completed})}
                onclick = {changeStatus}/>

        )
    }
}

const mapStateToProps = (state, ownProps) => {
    return {
        mapState: state.todos
    }
}

export default connect (mapStateToProps, {
    addTodo,
    changeStatus,
    showCompleted,
    showAll
}) (TodosPage)