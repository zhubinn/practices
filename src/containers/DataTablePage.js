/**
 * Created by janeluck on 4/7/16.
 */


import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import DataTable from 'components/DataTable'
// import  {addTodo, changeStatus, showCompleted, showAll}  from 'actions/__demo/todo'

class DataTablePage extends React.Component {
    render () {

        return (
        <DataTable />

        )
    }
}

const mapStateToProps = (state, ownProps) => {
    return {
        mapState: state.dataTable
    }
}

export default connect (mapStateToProps, {

}) (DataTablePage)