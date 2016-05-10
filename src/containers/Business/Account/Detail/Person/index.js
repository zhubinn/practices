/**
 * Created by janeluck on 4/27/16.
 */
import { connect } from 'react-redux'
import {Button, Icon, Input, Row, Col, Tabs, Table, Pagination, Form  } from 'antd'
import 'antd/style/index.less'
import SearchInput from 'components/Business/SearchInput'
import { getTableData, getTableQuery,  table_params } from 'actions/business/account/detail/person'
import { isEmpty } from 'lodash'
import QueryDataTable from 'components/Business/QueryDataTable'
import MapModal from 'containers/Business/Account/MapModal'


const FormItem = Form.Item;
const TabPane = Tabs.TabPane;

// SCRM.url 由原来外层页面引入

const columns = [{
    title: '客户名称',
    dataIndex: 'Name',
    key: 'Name',

}, {
    title: '简称',
    dataIndex: 'ShortName',
    key: 'ShortName',

}, {
    title: '开户银行',
    dataIndex: 'Bank',
    key: 'Bank',

}, {
    title: '银行账号',
    dataIndex: 'BankAccount',
    key: 'BankAccount',

}, {
    title: '负责人',
    dataIndex: 'OwnerID',
    key: 'OwnerID',

}, {
    title: '客户公司地址',
    dataIndex: 'Address',
    key: 'Address',

}, {
    title: '销售地址',
    dataIndex: 'Address2',
    key: 'Address2',

}, {
    title: '工厂地址',
    dataIndex: 'Address3',
    key: 'Address3',

}, {
    title: '库房地址',
    dataIndex: 'Address4',
    key: 'Address4',

}, {
    title: '收货地址',
    dataIndex: 'Address5',
    key: 'Address5',

}, {
    title: '门店地址',
    dataIndex: 'Address6',
    key: 'Address6',

}, {
    title: '其他地址',
    dataIndex: 'Address7',
    key: 'Address7',

}, {
    title: '客户地理坐标',
    dataIndex: 'ID',
    key: 'ID',
    render: function (text, record, index) {
        let cell = (<p>未设置</p>)
        if (!!record.Lat) {
            cell = (<a href="javascript:;" onClick={()=>{MapModal(record.Lng, record.Lat, '客户地理坐标')}}>已设置</a>)
        }
        return cell
    }

}, {
    title: '客户公司电话',
    dataIndex: 'Phone',
    key: 'Phone',

}, {
    title: '销售电话',
    dataIndex: 'Phone2',
    key: 'Phone2',

}, {
    title: '工厂电话',
    dataIndex: 'Phone3',
    key: 'Phone3',

}, {
    title: '库房电话',
    dataIndex: 'Phone4',
    key: 'Phone4',

}, {
    title: '收货电话',
    dataIndex: 'Phone5',
    key: 'Phone5',

}, {
    title: '门店电话',
    dataIndex: 'Phone6',
    key: 'Phone6',

}, {
    title: '其他电话',
    dataIndex: 'Phone7',
    key: 'Phone7',

}, {
    title: '客户简介',
    dataIndex: 'Descriptions',
    key: 'Descriptions',

}, {
    title: '主营产品',
    dataIndex: 'MainProduct',
    key: 'MainProduct',

}, {
    title: '客户规模',
    dataIndex: 'Scale',
    key: 'Scale',

}, {
    title: '客户级别',
    dataIndex: 'AccountLevel',
    key: 'AccountLevel',

}, {
    title: '业务类型',
    dataIndex: 'AccountIndustry',
    key: 'AccountIndustry',

}, {
    title: '所属区域',
    dataIndex: 'Area',
    key: 'Area',

}, {
    title: '客户公司网址',
    dataIndex: 'WebSite',
    key: 'WebSite',

}, {
    title: '旺旺',
    dataIndex: 'Ww',
    key: 'Ww',

}, {
    title: 'MSN/QQ',
    dataIndex: 'Msnqq',
    key: 'Msnqq',

}, {
    title: '电子邮件',
    dataIndex: 'Email',
    key: 'Email',

}, {
    title: '客户联系人',
    dataIndex: 'AccountConnect',
    key: 'AccountConnect',

}, {
    title: '备注',
    dataIndex: 'Beizhu',
    key: 'Beizhu',

}, {
    title: '创建时间',
    dataIndex: 'CreatedTime',
    key: 'CreatedTime',

}];


// 查询表格
// 依赖Table, Pagination, Form

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

// fakeData
const business_dataSource = [{
    "ID": "372",
    "AccountID": "\u9152\u6c34\u5ba2\u6237",
    "Name": "\u535a\u767d\u751f\u610f",
    "Stage": "",
    "OwnerID": "\u5575\u5575\u2026\u2026\uff01\uff1f\u3002\u3002",
    "CreatedTime": "2016.05.04 10:35",
    "DiscoverDate": "2016-05-04",
    "ExpectedCloseDate": "2016-05-04",
    "AmountPlan": "200.00",
    "PaymentTime": "2016-05-04",
    "PaymentAmount": "10.00",
    "WFFlag": "1",
    "EndDate": "",
    "Amount": "",
    "Account": "40498"
}, {
    "ID": "344",
    "AccountID": "\u9152\u6c34\u5ba2\u6237",
    "Name": "\u9152\u6c34\u751f\u610f",
    "Stage": "",
    "OwnerID": "\u6ce2\u6ce2\u83dc\u83dc",
    "CreatedTime": "2016.04.29 16:04",
    "DiscoverDate": "2016-04-29",
    "ExpectedCloseDate": "2016-04-29",
    "AmountPlan": "5000.00",
    "PaymentTime": "2016-04-29",
    "PaymentAmount": "10.00",
    "WFFlag": "1",
    "EndDate": "",
    "Amount": "",
    "Account": "40498"
}]
class Account_Detail_Person_Page extends React.Component {
    constructor() {
        super()

    }

    componentDidMount() {
        // todo: url包装
        this.props.getTableData({

            url: SCRM.url('/scrmweb/accounts/getListDetail')
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
        // 重置普通搜索和筛选(高级搜索)
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
    expandedRowRender = (row) => {

        return (
            <div style={{width: 1950}}>

                <Table className = "ckDetil-depttable"
                    columns={business_columns}
                    dataSource={row.Opportunity}
                    pagination={false}>

                </Table>

            </div>)
    }

    handleExport = (e)=> {
        e.preventDefault();

        const exportParam = {
            objName: 'accountListDetail',
            ...(table_params.data)
        }

        const exportUrl = SCRM.url('/common/scrmExport/export') + '?param=' + JSON.stringify(exportParam);
        console.log(exportUrl);
        window.open(exportUrl);

    }
    render() {
        const {
            $$account_detail_person,
            getTableData

            } = this.props

        let queryDataTable = {}
        queryDataTable.dataSource = $$account_detail_person.toJS().rows
        queryDataTable.current = $$account_detail_person.toJS().current
        queryDataTable.total = $$account_detail_person.toJS().total
        queryDataTable.pageSize = $$account_detail_person.toJS().pageSize
        queryDataTable.queryColumns = $$account_detail_person.toJS().queryColumns
        queryDataTable.loading = $$account_detail_person.toJS().loading
        return (
            <div style={{marginLeft: '20px'}}>
                <div style={{marginTop: '14px',marginBottom: '14px'}}>
                <Row>
                    <Col span="8"><SearchInput ref="searchInput" onSearch={(value)=>{this.normalSearch(value)}}/> </Col>
                    <Col span="8" offset="8">
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
                    <TabPane tab="参与的客户" key="relation">
                    </TabPane>
                    <TabPane tab="重点客户" key="important">
                    </TabPane>
                    <TabPane tab="关注的客户" key="follow">
                    </TabPane>
                </Tabs>
                <QueryDataTable
                    columns={columns}
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
        $$account_detail_person: state.business.account_detail_person
    }
}

export default connect(mapStateToProps, {
    getTableData,
    getTableQuery
})(Account_Detail_Person_Page)