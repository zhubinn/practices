/**
 * Created by janeluck on 4/27/16.
 */
import { connect } from 'react-redux'
import {Button, Icon, Input, Row, Col, Tabs, Table, Pagination,Modal, Form, Upload, message, Progress  } from 'antd'
import 'antd/style/index.less'
import reqwest from 'reqwest'

import SearchInput from 'components/Business/SearchInput'
import { getTableData, getTableQuery, getPermission, table_params } from 'actions/business/account/list/person'
import {
    changeIsMultiselect,
    getPeopleData,
    changeIsShowStatus,
    getNextPagePeopleData
} from 'actions/__demo/selectPeople'
import { isEmpty } from 'lodash'
import QueryDataTable from 'components/Business/QueryDataTable'
import SelectPeople from 'components/Business/SelectPeople'
import 'containers/Business/index.less'

import {columns} from 'containers/Business/Account/common/constant'

const FormItem = Form.Item;
const TabPane = Tabs.TabPane;
const ProgressLine = Progress.Line;

// 变更负责人选择人组件调用
let getPeopleParams = {
    url: SCRM.url('/setting/scrm/getSelectList'),
    data: {
        page: 1,
        rowsPerPage: 20,
        keyword: ''
    }
}
// SCRM.url 由原来外层页面引入


// 是否为本人查看

let isSelf = true
if (window.location.search.match(/id=(\d*)/)) isSelf = false
if (RegExp.$1 == GLOBAL_INFO.userinfo.ID) isSelf = true


class Account_List_Person_Page extends React.Component {
    constructor() {
        super()
        this.state = {
            importModalVisible: false,
            inImport: false,

            importProgress: 0,
            changeOwnerRowsLength: 0
        }
    }

    componentDidMount() {
        // todo: url包装
        this.props.getTableData({

            url: SCRM.url('/scrmweb/accounts/getList')
        })
        this.props.getTableQuery(SCRM.url('/scrmweb/accounts/getAccountFilter'))
        this.props.getPermission({
            url: SCRM.url('/scrmweb/accounts/getPermission'),
            type: 'all'
        })


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

        this.props.getPermission({
            type
        })


    }


    //变更负责人选人
    changeOwner = (e) => {

        const checkedRows = this.refs.queryDataTable.getCheckedRows()
        if (checkedRows.length == 0) {
            Modal.info({
                title: '请先选择客户',
                onOk() {
                },
            });
        } else {
            const IsMultiselect = 0;//0 单选  1 多选
            const {changeIsMultiselect} = this.props
            changeIsMultiselect(IsMultiselect)
            const {getPeopleData} = this.props


            this.setState({
                changeOwnerRowsLength: checkedRows.length
            })
            const paramData = {
                page: 1,
                rowsPerPage: 20,
                keyword: ''
            }

            Object.assign(getPeopleParams.data, paramData);


            getPeopleData(getPeopleParams)

        }
    }

    //筛选选人
    handleSelection() {
        const IsMultiselect = 1;//0 单选  1 多选
        const {changeIsMultiselect} = this.props
        changeIsMultiselect(IsMultiselect)
        const {getPeopleData} = this.props
        const paramData = {
            page: 1,
            rowsPerPage: 20,
            keyword: ''
        }

        Object.assign(getPeopleParams.data, paramData);

        getPeopleData(getPeopleParams)
    }


    //点击取消按钮改变模态层显示状态
    handleChangeStatus() {
        const {changeIsShowStatus} = this.props
        changeIsShowStatus()
    }


    //点击确定按钮获取所选人员信息
    getFilterData(PeopleInfor) {
        const checkedRows = this.refs.queryDataTable.getCheckedRows()

        const {changeIsShowStatus} = this.props
        changeIsShowStatus()

        message.loading('正在执行中...', 0);
        reqwest({
            url: SCRM.url('/setting/scrm/changeOwner'),
            type: 'json',
            method: 'post',
            data: {
                objName: 'Account',
                ownerID: PeopleInfor.choseNameData[0].ownerId,
                selectIDs: checkedRows.map((item, i)=> {
                    return item.ID
                }),
                relContact: !PeopleInfor.isChangeContact ? 0 : 1,
                relOptnty: !PeopleInfor.isChangeBusiness ? 0 : 1

            },

            success: function (r) {

                if (r.rs) {
                    message.destroy()
                    message.success(`操作成功`);
                    top.window.location.href = top.window.location.href
                } else {
                    message.error(`操作失败`);
                }
            }

        })

    }

    //再次请求数据(按关键词搜索)
    requestPDList(page, value, rowsPerPage) {

        const paramData = {
            page: page,
            rowsPerPage: rowsPerPage,
            keyword: value
        }

        Object.assign(getPeopleParams.data, paramData);


        const {getPeopleData} = this.props
        getPeopleData(getPeopleParams)


    }


    //请求人员组件的下一页数据
    requestNextPoepleData(page, value) {


        const paramData = {
            page: page,
            rowsPerPage: 20,
            keyword: ''
        }

        Object.assign(getPeopleParams.data, paramData);


        const {getNextPagePeopleData} = this.props
        getNextPagePeopleData(getPeopleParams)


    }


    showImportModal = ()=> {
        this.setState({
            importModalVisible: true
        });
    }

    handleOk = () => {

        this.setState({
            importModalVisible: false
        });
    }
    handleCancel = (e) => {

        this.setState({
            importModalVisible: false
        });
    }

    handleUpload = (e) => {

    }


    handleExport = (e) => {
        e.preventDefault();

        const exportParam = {
            objName: 'accountList',
            ...(table_params.data)
        }

        const exportUrl = SCRM.url('/common/scrmExport/export') + '?param=' + JSON.stringify(exportParam);

        window.open(exportUrl);

    }

    onProgress = (progress, fileKey) => {

        this.setState({
            importProgress: progress
        })
        if (progress == 100) {
            clearInterval(this.progressTimer)

            this.setState({
                inImport: false
            })
            reqwest({
                url: SCRM.url('/common/scrmCommonImport/getResultMsg') + '?key=' + fileKey,
                method: 'post',
                type: 'json',
                success: function (r) {

                    if (r.rs) {
                        message.info(`${r.data.message}`);

                        if (Object.keys(r.data).indexOf('file') > -1) {

                            window.open(SCRM.url('/common/scrmCommonImport/getFailedFile') + '?key=' + fileKey)
                            message.info('相关信息请查看下载附件')
                        }


                    } else {
                        message.error(`${r.data}`)
                    }

                }

            })


        }


    }
    queryProcess = (fileKey) => {
        var that = this
        this.progressTimer = setInterval(function () {

            reqwest({
                url: SCRM.url('/common/scrmCommonImport/getProcess') + '?key=' + fileKey,
                method: 'post',
                type: 'json',
                success: function (r) {
                    that.onProgress(parseInt(r), fileKey);
                }

            })

        }, 200);
    }

    render() {
        const {
            $$account_list_person,
            getTableData

            } = this.props

        let queryDataTable = {}
        let peoplePropsData = {}
        queryDataTable.dataSource = $$account_list_person.toJS().rows
        queryDataTable.current = $$account_list_person.toJS().current
        queryDataTable.total = $$account_list_person.toJS().total
        queryDataTable.pageSize = $$account_list_person.toJS().pageSize
        queryDataTable.queryColumns = $$account_list_person.toJS().queryColumns
        queryDataTable.loading = $$account_list_person.toJS().loading


        peoplePropsData.IsMultiselect = $$account_list_person.toJS().IsMultiselect
        peoplePropsData.data = $$account_list_person.toJS().data
        peoplePropsData.selectPeopleModal = $$account_list_person.toJS().selectPeopleModal

        //选中人员的长度
        peoplePropsData.checkedRowsLength = this.state.changeOwnerRowsLength


        // 权限
        let permission = $$account_list_person.toJS().permission


        // 导入
        const that = this
        const uploadProps = {
            showUploadList: false,
            name: 'file',
            action: SCRM.url('/common/scrmCommonImport/import') + '?objName=Account',
            headers: {
                authorization: 'authorization-text',
            },
            onChange(info) {

                if (info.file.status !== 'uploading') {
                    // console.log(info.file, info.fileList);
                }


                if (info.file.status === 'done') {
                    let response = info.fileList[0].response

                    if (response.rs) {
                        message.success(`${info.file.name} 上传成功, 正在导入...`);
                        that.setState({
                            inImport: true,
                            importProgress: 0
                        })
                        that.queryProcess(response.data)


                    } else {
                        message.error(`${info.file.name} 上传失败。${response.data}`);
                    }
                }


            }
        };
        const importFooter = (<Row> <Col span="12" offset="3">
            {this.state.inImport ? (<Button type="ghost" disabled><Icon type="poweroff"/>导入中...</Button>) : (
                <Upload {...uploadProps} >
                    <Button type="primary" loading={this.state.inImport}>
                        <Icon type="upload"/>导入上传
                    </Button>
                </Upload>) }


        </Col></Row>)


        return (
            <div style={{marginLeft: '20px'}}>
                <div style={{marginTop: '14px',marginBottom: '14px'}}>
                    <Row>
                        <Col span="8"><SearchInput ref="searchInput"
                                                   onSearch={(value)=>{this.normalSearch(value)}}/></Col>

                        <Col span="10" offset="6">
                            <div className="cklist-Persontfilter">
                                <Button type="primary" onClick={(e)=>{
                            this.refs.queryDataTable.toggleQueryTable(e)
                        }}>筛选</Button>
                            </div>

                            {permission.changeOwner == 1 ? (<div className="cklist-PersonChange">
                                <Button type="ghost" onClick={(e) => {this.changeOwner(e)}}>变更负责人</Button>
                            </div>) : null}


                            <div className="cklist-Persondaoru">
                                <Button type="primary" onClick={(e)=>{this.showImportModal()}}>导入</Button>
                            </div>

                            <Modal title="客户导入" visible={this.state.importModalVisible}
                                   footer={importFooter}
                                   onCancel={(e) => {this.handleCancel(e)}}
                                   maskClosable={false}
                                   accept='.jpg'
                            >
                                <div className="account-import">
                                    <div>
                                        <h3>一、<a href="javascript:;">下载【客户导入模板】</a></h3>

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
                                        <h3>二、选择需要导入的CSV文件</h3>

                                        <div>

                                        </div>
                                        <div>
                                            <p>1、只支持CSV格式，文件大小不能超过1M；</p>

                                            <p>2、为保证较好性能，请将导入条数控制在2000条以内；</p>

                                            <p>3、请不要在同一时间导入多个文件。</p>
                                        </div>
                                    </div>
                                    {this.state.inImport ? (<div>
                                        <h4>导入进度: </h4>
                                        <ProgressLine percent={this.state.importProgress}/>*

                                    </div>) : null}
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
                                    getTableData({
                                        data: obj
                                    })
                                }
                            }
                    ref="queryDataTable"
                >
                </QueryDataTable>
                <SelectPeople

                    {...peoplePropsData}
                    handleClickConfirm={this.getFilterData.bind(this)}
                    handleClickCancle={this.handleChangeStatus.bind(this)}
                    requestData={this.requestPDList.bind(this)}
                    requestNextData={this.requestNextPoepleData.bind(this)}

                />

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
    getTableQuery,
    getPermission,
    changeIsMultiselect,
    getPeopleData,
    changeIsShowStatus,
    getNextPagePeopleData
})(Account_List_Person_Page)