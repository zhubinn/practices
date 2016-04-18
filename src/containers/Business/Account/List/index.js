
/**
 * Created by janeluck on 4/7/16.
 */


import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import DataTable from 'components/Business/DataTable'
import  { initSource,getData, showDetail, checkRow, updateRow, toggleSearch}  from 'actions/Component/DataTable'

import {rowsData, columns, searchColumns} from 'components/Business/DataTable/fakeData'
import 'ucjs_modules/layer/2.2.0/skin/layer.css'

const DATA_TABLE_SOURCE = 'Account_List'

let params = {
    url: 'http://esn.fuwenfang.com/front/js/scrm/fakeData/tableData.php',
    data: {
        page: 1,
        rowsPerPage: 20
    }
}



class AccountListPage extends React.Component {
    componentDidMount() {

        this.props.initSource(DATA_TABLE_SOURCE)
        // 页面初始完,获取数据,触发action: GET_DATA
        this.props.getData(params, DATA_TABLE_SOURCE)
        console.log(this.refs.dataTable)


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
                   <span>已处理客户</span>
                   <span>已处理客户</span>
                   <span>已处理客户</span>
                   <span>已处理客户</span>
                   <span>已处理客户</span>
                   <span>已处理客户</span>
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
        dataTable: state.components.dataTable,
        account_list: state.business.account_list
    }
}

export default connect(mapStateToProps, {
    initSource,
    getData,
    showDetail,
    checkRow,
    updateRow,
    toggleSearch
})(AccountListPage)