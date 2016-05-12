/**
 * Created by janeluck on 4/27/16.
 */
import { connect } from 'react-redux'
import {Button, Icon, Input, Row, Col, Tabs, Table, Pagination, Form, Modal  } from 'antd'
import 'antd/style/index.less'
import SearchInput from 'components/Business/SearchInput'
import { getTableData, getTableQuery } from 'actions/business/business/list/person'
import { isEmpty } from 'lodash'
import QueryDataTable from 'components/Business/QueryDataTable'
import getQueryString from 'components/Business/GetQueryString'

import 'containers/Business/lsx-index.less'

const FormItem = Form.Item;
const TabPane = Tabs.TabPane;

// SCRM.url 由原来外层页面引入

const columns = [{
    title: '生意名称',
    dataIndex: 'Name',
    key: 'Name',

}, {
    title: '所属客户',
    dataIndex: 'AccountID',
    key: 'AccountID',

}, {
    title: '生意阶段',
    dataIndex: 'Stage',
    key: 'Stage',

}, {
    title: '录入人',
    dataIndex: 'CreatedByID',
    key: 'CreatedByID',

},  {
    title: '负责人',
    dataIndex: 'OwnerID',
    key: 'OwnerID',

}, {
    title: '建立日期',
    dataIndex: 'CreatedTime',
    key: 'CreatedTime',

}, {
    title: '发现日期',
    dataIndex: 'DiscoverDate',
    key: 'DiscoverDate',

}, {
    title: '预计成交日期',
    dataIndex: 'ExpectedCloseDate',
    key: 'ExpectedCloseDate',

}, {
    title: '预计销售金额',
    dataIndex: 'AmountPlan',
    key: 'AmountPlan',

}, {
    title: '生意来源',
    dataIndex: 'Source',
    key: 'Source',

},  {
    title: '回款期数',
    dataIndex: 'PaymentTime',
    key: 'PaymentTime',

},{
    title: '回款日期',
    dataIndex: 'PaymentTime',
    key: 'PaymentTime',

}, {
    title: '回款金额',
    dataIndex: 'PaymentAmount',
    key: 'PaymentAmount',

}, {
    title: '输单金额',
    dataIndex: 'Amount',
    key: 'Amount',

}, {
    title: '输单日期',
    dataIndex: 'EndDate',
    key: 'EndDate',

}];


// 查询表格
// 依赖Table, Pagination, Form

class PersonList extends React.Component {
    constructor() {
        super()

    }

    componentDidMount() {
        // todo: url包装
        this.props.getTableData({
            url: SCRM.url('/scrmweb/business/getList'),
            data:{
                keyword:'',
                userID:getQueryString("userID"),
            }

        })
        this.props.getTableQuery(SCRM.url('/scrmweb/business/getOpportunityFilter'))
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
                userID:getQueryString("userID"),
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
                userID:getQueryString("userID"),
                page: 1,
                pageSize: 0,
                type
            }
        })

    }


    render() {
        const {
            $$business_list_person,
            getTableData

            } = this.props

        let queryDataTable = {}
        queryDataTable.dataSource = $$business_list_person.toJS().rows
        queryDataTable.current = $$business_list_person.toJS().current
        queryDataTable.total = $$business_list_person.toJS().total
        queryDataTable.pageSize = $$business_list_person.toJS().pageSize
        queryDataTable.queryColumns = $$business_list_person.toJS().queryColumns
        queryDataTable.loading = $$business_list_person.toJS().loading
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
                    <TabPane tab="进行中的生意" key="loading">
                    </TabPane>
                    <TabPane tab="作废的生意" key="throw">
                    </TabPane>
                    <TabPane tab="停滞的生意" key="stop">
                    </TabPane>
                    <TabPane tab="重要的生意" key="import">
                    </TabPane>
                </Tabs>


                <QueryDataTable
                    columns={columns}
                    checkMode={false}
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
        $$business_list_person: state.business.business_list_person
    }
}

export default connect(mapStateToProps, {
    getTableData,
    getTableQuery
})(PersonList)