/**
 * Created by janeluck on 4/7/16.
 */


import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import DataTable from 'components/DataTable'
import  { getData, showDetail, checkRow, updateRow, toggleSearch}  from 'actions/table'

import {rowsData, columns, searchColumns} from 'components/DataTable/fakeData'


class DataTablePage extends React.Component {
    componentDidMount() {
        // 页面初始完,获取数据,触发action: GET_DATA
        this.props.getData()

        console.log(this.refs.dataTable)
    }

    render() {
        const {mapState, showDetail, checkRow, updateRow, toggleSearch} = this.props
        const $$rows = mapState.get('rows')
        const rows = ($$rows && $$rows.toJS()) || []
        const $$selectedRowDetailObj = mapState.get('selectedRowDetailObj')

        const selectedRowDetailObj = ($$selectedRowDetailObj && $$selectedRowDetailObj.toJS()) ||{}

        const $$checkedRows = mapState.get('checkedRows')
        const checkedRows = ($$checkedRows && $$checkedRows.toJS()) || []
        const searchBarShow = mapState.get('searchBarShow')

        const pending = mapState.get('pending')


        return (
            <div style={{margin: '20px'}}>
                <div>
                    <button onClick={(e)=>{console.log(this.refs.dataTable.getCheckedRows())}}>获取已经选择的行</button>
                </div>
                <div>
                    <button onClick={function(){toggleSearch(true)}}>高级搜索</button>
                    <button onClick={function(){toggleSearch(false)}}>确定</button>
                </div>

                <div className='w820'>
                    <DataTable ref="dataTable"
                               checkMode={true}
                               onCheckRow={checkRow}
                               hasDetail={true}
                               checkedRows={checkedRows}
                               rows={rows}
                               selectedRowDetailObj={selectedRowDetailObj}
                               searchColumns={searchColumns}
                               columns={columns}
                               searchBarStatus={searchBarShow}
                               onUpdateRow={updateRow}
                               onShowDetail={showDetail}
                               pending = {pending}

                    />

                </div>
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
    showDetail,
    checkRow,
    updateRow,
    toggleSearch
})(DataTablePage)