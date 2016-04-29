/**
 * Created by janeluck on 4/27/16.
 */
import { connect } from 'react-redux'
import {Button, Icon, Input, Row, Col, Tabs, Table, Pagination } from 'antd'
import 'antd/style/index.less'

import { getTableData } from 'actions/business/account/list/person'

const TabPane = Tabs.TabPane;



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


class Account_List_Person_Page extends React.Component {
    constructor() {
        super()

    }
    componentDidMount() {
        this.props.getTableData({
            url: 'http://esn.jianyu.com/scrmweb/accounts/getList'
        })
     
    }
    render() {
        const {
            $$account_list_person
            } = this.props
        const dataSource = $$account_list_person.toJS().rows
        const current = $$account_list_person.toJS().current
        const total = $$account_list_person.toJS().total
        const pagination = {
            current: current,
            pageSize: dataSource.length,
            total: total,
            showSizeChanger: true,
            showQuickJumper: true,
            onChange: (pageNumber) => {
                this.props.getTableData({
                    data: {
                        page: pageNumber
                    }
                })
            }
        }
        return (
            <div>
                <Row>
                    <Col span="8"> </Col>
                    <Col span="8" offset="8">
                        <Button type="primary" >筛选</Button>
                        <Button type="ghost">变更联系人</Button>
                        <Button type="ghost">导出</Button>
                    </Col>
                </Row>
                <Tabs defaultActiveKey="1">
                    <TabPane tab="全部客户" key="1">
                        <div style = {{width: '800px', height: '500px',  overflow: "auto"}}>
                            <div style = {{width: '2000px'}}>
                                <Table  dataSource = {dataSource}
                                        columns = {columns}
                                        pagination = {false}
                                >
                                </Table>
                            </div>

                        </div>
                        <Pagination
                            {...pagination}>
                        </Pagination>
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
    getTableData
})(Account_List_Person_Page)