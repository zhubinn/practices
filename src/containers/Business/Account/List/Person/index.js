/**
 * Created by janeluck on 4/27/16.
 */
import { connect } from 'react-redux'
import {Button, Icon, Input, Row, Col, Tabs, Table, Pagination,Modal, Form, Upload, message  } from 'antd'
import 'antd/style/index.less'
import SearchInput from 'components/Business/SearchInput'
import { getTableData, getTableQuery, table_params } from 'actions/business/account/list/person'
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
        this.state = {
            importModalVisible: false,
            fileList: []
        }
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
        const checkedRows = this.refs.queryDataTable.getCheckedRows()
        if (checkedRows.length == 0) {
            Modal.info({
                title: '请先选择客户',
                onOk() {
                },
            });
        } else {

        }

    }

    showImportModal = ()=> {
        this.setState({
            importModalVisible: true
        });
    }

    handleOk = () => {
        console.log('点击了确定');
        this.setState({
            importModalVisible: false
        });
    }
    handleCancel = (e) => {
        console.log(e);
        this.setState({
            importModalVisible: false
        });
    }

    handleUpload = (e) => {

    }

    handleImport = (e) => {
        console.log(this.state.fileList)
    }

    handleExport = (e)=> {
        e.preventDefault();

        const exportParam = {
            objName: 'accountList',
            ...(table_params.data)
        }

        const exportUrl = SCRM.url('/common/scrmExport/export') + '?param=' + JSON.stringify(exportParam);
        console.log(exportUrl);
        window.open(exportUrl);

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

        const that = this
        const uploadProps = {
            //showUploadList: false,
            name: 'file',
            action: SCRM.url('/common/scrmImportOptimization/import/objName/Account'),
            headers: {
                authorization: 'authorization-text',
            },

            onChange(info) {

                if (info.file.status !== 'uploading') {
                    console.log(info.file, info.fileList);
                }
                if (info.file.status === 'done') {
                    message.success(`${info.file.name} 上传成功。`);
                } else if (info.file.status === 'error') {
                    message.error(`${info.file.name} 上传失败。`);
                }
                let fileList = info.fileList;
                that.setState({ fileList });
            }
        };
        const importFooter = (<Row> <Col span="12" offset="3"><Button type="primary" onclick={(e)=>{this.handleImport(e)}}>
            <Icon type="poweroff"/>开始导入
        </Button></Col></Row>)

        return (
            <div style={{marginLeft: '20px'}}>
                <div style={{marginTop: '14px',marginBottom: '14px'}}>
                <Row>
                    <Col span="8"><SearchInput ref="searchInput" onSearch={(value)=>{this.normalSearch(value)}}/> </Col>

                    <Col span="8" offset="8" style={{width: '305px',float: 'right',marginLeft: '0px'}} >
                        <div className = "cklist-Persontfilter">
                        <Button type="primary" onClick={(e)=>{
                            this.refs.queryDataTable.toggleQueryTable(e)
                        }}>筛选</Button>
                            </div>
                        <div className = "cklist-PersonChange">
                        <Button type="ghost" onClick={(e) => {this.changeOwner(e)}}>变更负责人</Button>
                            </div>
                        <div className = "cklist-Persondaoru">
                        <Button type="primary" onClick={(e)=>{this.showImportModal()}}>导入</Button>
                            </div>
                        <Modal title="客户导入" visible={this.state.importModalVisible}
                               footer={importFooter}
                               onCancel={(e) => {this.handleCancel(e)}}>
                            <div>
                                <h4>一、<a href="javascript:;">下载【客户导入模板】</a></h4>
                                <div>
                                    <p>请按照数据模板的格式准备要导入的数据。</p>
                                </div>
                                <p>注意事项:</p>
                                <div>
                                    <p>1、模板中的表头不可更改，不可删除；</p>
                                    <p>2、其中客户名称为必填项，其他均为选填项；</p>
                                    <p>3、填写客户地址时，特别行政区名称需填写在模板中的省份字段下，由省/自治区直辖的县级行政区划，需将其名称直接填写在模板中的市字段下。</p>
                                </div>
                            </div>
                            <div>
                                <h4>二、选择需要导入的CSV文件</h4>
                                <div>
                                    <Upload {...uploadProps} fileList={this.state.fileList}>
                                        <Button type="ghost">
                                            <Icon type="upload"/> 点击上传
                                        </Button>
                                    </Upload>
                                </div>
                                <div>
                                    <p>1、只支持CSV格式，文件大小不能超过1M；</p>
                                    <p>2、为保证较好性能，请将导入条数控制在2000条以内；</p>
                                    <p>3、请不要在同一时间导入多个文件。</p>
                                </div>
                            </div>


                        </Modal>
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
                    checkMode={true}
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
        $$account_list_person: state.business.account_list_person
    }
}

export default connect(mapStateToProps, {
    getTableData,
    getTableQuery
})(Account_List_Person_Page)