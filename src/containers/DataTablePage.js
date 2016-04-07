/**
 * Created by janeluck on 4/7/16.
 */


import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import DataTable from 'components/DataTable'
import  { getData, showDetail }  from 'actions/table'

import {rowsData, columns, searchColumns} from 'components/DataTable/fakeData'

class DataTablePage extends React.Component {
    componentDidMount(){
        this.props.getData()
    }

    render() {
        const {mapState, showDetail} = this.props
        const $$rows = mapState.get('rows')
        const rows = ($$rows && $$rows.toJS()) || []
        const $$separatedIndexes = mapState.get('separatedIndexes')

        const separatedIndexes = ($$separatedIndexes && $$separatedIndexes.toJS()) || []

        return (
            <div>
                <DataTable rows={rows} separatedIndexes = {separatedIndexes} searchColumns = {searchColumns} columns={columns}  onShowDetail = {showDetail} />


            </div>
        )
    }
}

const mapStateToProps = (state, ownProps) => {
    return {
        mapState: state.dataTable
    }
}

export default connect(mapStateToProps, {
    getData,
    showDetail
})(DataTablePage)