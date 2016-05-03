/**
 * Created by janeluck on 4/27/16.
 */
import { connect } from 'react-redux'
import {Button, Icon, Input, Row, Col, Tabs, Table, Pagination, Form  } from 'antd'
import 'antd/style/index.less'
import SearchInput from 'components/Business/SearchInput'
import { getTableData, getTableQuery } from 'actions/business/account/list/person'
import { isEmpty } from 'lodash'
import QueryDataTable from 'components/Business/QueryDataTable'

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
    title: '客户公司电话',
    dataIndex: 'Phone',
    key: 'Phone',

}, {
    title: '客户简介',
    dataIndex: 'Descriptions',
    key: 'Descriptions',

}, {
    title: '业务类型',
    dataIndex: 'AccountIndustry',
    key: 'AccountIndustry',

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



class Account_List_Person_Page extends React.Component {
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

    render() {
        const {
            $$account_list_person,
            getTableData

            } = this.props

        let queryDataTable = {}
        queryDataTable.dataSource = $$account_list_person.toJS().rows
        queryDataTable.current = $$account_list_person.toJS().current
        queryDataTable.total = $$account_list_person.toJS().total
        queryDataTable.pageSize = $$account_list_person.toJS().pageSize
        queryDataTable.queryColumns = $$account_list_person.toJS().queryColumns
        queryDataTable.loading = $$account_list_person.toJS().loading
        return (
            <div>
                <Row>
                    <Col span="8"><SearchInput /> </Col>
                    <Col span="8" offset="8">
                        <Button type="primary" onClick = {(e)=>{
                            this.refs.queryDataTable.toggleQueryTable(e)
                        }}>筛选</Button>
                        <Button type="ghost">变更联系人</Button>
                        <Button type="ghost">导出</Button>
                    </Col>
                </Row>
                <Tabs defaultActiveKey="1"
                      onChange={function(i){

                }}>
                    <TabPane tab="全部客户" key="1">


                        <QueryDataTable
                            columns={columns}
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


                    </TabPane>
                    <TabPane tab="负责的客户" key="2">
                    </TabPane>
                    <TabPane tab="参与的客户" key="3">
                    </TabPane>
                    <TabPane tab="重点客户" key="4">
                    </TabPane>
                    <TabPane tab="关注的客户" key="5">
                    </TabPane>
                </Tabs>

            </div>
        )
    }
}

const mapStateToProps = (state, ownProps) => {
    return {
        $$account_list_person: state.business.account_list_person
    }
}

export default connect(mapStateToProps, {
    getTableData,
    getTableQuery
})(Account_List_Person_Page)