/**
 * Created by janeluck on 4/27/16.
 */
import { connect } from 'react-redux'
import {Button, Icon, Input, Row, Col, Tabs, Table, Pagination, Form, Modal  } from 'antd'
import 'antd/style/index.less'
import SearchInput from 'components/Business/SearchInput'
import { getTableData, getTableQuery, table_params } from 'actions/business/business/list/dept'
import { isEmpty } from 'lodash'
import QueryDataTable from 'components/Business/QueryDataTable'
import getQueryString from 'components/Business/GetQueryString'
import 'containers/Business/index.less'
import 'containers/Business/lsx-index.less'

const FormItem = Form.Item;
const TabPane = Tabs.TabPane;

// SCRM.url 由原来外层页面引入

let columns = []




// 查询表格
// 依赖Table, Pagination, Form

class DeptList extends React.Component {
    constructor() {
        super()

    }

    componentDidMount() {
        // todo: url包装
        this.props.getTableData({
            url: SCRM.url('/scrmweb/business/getDeptList'),
            data:{
                deptID:getQueryString("deptID"),
                deptUser:'dept',
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
                deptUser:'dept',
                deptID:getQueryString("deptID"),
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
                deptUser:'dept',
                deptID:getQueryString("deptID"),
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
                    ...(table_params.data),
            }

        const exportUrl = SCRM.url('/common/scrmExport/export') + '?param=' + JSON.stringify(exportParam);
        window.open(exportUrl);

    }


    render() {
        const {
                $$business_list_dept,
                getTableData

            } = this.props


        columns = $$business_list_dept.toJS().columns

        let queryDataTable = {};

        queryDataTable.dataSource = $$business_list_dept.toJS().rows
        queryDataTable.current = $$business_list_dept.toJS().current
        queryDataTable.total = $$business_list_dept.toJS().total
        queryDataTable.pageSize = $$business_list_dept.toJS().pageSize
        queryDataTable.queryColumns = $$business_list_dept.toJS().queryColumns
        queryDataTable.loading = $$business_list_dept.toJS().loading



        return (
            <div className="ck-root-main">

                <div className="ck-root-title">

                    <Row>
                        <Col span="8"><SearchInput ref="searchInput" onSearch={(value)=>{this.normalSearch(value)}}/> </Col>

                        <Col span="8" offset="8" style = {{textAlign: 'right'}} >
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
        $$business_list_dept: state.business.business_list_dept
    }
}

export default connect(mapStateToProps, {
    getTableData,
    getTableQuery
})(DeptList)