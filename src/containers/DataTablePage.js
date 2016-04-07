/**
 * Created by janeluck on 4/7/16.
 */


import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import DataTable from 'components/DataTable'
// import  {addTodo, changeStatus, showCompleted, showAll}  from 'actions/__demo/todo'

import {rowsData, columns, searchColumns} from 'components/DataTable/fakeData'

class DataTablePage extends React.Component {
    render () {

        return (
        <DataTable rows = {rowsData} columns = {columns} searchColumns = {searchColumns}/>

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