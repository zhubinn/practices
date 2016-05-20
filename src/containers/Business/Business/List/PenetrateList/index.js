/**
 * Created by janeluck on 4/27/16.
 */
import { connect } from 'react-redux'
import {Button, Icon, Input, Row, Col, Tabs, Table, Pagination, Form, Modal  } from 'antd'

import SearchInput from 'components/Business/SearchInput'
import { getTableData, getTableQuery, table_params } from 'actions/business/business/list/penetrate'
import { isEmpty } from 'lodash'
import QueryDataTable from 'components/Business/QueryDataTable'
import getQueryString from 'components/Business/GetQueryString'


import 'containers/Business/lsx-index.less'

const FormItem = Form.Item;
const TabPane = Tabs.TabPane;

// SCRM.url 由原来外层页面引入

const columns = [
    {
        "dataIndex": "Name",
        "key": "Name",
        "title": "生意名称"
    },
    {
        "dataIndex": "AccountID",
        "key": "AccountID",
        "title": "客户名称"
    },
    {
        "dataIndex": "Stage",
        "key": "Stage",
        "title": "销售阶段"
    },
    {
        "dataIndex": "CreatedByID",
        "key": "CreatedByID",
        "title": "创建人"
    },
    {
        "dataIndex": "OwnerID",
        "key": "OwnerID",
        "title": "负责人"
    },
    {
        "dataIndex": "CreatedTime",
        "key": "CreatedTime",
        "title": "创建时间",
        "width":260
    },
    {
        "dataIndex": "DiscoverDate",
        "key": "DiscoverDate",
        "title": "发现日期",
        "width":260
    },
    {
        "dataIndex": "ExpectedCloseDate",
        "key": "ExpectedCloseDate",
        "title": "预计成交日期",
        "width":260
    },
    {
        "dataIndex": "AmountPlan",
        "key": "AmountPlan",
        "title": "预计销售金额"
    },
    {
        "dataIndex": "Source",
        "key": "Source",
        "title": "生意来源"
    },
    {
        "dataIndex": "PaymentTime",
        "key": "PaymentTime",
        "title": "最新回款时间",
        "width":260
    },
    {
        "dataIndex": "PaymentAmount",
        "key": "PaymentAmount",
        "title": "回款金额",
        "width":240
    },
    {
        "dataIndex": "EndDate",
        "key": "EndDate",
        "title": "结束日期",
        "width":260
    },
    {
        "dataIndex": "Amount",
        "key": "Amount",
        "title": "销售金额"
    }
]


// 查询表格
// 依赖Table, Pagination, Form

class PenetrateList extends React.Component {
    constructor() {
        super()

    }

    componentDidMount() {
        // todo: url包装
        this.props.getTableData({
            url: SCRM.url('/scrmweb/business/getPenetrateList'),
            data:{
                DefinedConds:[{
                    Name:"Opportunity.AccountID",
                    Operator:3,
                    Value1: getQueryString("AccountID") || 0
                }],
                keyword:'',

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
                DefinedConds:[{
                    Name:"Opportunity.AccountID",
                    Operator:3,
                    Value1: getQueryString("AccountID") || 0
                }],
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
                DefinedConds:[{
                    Name:"Opportunity.AccountID",
                    Operator:3,
                    Value1: getQueryString("AccountID") || 0
                }],
                keyword: '',
                page: 1,
                pageSize: 0,
                type
            }
        })

    }

    handleExport(e){

        e.preventDefault();

        const exportParam = {
                    objName: 'OpportunityList',
                    ...(table_params.data)
            }

        const exportUrl = SCRM.url('/common/scrmExport/export') + '?param=' + JSON.stringify(exportParam);
        window.open(exportUrl);

    }


    render() {
        const {
                $$business_list_penetrate,
                getTableData

            } = this.props

        //debugger

        let queryDataTable = {};

        queryDataTable.dataSource = $$business_list_penetrate.toJS().rows
        queryDataTable.current = $$business_list_penetrate.toJS().current
        queryDataTable.total = $$business_list_penetrate.toJS().total
        queryDataTable.pageSize = $$business_list_penetrate.toJS().pageSize
        queryDataTable.queryColumns = $$business_list_penetrate.toJS().queryColumns
        queryDataTable.loading = $$business_list_penetrate.toJS().loading



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

                            <Button type="ghost" onClick = { this.handleExport.bind(this) }>导出</Button>
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
                    <TabPane tab="重要的生意" key="important">
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
        $$business_list_penetrate: state.business.business_list_penetrate
    }
}

export default connect(mapStateToProps, {
    getTableData,
    getTableQuery
})(PenetrateList)