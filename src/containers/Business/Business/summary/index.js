
/**
 * Created by ytm on 4/7/16.
 */


import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import classNames from 'classnames';
import { Row, Col, Tabs, Table, Button} from 'antd';
import DataTable from 'components/Business/DataTable'
import {rowsData, columns, searchColumns} from 'components/Business/DataTable/fakeData'
import  { initSource,getData, showDetail, checkRow, updateRow, toggleSearch}  from 'actions/Component/DataTable'

let params = {
    url: 'http://esn.yangtianming.com/front/js/scrm/fakeData/tableData.php',
    data: {
        page: 1,
        rowsPerPage: 20
    }
}

class BusinessSummary extends React.Component {
    constructor() {
        super()

    }

    componentDidMount() {
        const id = this.refs.dataTable.identity
        const id1 = this.refs.dataTable1.identity
        this.props.initSource(id)
        this.props.initSource(id1)
        //// 页面初始完,获取数据,触发action: GET_DATA
        this.props.getData(params, id)
        this.props.getData(params, id1)
    }

    render() {
        const { showDetail, checkRow, updateRow, toggleSearch} = this.props

        let dataSource = {}

        if (this.refs.dataTable) {
            const { $$dataTable } = this.props

            const $$obj = $$dataTable.get(this.refs.dataTable.identity)

            if ($$obj) {
                dataSource = $$obj.toJS()
            }
        }

        let dataSource1 = {}

        if (this.refs.dataTable) {
            const { $$dataTable } = this.props

            const $$obj = $$dataTable.get(this.refs.dataTable1.identity)

            if ($$obj) {
                dataSource1 = $$obj.toJS()
            }
        }

        return (
            <div  style = {{marginLeft: '20px'}} >
              <div>
                  <button onClick={(e)=>{console.log(this.refs.dataTable.getCheckedRows())}}>获取已经选择的行</button>
              </div>
              <div>
                  <button onClick={(e) => {toggleSearch(true, this.refs.dataTable.identity )}}>高级搜索</button>
                  <button onClick={(e) => {toggleSearch(false, this.refs.dataTable.identity)}}>确定</button>
              </div>
              <DataTable ref="dataTable"
                           checkMode={true}
                           onCheckRow={checkRow}
                           hasDetail={true}
                           checkedRows={dataSource.checkedRows}
                           rows={dataSource.rows}
                           selectedRowDetailObj={dataSource.selectedRowDetailObj}
                           searchColumns={searchColumns}
                           columns={columns}
                           searchBarStatus={dataSource.searchBarShow}
                           onUpdateRow={updateRow}
                           onShowDetail={showDetail}
                           toggleSearch={toggleSearch}
                           pending={dataSource.pending}
                />
                <div>
                    <button onClick={(e)=>{console.log(this.refs.dataTable1.getCheckedRows())}}>获取已经选择的行</button>
                </div>
                <div>
                    <button onClick={(e) => {toggleSearch(true, this.refs.dataTable1.identity )}}>高级搜索</button>
                    <button onClick={(e) => {toggleSearch(false, this.refs.dataTable1.identity)}}>确定</button>
                </div>
                <DataTable ref="dataTable1"
                           checkMode={true}
                           onCheckRow={checkRow}
                           hasDetail={true}
                           checkedRows={dataSource1.checkedRows}
                           rows={dataSource1.rows}
                           selectedRowDetailObj={dataSource1.selectedRowDetailObj}
                           searchColumns={searchColumns}
                           columns={columns}
                           searchBarStatus={dataSource1.searchBarShow}
                           onUpdateRow={updateRow}
                           onShowDetail={showDetail}
                           toggleSearch={toggleSearch}
                           pending={dataSource1.pending}
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
    getData,
    showDetail,
    checkRow,
    updateRow,
    toggleSearch
})(BusinessSummary)