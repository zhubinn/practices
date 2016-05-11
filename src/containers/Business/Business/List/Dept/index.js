/**
 * Created by janeluck on 4/27/16.
 */
import { connect } from 'react-redux'
import {Button, Icon, Input, Row, Col, Tabs, Table, Pagination, Form, Modal  } from 'antd'
import 'antd/style/index.less'
import SearchInput from 'components/Business/SearchInput'
import { getTableData, getTableQuery } from 'actions/business/account/list/dept'
import { isEmpty } from 'lodash'
import QueryDataTable from 'components/Business/QueryDataTable'
import MapModal from 'containers/Business/Account/MapModal'

import 'containers/Business/lsx-index.less'

const FormItem = Form.Item;
const TabPane = Tabs.TabPane;

// SCRM.url 由原来外层页面引入

const columns1 = [{
    title: '生意名称',
    dataIndex: 'Name',
    key: 'Name',

}, {
    title: '所属客户',
    dataIndex: 'ShortName',
    key: 'ShortName',

}, {
    title: '生意阶段',
    dataIndex: 'Bank',
    key: 'Bank',

}, {
    title: '录入人',
    dataIndex: 'BankAccount',
    key: 'BankAccount',

},  {
    title: '负责人',
    dataIndex: 'BankAccount',
    key: 'BankAccount',

}, {
    title: '建立日期',
    dataIndex: 'OwnerID',
    key: 'OwnerID',

}, {
    title: '发现日期',
    dataIndex: 'Address',
    key: 'Address',

}, {
    title: '预计成交日期',
    dataIndex: 'Address2',
    key: 'Address2',

}, {
    title: '预计销售金额',
    dataIndex: 'Address3',
    key: 'Address3',

}, {
    title: '生意来源',
    dataIndex: 'BankAccount',
    key: 'BankAccount',

},  {
    title: '回款期数',
    dataIndex: 'BankAccount',
    key: 'BankAccount',

},   {
    title: '是否开票',
    dataIndex: 'BankAccount',
    key: 'BankAccount',

},{
    title: '回款日期',
    dataIndex: 'Address4',
    key: 'Address4',

}, {
    title: '回款金额',
    dataIndex: 'Address5',
    key: 'Address5',

}, {
    title: '付款方式',
    dataIndex: 'Address5',
    key: 'Address5',

},  {
    title: '回款负责人',
    dataIndex: 'Address5',
    key: 'Address5',

},  {
    title: '回款备注',
    dataIndex: 'Address5',
    key: 'Address5',

}, {
    title: '输单金额',
    dataIndex: 'Address6',
    key: 'Address6',

}, {
    title: '输单日期',
    dataIndex: 'Address7',
    key: 'Address7',

}];

const columns2 = [{
    title: '生意名称',
    dataIndex: 'Name',
    key: 'Name',

}, {
    title: '所属客户',
    dataIndex: 'ShortName',
    key: 'ShortName',

}, {
    title: '生意阶段',
    dataIndex: 'Bank',
    key: 'Bank',

}, {
    title: '录入人',
    dataIndex: 'BankAccount',
    key: 'BankAccount',

},  {
    title: '负责人',
    dataIndex: 'BankAccount',
    key: 'BankAccount',

}, {
    title: '建立日期',
    dataIndex: 'OwnerID',
    key: 'OwnerID',

}, {
    title: '发现日期',
    dataIndex: 'Address',
    key: 'Address',

}, {
    title: '预计成交日期',
    dataIndex: 'Address2',
    key: 'Address2',

}, {
    title: '预计销售金额',
    dataIndex: 'Address3',
    key: 'Address3',

}, {
    title: '生意来源',
    dataIndex: 'BankAccount',
    key: 'BankAccount',

},  {
    title: '回款期数',
    dataIndex: 'BankAccount',
    key: 'BankAccount',

},   {
    title: '是否开票',
    dataIndex: 'BankAccount',
    key: 'BankAccount',

},{
    title: '回款日期',
    dataIndex: 'Address4',
    key: 'Address4',

}, {
    title: '回款金额',
    dataIndex: 'Address5',
    key: 'Address5',

}, {
    title: '付款方式',
    dataIndex: 'Address5',
    key: 'Address5',

},  {
    title: '回款负责人',
    dataIndex: 'Address5',
    key: 'Address5',

},  {
    title: '回款备注',
    dataIndex: 'Address5',
    key: 'Address5',

}];

const columns3 = [{
    title: '生意名称',
    dataIndex: 'Name',
    key: 'Name',

}, {
    title: '所属客户',
    dataIndex: 'ShortName',
    key: 'ShortName',

}, {
    title: '生意阶段',
    dataIndex: 'Bank',
    key: 'Bank',

}, {
    title: '录入人',
    dataIndex: 'BankAccount',
    key: 'BankAccount',

},  {
    title: '负责人',
    dataIndex: 'BankAccount',
    key: 'BankAccount',

}, {
    title: '建立日期',
    dataIndex: 'OwnerID',
    key: 'OwnerID',

}, {
    title: '发现日期',
    dataIndex: 'Address',
    key: 'Address',

}, {
    title: '预计成交日期',
    dataIndex: 'Address2',
    key: 'Address2',

}, {
    title: '预计销售金额',
    dataIndex: 'Address3',
    key: 'Address3',

}, {
    title: '生意来源',
    dataIndex: 'BankAccount',
    key: 'BankAccount',

},{
    title: '输单金额',
    dataIndex: 'Address6',
    key: 'Address6',

}, {
    title: '输单日期',
    dataIndex: 'Address7',
    key: 'Address7',

}];

const columns4 = [{
    title: '生意名称',
    dataIndex: 'Name',
    key: 'Name',

}, {
    title: '所属客户',
    dataIndex: 'ShortName',
    key: 'ShortName',

}, {
    title: '生意阶段',
    dataIndex: 'Bank',
    key: 'Bank',

}, {
    title: '录入人',
    dataIndex: 'BankAccount',
    key: 'BankAccount',

},  {
    title: '负责人',
    dataIndex: 'BankAccount',
    key: 'BankAccount',

}, {
    title: '建立日期',
    dataIndex: 'OwnerID',
    key: 'OwnerID',

}, {
    title: '发现日期',
    dataIndex: 'Address',
    key: 'Address',

}, {
    title: '预计成交日期',
    dataIndex: 'Address2',
    key: 'Address2',

}, {
    title: '预计销售金额',
    dataIndex: 'Address3',
    key: 'Address3',

}, {
    title: '生意来源',
    dataIndex: 'BankAccount',
    key: 'BankAccount',

}];

const columns5 = [{
    title: '生意名称',
    dataIndex: 'Name',
    key: 'Name',

}, {
    title: '所属客户',
    dataIndex: 'ShortName',
    key: 'ShortName',

}, {
    title: '生意阶段',
    dataIndex: 'Bank',
    key: 'Bank',

}, {
    title: '录入人',
    dataIndex: 'BankAccount',
    key: 'BankAccount',

},  {
    title: '负责人',
    dataIndex: 'BankAccount',
    key: 'BankAccount',

}, {
    title: '建立日期',
    dataIndex: 'OwnerID',
    key: 'OwnerID',

}, {
    title: '发现日期',
    dataIndex: 'Address',
    key: 'Address',

}, {
    title: '预计成交日期',
    dataIndex: 'Address2',
    key: 'Address2',

}, {
    title: '预计销售金额',
    dataIndex: 'Address3',
    key: 'Address3',

}, {
    title: '生意来源',
    dataIndex: 'BankAccount',
    key: 'BankAccount',

},  {
    title: '回款期数',
    dataIndex: 'BankAccount',
    key: 'BankAccount',

},   {
    title: '是否开票',
    dataIndex: 'BankAccount',
    key: 'BankAccount',

},{
    title: '回款日期',
    dataIndex: 'Address4',
    key: 'Address4',

}, {
    title: '回款金额',
    dataIndex: 'Address5',
    key: 'Address5',

}, {
    title: '付款方式',
    dataIndex: 'Address5',
    key: 'Address5',

},  {
    title: '回款负责人',
    dataIndex: 'Address5',
    key: 'Address5',

},  {
    title: '回款备注',
    dataIndex: 'Address5',
    key: 'Address5',

}, {
    title: '输单金额',
    dataIndex: 'Address6',
    key: 'Address6',

}, {
    title: '输单日期',
    dataIndex: 'Address7',
    key: 'Address7',

}];

const columns6 = [{
    title: '生意名称',
    dataIndex: 'Name',
    key: 'Name',

}, {
    title: '所属客户',
    dataIndex: 'ShortName',
    key: 'ShortName',

}, {
    title: '生意阶段',
    dataIndex: 'Bank',
    key: 'Bank',

}, {
    title: '录入人',
    dataIndex: 'BankAccount',
    key: 'BankAccount',

},  {
    title: '负责人',
    dataIndex: 'BankAccount',
    key: 'BankAccount',

}, {
    title: '建立日期',
    dataIndex: 'OwnerID',
    key: 'OwnerID',

}, {
    title: '发现日期',
    dataIndex: 'Address',
    key: 'Address',

}, {
    title: '预计成交日期',
    dataIndex: 'Address2',
    key: 'Address2',

}, {
    title: '预计销售金额',
    dataIndex: 'Address3',
    key: 'Address3',

}, {
    title: '生意来源',
    dataIndex: 'BankAccount',
    key: 'BankAccount',

},  {
    title: '回款期数',
    dataIndex: 'BankAccount',
    key: 'BankAccount',

},   {
    title: '是否开票',
    dataIndex: 'BankAccount',
    key: 'BankAccount',

},{
    title: '回款日期',
    dataIndex: 'Address4',
    key: 'Address4',

}, {
    title: '回款金额',
    dataIndex: 'Address5',
    key: 'Address5',

}, {
    title: '付款方式',
    dataIndex: 'Address5',
    key: 'Address5',

},  {
    title: '回款负责人',
    dataIndex: 'Address5',
    key: 'Address5',

},  {
    title: '回款备注',
    dataIndex: 'Address5',
    key: 'Address5',

}, {
    title: '输单金额',
    dataIndex: 'Address6',
    key: 'Address6',

}, {
    title: '输单日期',
    dataIndex: 'Address7',
    key: 'Address7',

}];

const columns7 = [{
    title: '生意名称',
    dataIndex: 'Name',
    key: 'Name',

}, {
    title: '所属客户',
    dataIndex: 'ShortName',
    key: 'ShortName',

}, {
    title: '生意阶段',
    dataIndex: 'Bank',
    key: 'Bank',

}, {
    title: '录入人',
    dataIndex: 'BankAccount',
    key: 'BankAccount',

},  {
    title: '负责人',
    dataIndex: 'BankAccount',
    key: 'BankAccount',

}, {
    title: '建立日期',
    dataIndex: 'OwnerID',
    key: 'OwnerID',

}, {
    title: '发现日期',
    dataIndex: 'Address',
    key: 'Address',

}, {
    title: '预计成交日期',
    dataIndex: 'Address2',
    key: 'Address2',

}, {
    title: '预计销售金额',
    dataIndex: 'Address3',
    key: 'Address3',

}, {
    title: '生意来源',
    dataIndex: 'BankAccount',
    key: 'BankAccount',

},  {
    title: '回款期数',
    dataIndex: 'BankAccount',
    key: 'BankAccount',

},   {
    title: '是否开票',
    dataIndex: 'BankAccount',
    key: 'BankAccount',

},{
    title: '回款日期',
    dataIndex: 'Address4',
    key: 'Address4',

}, {
    title: '回款金额',
    dataIndex: 'Address5',
    key: 'Address5',

}, {
    title: '付款方式',
    dataIndex: 'Address5',
    key: 'Address5',

},  {
    title: '回款负责人',
    dataIndex: 'Address5',
    key: 'Address5',

},  {
    title: '回款备注',
    dataIndex: 'Address5',
    key: 'Address5',

}, {
    title: '输单金额',
    dataIndex: 'Address6',
    key: 'Address6',

}, {
    title: '输单日期',
    dataIndex: 'Address7',
    key: 'Address7',

}];
// 查询表格
// 依赖Table, Pagination, Form

class DeptList extends React.Component {
    constructor() {
        super()

    }

    componentDidMount() {
        // todo: url包装
        this.props.getTableData({
            url: SCRM.url('/scrmweb/accounts/getList')
        })
        this.props.getTableQuery(SCRM.url('/scrmweb/accounts/getAccountFilter'))
    }

    // 普通搜索和筛选(高级搜索)互斥
    normalSearch = (value) => {
        // 重置筛选(高级搜索)
        this.refs.queryDataTable.resetQueryForm()

        this.refs.queryDataTable.clearCheckedAndExpanded()
        this.props.getTableData({
            data: {
                searchData: [],
                keyword: value,
                page: 1,
                pageSize: 0
            }
        })


    }
    changeType = (type) => {
        // 重置筛选(高级搜索)
        this.refs.searchInput.emptyInput()
        this.refs.queryDataTable.resetQueryForm()
        this.refs.queryDataTable.clearCheckedAndExpanded()
        this.props.getTableData({
            data: {
                searchData: [],
                keyword: '',
                page: 1,
                pageSize: 0,
                type
            }
        })

    }
    changeOwner = (e) => {
        console.log('获取已经选择的row')
        console.log(this.refs.queryDataTable.getCheckedRows())

    }

    render() {
        const {
            $$business_list_dept,
            getTableData

            } = this.props

        let queryDataTable = {}
        queryDataTable.dataSource = $$business_list_dept.toJS().rows
        queryDataTable.current = $$business_list_dept.toJS().current
        queryDataTable.total = $$business_list_dept.toJS().total
        queryDataTable.pageSize = $$business_list_dept.toJS().pageSize
        queryDataTable.queryColumns = $$business_list_dept.toJS().queryColumns
        queryDataTable.loading = $$business_list_dept.toJS().loading
        return (
            <div style={{marginLeft:'20px'}}>
                <div style={{marginTop: '14px',marginBottom: '14px'}}>

                    <Row>
                        <Col span="8"><SearchInput ref="searchInput" onSearch={(value)=>{this.normalSearch(value)}}/> </Col>

                        <Col span="8" offset="8">
                            <div className="ckBusiness-listfilter">
                                <Button type="primary" onClick={(e)=>{
                                    this.refs.queryDataTable.toggleQueryTable(e)
                                }}>筛选</Button>

                             </div>

                            <Button type="ghost">导出</Button>
                        </Col>
                    </Row>
                   </div>

                <Tabs defaultActiveKey="all"
                      type="card"
                      onChange={i => {this.changeType(i)}}>
                    <TabPane tab="全部生意" key="all">
                    </TabPane>
                    <TabPane tab="赢单的生意" key="win">
                    </TabPane>
                    <TabPane tab="输单的生意" key="fail">
                    </TabPane>
                    <TabPane tab="进行中的生意" key="doing">
                    </TabPane>
                    <TabPane tab="作废的生意" key="throw">
                    </TabPane>
                    <TabPane tab="停滞的生意" key="stop">
                    </TabPane>
                    <TabPane tab="重要的生意" key="import">
                    </TabPane>
                </Tabs>


                <QueryDataTable
                    columns={columns1}
                    checkMode={true}
                    {...queryDataTable}
                    onGetTableData={

                                (obj)=>{
                                    getTableData({
                                        data: obj
                                    })
                                }
                            }
                    ref="queryDataTable"
                >
                </QueryDataTable>


            </div>
        )
    }
}

const mapStateToProps = (state, ownProps) => {
    return {
        $$business_list_dept: state.business.account_list_dept
    }
}

export default connect(mapStateToProps, {
    getTableData,
    getTableQuery
})(DeptList)