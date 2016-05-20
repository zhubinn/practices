/**
 * Created by janeluck on 4/27/16.
 */
import { connect } from 'react-redux'
import {
    changeIsMultiselect,
    getPeopleData,
    changeIsShowStatus,
    getNextPagePeopleData
    } from 'actions/Component/SelectPeople'

import SelectPeople from 'components/Business/SelectPeople'
import reqwest from 'reqwest'
import { isEmpty } from 'lodash'

import {Button, Icon, Input, Row, Col, Tabs, Table, Pagination, Form, Modal, message  } from 'antd'
import SearchInput from 'components/Business/SearchInput'
import { getTableData, getTableQuery, getPermission, table_params } from 'actions/business/business/list/dept'

import QueryDataTable from 'components/Business/QueryDataTable'
import getQueryString from 'components/Business/GetQueryString'

import 'containers/Business/index.less'
import 'containers/Business/lsx-index.less'

const FormItem = Form.Item;
const TabPane = Tabs.TabPane;

// 变更负责人选择人组件调用
let getPeopleParams = {
    url: SCRM.url('/common/scrmCommon/getSelectList'),
    data: {
        page: 1,
        rowsPerPage: 20,
        keyword: ''
    }
}

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
        "title": "所属客户"
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

class DeptList extends React.Component {
    constructor() {
        super()
        this.state = {
            changeOwnerRowsLength: 0,
            type:'all',
        }

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

        this.setState({
            type
        })

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

        this.props.getPermission({
            type
        })

    }


    //变更负责人选人
    changeOwner(e){
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
    getFilterData (PeopleInfor) {
        const checkedRows = this.refs.queryDataTable.getCheckedRows()
        console.log('所选人员信息')
        console.log(PeopleInfor)
        const {changeIsShowStatus} = this.props
        changeIsShowStatus()

        message.loading('正在执行中...', 0);
        reqwest({
            url: SCRM.url('/scrmweb/business/modifyOwner'),
            type:'json',
            method:'post',
            data: {
                type:this.state.type,
                ownerID: PeopleInfor.choseNameData[0].ownerId,
                selectIDs: checkedRows.map((item, i)=>{
                    return item.ID
                }),
                relContact: !PeopleInfor.isChangeContact ? 0 : 1,
                relOptnty: !PeopleInfor.isChangeBusiness ? 0 : 1

            },

            success: function (r) {
                //debugger
                message.destroy()
                if (r.rs) {
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



        let queryDataTable = {};
        let peoplePropsData = {};

        queryDataTable.dataSource = $$business_list_dept.toJS().rows
        queryDataTable.current = $$business_list_dept.toJS().current
        queryDataTable.total = $$business_list_dept.toJS().total
        queryDataTable.pageSize = $$business_list_dept.toJS().pageSize
        queryDataTable.queryColumns = $$business_list_dept.toJS().queryColumns
        queryDataTable.loading = $$business_list_dept.toJS().loading

        peoplePropsData.IsMultiselect = $$business_list_dept.toJS().IsMultiselect
        peoplePropsData.data = $$business_list_dept.toJS().data
        peoplePropsData.selectPeopleModal = $$business_list_dept.toJS().selectPeopleModal

        //选中人员的长度
        peoplePropsData.checkedRowsLength = this.state.changeOwnerRowsLength


        // 权限
        let permission = $$business_list_dept.toJS().permission



        return (
            <div className="ck-root-main">

                <div className="ck-root-title">

                    <Row>
                        <Col span="8"><SearchInput ref="searchInput" onSearch={(value)=>{this.normalSearch(value)}}/> </Col>

                        <Col span="10" offset="6" style = {{textAlign: 'right'}} >
                            <div className="ckBusiness-listfilter">
                                <Button type="primary" onClick={(e)=>{
                                    this.refs.queryDataTable.toggleQueryTable(e)
                                }}>筛选</Button>

                             </div>

                            {
                                permission.changeOwner == 1
                                ? <Button type="ghost" onClick={this.changeOwner.bind(this)} style = {{marginRight:10}}>变更负责人</Button>
                                : null
                            }


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
        $$business_list_dept: state.business.business_list_dept
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
})(DeptList)