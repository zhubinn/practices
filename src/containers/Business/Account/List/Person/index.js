/**
 * Created by janeluck on 4/27/16.
 */
import { connect } from 'react-redux'
import {Button, Icon, Input, Row, Col, Tabs, Table, Pagination, Form, Select, Radio, Checkbox,  DatePicker, InputNumber, Cascader  } from 'antd'
import 'antd/style/index.less'
import SearchInput from 'components/Business/SearchInput'
import { getTableData, getTableQuery } from 'actions/business/account/list/person'
import { isEmpty } from 'lodash'

const Option = Select.Option;
const RadioGroup = Radio.Group;
const createForm = Form.create;
const FormItem = Form.Item;
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


// 查询表格
// 依赖Table, Pagination, Form
class QueryDataTable extends React.Component {


    static propTypes = {
        showPagination: React.PropTypes.bool,
        checkMode: React.PropTypes.bool,
        pagination: React.PropTypes.object,
        queryColumns: React.PropTypes.object,
        // 刷新数据回调函数
        onGetTableData: React.PropTypes.function
    }

    static defaultProps = {
        checkMode: false
    }


    constructor(props) {
        super(props)
        this.queryForm = ''
        this.state = {
            isSearchShow: false,
            selectedRowKeys: []

        }
    }

    onSelectChange = (selectedRowKeys)=> {

        this.setState({selectedRowKeys});
    }

    clearSelectedRows = () => {
        this.setState({
            selectedRowKeys: []
        })
    }

    handleSelectAll = (e, dataSource) => {


        if (e.target.checked) {
            this.setState({
                selectedRowKeys: dataSource.map((item, index) => {
                    return index
                })
            })
        } else {
            this.setState({
                selectedRowKeys: []
            })
        }

    }
    getSelection = (e) => {


    }

    renderQueryTable = (columns, queryColumns, checkMode) => {
        if (isEmpty(queryColumns)) return null
        const that = this

        if (!this.queryForm) {
            this.queryForm = React.createClass({
                handleSubmit(e) {
                    e.preventDefault();
                    console.log('收到表单值：', this.props.form.getFieldsValue());

                   // that.props.onSure(this.props.form.getFieldsValue())
                    if (that.props.onGetTableData) {
                        that.props.onGetTableData({
                            searchData: this.props.form.getFieldsValue()
                        })
                    }
                },
                resetForm(){
                    this.props.form.resetFields()
                },

                render() {
                    const { getFieldProps } = this.props.form;

                    return (
                        <Form form={this.props.form} >
                            <table>

                                <tbody className="ant-table-tbody">

                                <tr className="ant-table-row">
                                    {checkMode ? (<td className="ant-table-selection-column"></td>) : null}

                                    {
                                        columns.map((col, i) => (
                                            <td width={col.width} key={i}>
                                                {that.renderQuery(col, queryColumns, getFieldProps)}
                                            </td>
                                        ))
                                    }
                                </tr>
                                </tbody>
                            </table>
                            <div className="formFooter">
                                <Button type="ghost" onClick={(e) => {this.resetForm()}}>重置</Button>
                                <Button type="primary"  onClick={(e) => {this.handleSubmit(e)}}>确定</Button>
                            </div>
                        </Form>






                    );
                }
            });

            this.queryForm = Form.create()(this.queryForm);
        }
        return (<this.queryForm />)


    }

    renderQuery = (col, queryColumns, getFieldProps) => {

        const queryCol = queryColumns[col['key']];

        if (queryCol) {



            switch (queryCol['searchType']) {

                case 1:

                    return (<FormItem>
                        <Input {...getFieldProps(col['key'], {
                            initialValue: queryCol['renderData']['defaultValue']
                        })} />
                    </FormItem>)
                case 2:

                    return (<FormItem>
                        <InputNumber {...getFieldProps(col['key'], {
                            initialValue: queryCol['renderData']['defaultValue']
                        })} />
                    </FormItem>)

                default:
                    return null
            }
        }

        return null
    }


    render() {
        const {dataSource, columns, queryColumns,  current, pageSize, total, checkMode} = this.props
        const {isSearchShow, selectedRowKeys} = this.state
        let rowSelection = null
        if (checkMode) {
            rowSelection = {
                selectedRowKeys,
                onChange: this.onSelectChange
            };
        }


        // 分页
        const pagination = {
            current: current,
            pageSize: pageSize,
            total: total,
            showSizeChanger: true,
            showQuickJumper: true,
            onChange: (pageNumber) => {
                this.clearSelectedRows()
                this.props.onGetTableData({

                    page: pageNumber,
                    pageSize: 0

                })
            },
            onShowSizeChange: (current, pageSize) => {
                this.clearSelectedRows()
                this.props.onGetTableData({

                    pageSize: pageSize,
                    page: 1

                })
            }
        }


        return (

            <div>

                <div style={{width: '800px', height: '500px',  overflow: "auto"}}>
                    <div style={{width: '2000px'}}>



                        <div className="ant-table ant-table-middle ant-table-bordered"
                             onSubmit={this.handleSubmit }>
                            <div className="ant-table-body">
                                <div>
                                    <table>
                                        <thead className="ant-table-thead">
                                        <tr>
                                            {checkMode ?
                                                (<th className="ant-table-selection-column">
                                                    <Checkbox
                                                        ref="SelectAll"
                                                        checked={ this.state.selectedRowKeys.length === dataSource.length }
                                                        onChange={
                                                            (e)=>{this.handleSelectAll(e, dataSource)}}/></th>) : null }

                                            {
                                                columns.map(col => <th width={col.width}>{col.title}</th>)
                                            }
                                        </tr>
                                        </thead>
                                    </table>

                                    {/*搜索部分*/}
                                    {this.renderQueryTable(columns, queryColumns, checkMode)}


                                </div>

                            </div>

                        </div>


                        <Table ref='dataTable'
                               dataSource={dataSource}
                               columns={columns}
                               rowSelection={rowSelection}
                               pagination={false}
                        >
                        </Table>
                    </div>

                </div>

                <Pagination  {...pagination}/>
            </div>
        )
    }
}


class Account_List_Person_Page extends React.Component {
    constructor() {
        super()

    }

    componentDidMount() {
        // todo: url包装
        this.props.getTableData({

            url: 'http://esn.jianyu.com/scrmweb/accounts/getList'
        })
        this.props.getTableQuery('http://esn.jianyu.com/scrmweb/accounts/getAccountFilter')
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
        return (
            <div>
                <Row>
                    <Col span="8"><SearchInput /> </Col>
                    <Col span="8" offset="8">
                        <Button type="primary">筛选</Button>
                        <Button type="ghost">变更联系人</Button>
                        <Button type="ghost">导出</Button>
                    </Col>
                </Row>
                <Tabs defaultActiveKey="1">
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