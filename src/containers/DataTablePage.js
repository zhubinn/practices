/**
 * Created by janeluck on 4/7/16.
 */


import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import DataTable from 'components/DataTable'
import  { getData }  from 'actions/table'

import {rowsData, columns, searchColumns} from 'components/DataTable/fakeData'

class DataTablePage extends React.Component {
    componentDidMount(){
        this.props.getData()
    }

    render() {
        const {getData, mapState} = this.props
        const $$rows = mapState.get('rows')
        const rows = ($$rows && $$rows.toJS()) || []


        let rows = []

        const search = params => {
            dispatch(action(params))
        }

        return (
            <div>
                <DataTable rows={rows} columns={columns} viewMode="{}" checkedbox="" loading="true"/>

                <SearchTable>
                    <SearchBar onSearch={searchAction}/>
                    <Table rows={rows}/>
                </SearchTable>
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
    searchAction
})(DataTablePage)