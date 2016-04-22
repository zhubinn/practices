/**
 * Created by janeluck on 4/7/16.
 */


import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import DataTable from 'components/Business/DataTable'
import  { getTableData, initSource, showDetail, checkRow, updateRow, toggleSearch}  from 'actions/Component/DataTable'
/*import  {}  from 'actions/business/account/list'*/

import {rowsData, columns, searchColumns} from 'components/Business/DataTable/fakeData'
import { Pagination } from 'antd';

function showTotal(total) {
    return `共 ${total} 条`;
}


const searchUrl = 'http://esn.jianyu.com/front/js/scrm/fakeData/tableData.php'
const url = 'http://esn.jianyu.com/front/js/scrm/fakeData/tableData.php'
class AccountListPage extends React.Component {
    constructor() {
        super()

    }

    componentDidMount() {
        const id = this.refs.dataTable.identity
        this.props.initSource(id)
        //// 页面初始完,获取数据,触发action: GET_DATA
        this.props.getTableData({url: url}, id)


    }

    render() {
        const { showDetail, checkRow, updateRow, toggleSearch, getTableData} = this.props

        let dataSource = {}


        if (this.refs.dataTable) {
            const { $$dataTable } = this.props

            const $$obj = $$dataTable.get(this.refs.dataTable.identity)

            if ($$obj) {
                dataSource = $$obj.toJS()
            }
        }
        console.log(dataSource.rows && dataSource.rows.length)
        return (


            <div style={{marginLeft: '20px'}}>


                <div>
                    <button onClick={(e)=>{console.log(this.refs.dataTable.getCheckedRows())}}>获取已经选择的行</button>
                </div>
                <div>
                    <button onClick={(e) => {toggleSearch(true, this.refs.dataTable.identity )}}>高级搜索</button>

                </div>


                <div>
                    <span>已处理客户</span>
                    <span>已处理客户</span>
                    <span>已处理客户</span>
                    <span>已处理客户</span>
                    <span>已处理客户</span>
                    <span>已处理客户</span>
                </div>


                <DataTable ref="dataTable"
                           checkMode={true}
                           onCheckRow={checkRow}
                           hasDetail={true}
                           checkedRows={dataSource.checkedRows}
                           rows={dataSource.rows}
                           selectedRowDetailObj={dataSource.selectedRowDetailObj}
                           searchColumns={searchColumns}
                           searchUrl={searchUrl}
                           columns={columns}
                           searchBarStatus={dataSource.searchBarShow}
                           onUpdateRow={updateRow}
                           onShowDetail={showDetail}
                           toggleSearch={toggleSearch}
                           onSure={(searchData)=>{getTableData({data:


                            {
                            page:1,
                            searchData1: searchData
                            }

                            },this.refs.dataTable.identity)}}
                           pending={dataSource.pending}
                />

                <Pagination size="small"
                            onChange={(pageNumber)=>{this.props.getTableData({data:{
                                page: pageNumber
                            }}, this.refs.dataTable.identity)}}
                            total={dataSource.total}
                            pageSize={dataSource.rows && dataSource.rows.length}
                            onShowSizeChange={(pageSize)=>{this.props.getTableData({data:{
                                rowsPerPage: pageSize
                            }}, this.refs.dataTable.identity)}}
                            showSizeChanger
                            showQuickJumper
                />
            </div>
        )
    }
}

const mapStateToProps = (state, ownProps) => {
    return {
        $$dataTable: state.components.dataTable,
        account_list: state.business.account_list
    }
}

export default connect(mapStateToProps, {
    initSource,
    getTableData,
    showDetail,
    checkRow,
    updateRow,
    toggleSearch
})(AccountListPage)