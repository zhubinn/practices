/**
 * Created by janeluck on 4/27/16.
 */
import { connect } from 'react-redux'
import {Button, Icon, Input, Row, Col, Tabs, Table, Pagination, Form, Modal, Upload, message  } from 'antd'
import 'antd/style/index.less'
import SearchInput from 'components/Business/SearchInput'
import { getTableData, getTableQuery, table_params } from 'actions/business/account/list/dept'
import {
    changeIsMultiselect,
    getPeopleData,
    changeIsShowStatus,
    getNextPagePeopleData
} from 'actions/__demo/selectPeople'
import reqwest from 'reqwest'
import { isEmpty } from 'lodash'
import QueryDataTable from 'components/Business/QueryDataTable'
import SelectPeople from 'components/Business/SelectPeople'
import 'containers/Business/index.less'

import {columns} from 'containers/Business/Account/common/constant'

const FormItem = Form.Item;
const TabPane = Tabs.TabPane;

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


// 查询表格
// 依赖Table, Pagination, Form


class Account_List_Dept_Page extends React.Component {
    constructor() {
        super()
        this.state = {
            importModalVisible: false,
            inImport: false,

            importProgress: 0
        }
    }

    componentDidMount() {
        // 判断是否为穿透
        let data = {}

        if (!!(window.location.search.match(/id=(\d*)/) && RegExp.$1)) {
            data.deptID = RegExp.$1
        }

        // 获取table的数据
        this.props.getTableData({
            url: SCRM.url('/scrmweb/accounts/getDeptList'),
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
    //变更负责人选人
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
            const IsMultiselect = 0;//0 单选  1 多选
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
    getFilterData (PeopleInfor) {
        const checkedRows = this.refs.queryDataTable.getCheckedRows()
        console.log('所选人员信息')
        console.log(PeopleInfor)
        const {changeIsShowStatus} = this.props
        changeIsShowStatus()

        message.loading('正在执行中...', 0);
        reqwest({
            url: SCRM.url('/setting/scrm/changeOwner'),
            type:'json',
            method:'post',
            data: {
                objName: 'Account',
                ownerID: PeopleInfor.choseNameData[0].ownerId,
                selectIDs: checkedRows.map((item, i)=>{
                    return item.ID
                }),
                relContact: !PeopleInfor.isChangeContact ? 0 : 1,
                relOptnty: !PeopleInfor.isChangeBusiness ? 0 : 1

            },

            success: function (r) {

                console.log(r)
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

        console.log('搜索关键词请求')
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

        console.log('请求下一页数据')
        const {getNextPagePeopleData} = this.props
        getNextPagePeopleData(getPeopleParams)



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


    handleExport = (e) => {
        e.preventDefault();

        const exportParam = {
            objName: 'accountList',
            ...(table_params.data)
        }

        const exportUrl = SCRM.url('/common/scrmExport/export') + '?param=' + JSON.stringify(exportParam);
        console.log(exportUrl);
        window.open(exportUrl);

    }

    onProgress = (progress) => {

        this.setState({
            importProgress: progress
        })
        if (progress == 100) {
            clearInterval(this.progressTimer)
            message.success(`导入成功!`);
            this.setState({
                inImport: false
            })
        }


    }
    queryProcess = () => {
        var that = this
        this.progressTimer = setInterval(function () {
            var progress = that.state.importProgress + 10

            that.onProgress(progress);
        }, 200);
    }

    render() {
        const {
            $$account_list_dept,
            getTableData

            } = this.props

        let queryDataTable = {}
        let peoplePropsData = {}
        queryDataTable.dataSource = $$account_list_dept.toJS().rows
        queryDataTable.current = $$account_list_dept.toJS().current
        queryDataTable.total = $$account_list_dept.toJS().total
        queryDataTable.pageSize = $$account_list_dept.toJS().pageSize
        queryDataTable.queryColumns = $$account_list_dept.toJS().queryColumns
        queryDataTable.loading = $$account_list_dept.toJS().loading


        peoplePropsData.IsMultiselect = $$account_list_dept.toJS().IsMultiselect
        peoplePropsData.data = $$account_list_dept.toJS().data
        peoplePropsData.selectPeopleModal = $$account_list_dept.toJS().selectPeopleModal
        //选中人员的长度 假数据
        peoplePropsData.checkedRowsLength = 10

        const that = this
        const uploadProps = {
            showUploadList: false,
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
                    console.log("info.fileList[0].response:")
                    console.log(info.fileList[0].response)
                    message.success(`${info.file.name} 上传成功, 正在导入...`);
                    that.setState({
                        inImport: true,
                        importProgress: 0
                    })
                    that.queryProcess()


                } else if (info.file.status === 'error') {
                    message.error(`${info.file.name} 上传失败。`);
                }

            }
        };
        const importFooter = (<div className="ckimport-shangc"><Row> <Col span="12" offset="3">
            {this.state.inImport ? (<Button type="ghost" disabled><Icon type="poweroff"/>导入中...</Button>) : (
                <Upload {...uploadProps} >

                    <Button  type="primary" loading={this.state.inImport}>
                        <Icon type="upload"/>导入上传
                    </ButtonclassName>

                </Upload>) }


        </Col></Row></div>)
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

                            <div className="cklist-PersonChange">
                                <Button type="ghost" onClick={(e) => {this.changeOwner(e)}}>变更负责人</Button>
                            </div>

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

                            <Button  type="ghost" onClick={(e)=>this.handleExport(e)}>导出</ButtonclassName>
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
        $$account_list_dept: state.business.account_list_dept
    }
}

export default connect(mapStateToProps, {
    getTableData,
    getTableQuery,
    changeIsMultiselect,
    getPeopleData,
    changeIsShowStatus,
    getNextPagePeopleData
})(Account_List_Dept_Page)