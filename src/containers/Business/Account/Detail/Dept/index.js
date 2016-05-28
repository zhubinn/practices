/**
 * Created by janeluck on 4/27/16.
 */
import { connect } from 'react-redux'
import {Button, Icon, Input, Row, Col, Tabs, Table, Pagination, Form, Modal  } from 'antd'

import SearchInput from 'components/Business/SearchInput'
import { getTableData, getTableQuery, table_params } from 'actions/business/account/detail/dept'
import { isEmpty } from 'lodash'
import QueryDataTable from 'components/Business/QueryDataTable'
import {detail_columns} from 'containers/Business/Account/common/constant'


const FormItem = Form.Item;
const TabPane = Tabs.TabPane;

// SCRM.url 由原来外层页面引入

// 嵌套表格生意列表
const business_columns = [
    {
        title: '客户名称',
        dataIndex: 'AccountID',
        key: 'AccountID',
        width: 150

    }, {
        title: '生意名称',
        dataIndex: 'Name',
        key: 'Name',
        width: 150

    }, {
        title: '生意阶段',
        dataIndex: 'Stage',
        key: 'Stage',
        width: 150

    }, {
        title: '负责人',
        dataIndex: 'OwnerID',
        key: 'OwnerID',
        width: 150

    }, {
        title: '发现日期',
        dataIndex: 'DiscoverDate',
        key: 'DiscoverDate',
        width: 150

    }, {
        title: '预计销售金额',
        dataIndex: 'AmountPlan',
        key: 'AmountPlan',
        width: 150

    }, {
        title: '预计成交日期',
        dataIndex: 'ExpectedCloseDate',
        key: 'ExpectedCloseDate',
        width: 150

    }, {
        title: '成交日期',
        dataIndex: 'EndDate',
        key: 'EndDate',
        width: 150

    }, {
        title: '成交金额',
        dataIndex: 'Amount',
        key: 'Amount',
        width: 150

    }, {
        title: '回款日期',
        dataIndex: 'PaymentTime',
        key: 'PaymentTime',
        width: 150

    }, {
        title: '回款金额',
        dataIndex: 'PaymentAmount',
        key: 'PaymentAmount',
        width: 150

    }, {
        title: '输单日期',
        dataIndex: 'LoseDate',
        key: 'LoseDate',
        width: 150

    }, {
        title: '输单金额',
        dataIndex: 'LoseAmount',
        key: 'LoseAmount',
        width: 150

    }
]

class Account_Detail_Dept_Page extends React.Component {
    constructor() {
        super()

    }

    componentDidMount() {



        // 判断是否为穿透
        let data = {}

        if(!!(window.location.search.match(/id=(\d*)/) && RegExp.$1)){
            data.deptID =RegExp.$1
        }

        // 获取table的数据
        this.props.getTableData({
            url: SCRM.url('/scrmweb/accounts/getDeptListDetail'),
            data
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


    }
    expandedRowRender = (row) => {
        const peneUrl = SCRM.url('/scrmweb/business/penetratelist') + '?AccountID=' + row.ID
        const table = (<div style={{width: 1950}}>
            <Table className = "ckDetil-depttable"
                   columns={business_columns}
                   dataSource={row.Opportunity}
                   pagination={false}>

            </Table>

            {row.Opportunity.length === 0 ? null : (<div style={{display: 'block',paddingBottom: '10px',paddingTop: '10px'}}><a href={peneUrl}>点击查看更多生意...</a></div>)}

        </div>)
        return (row.Opportunity.length === 0 ? (<p style={{textAlign: 'left'}}>该客户下没有生意</p>) : table)
    }
    handleExport = (e)=> {
        e.preventDefault();

        const exportParam = {
            objName: 'accountDeptListDetail',
            ...(table_params.data)
        }

        const exportUrl = SCRM.url('/common/scrmExport/export') + '?param=' + JSON.stringify(exportParam);

        window.open(exportUrl);

    }

    render() {
        const {
            $$account_detail_dept,
            getTableData

            } = this.props

        let queryDataTable = {}
        queryDataTable.dataSource = $$account_detail_dept.toJS().rows
        queryDataTable.current = $$account_detail_dept.toJS().current
        queryDataTable.total = $$account_detail_dept.toJS().total
        queryDataTable.pageSize = $$account_detail_dept.toJS().pageSize
        queryDataTable.queryColumns = $$account_detail_dept.toJS().queryColumns
        queryDataTable.loading = $$account_detail_dept.toJS().loading
        return (
            <div className="ck-root-main">

                <div className="ck-root-title">
                    <Row>
                        <Col span="8"><SearchInput ref="searchInput" onSearch={(value)=>{this.normalSearch(value)}}/> </Col>
                        <Col span="8" offset="8" style = {{textAlign: 'right'}}>
                            <div className = "ckDetail-deptfilter">
                            <Button type="primary" onClick={(e)=>{
                                this.refs.queryDataTable.toggleQueryTable(e)
                            }}>筛选</Button>
                                </div>


                            <Button type="ghost" onClick={(e)=>this.handleExport(e)}>导出</Button>
                        </Col>
                    </Row>
                </div>
                <Tabs defaultActiveKey="all"
                      type="card"
                      onChange={i => {this.changeType(i)}}>
                    <TabPane tab="全部客户" key="all">
                    </TabPane>
                    <TabPane tab="负责的客户" key="owner">
                    </TabPane>
                    <TabPane tab="重点客户" key="important">
                    </TabPane>
                    <TabPane tab="关注的客户" key="follow">
                    </TabPane>
                </Tabs>
                <QueryDataTable
                    columns={detail_columns}
                    expandedRowRender={this.expandedRowRender}
                    {...queryDataTable}
                    onGetTableData={
                                (obj)=>{
                                    this.refs.searchInput.emptyInput()
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
        $$account_detail_dept: state.business.account_detail_dept
    }
}

export default connect(mapStateToProps, {
    getTableData,
    getTableQuery
})(Account_Detail_Dept_Page)