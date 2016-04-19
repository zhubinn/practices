/**
 * Created by janeluck on 4/7/16.
 */


import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import DataTable from 'components/Business/DataTable'
import  { initSource,getData, showDetail, checkRow, updateRow, toggleSearch}  from 'actions/Component/DataTable'

import {rowsData, columns, searchColumns} from 'components/Business/DataTable/fakeData'


const DATA_TABLE_SOURCE = 'default'

SCRM.url('front/js/')

let params = {
    url: 'http://esn.jianyu.com/front/js/scrm/fakeData/tableData.php',
    data: {
        page: 1,
        rowsPerPage: 20
    }
}


class DataTablePage extends React.Component {
    componentDidMount() {

        this.props.initSource(DATA_TABLE_SOURCE)
        // 页面初始完,获取数据,触发action: GET_DATA
        this.props.getData(params, DATA_TABLE_SOURCE)

        this.props.getData(params, this.refs.com1.Identity)



    }

    render() {
        const { showDetail, checkRow, updateRow, toggleSearch} = this.props
        const $$dataTable = this.props.dataTable.get(DATA_TABLE_SOURCE)

        const $$rows = $$dataTable && $$dataTable.get('rows')
        const rows = ($$rows && $$rows.toJS()) || []

        const $$selectedRowDetailObj = $$dataTable && $$dataTable.get('selectedRowDetailObj')
        const selectedRowDetailObj = ($$selectedRowDetailObj && $$selectedRowDetailObj.toJS()) || {}

        const checkedRows = $$dataTable && $$dataTable.get('checkedRows').toJS() || []

        const searchBarShow = $$dataTable && $$dataTable.get('searchBarShow') || false

        const pending = $$dataTable && $$dataTable.get('pending') || false

        return (
            <div  style = {{marginLeft: '20px'}} >
                <div>
                    <button onClick={(e)=>{console.log(this.refs.dataTable.getCheckedRows())}}>获取已经选择的行</button>
                </div>
                <div>
                    <button onClick={function(){toggleSearch(true, DATA_TABLE_SOURCE)}}>高级搜索</button>
                    <button onClick={function(){toggleSearch(false, DATA_TABLE_SOURCE)}}>确定</button>
                </div>


                <DataTable ref="dataTable"
                           source={DATA_TABLE_SOURCE}
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
                           pending={pending}

                />
                <ul>
                    <li>1</li>
                    <li onClick={(e)=>{params.data.page = 2;this.props.getData(params

                        , DATA_TABLE_SOURCE)}}>2
                    </li>
                </ul>

            </div>
        )
    }
}

const mapStateToProps = (state, ownProps) => {

    return {
        dataTable: state.components.dataTable
    }
}

export default connect(mapStateToProps, {
    initSource,
    getData,
    showDetail,
    checkRow,
    updateRow,
    toggleSearch
})(DataTablePage)