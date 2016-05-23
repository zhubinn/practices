/*
* 线索
* 分派线索
* */

import React, { Component, PropTypes } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import fetch from 'isomorphic-fetch'
import { findDOMNode } from 'react-dom'
import reqwest from 'reqwest'
import { Table,Row , Col, Modal, Spin,  Button, Radio, message, Input } from 'antd'
const RadioGroup = Radio.Group;
import SearchInput from 'components/Business/SearchInput'
import { getTableData, getTableQuery, getPermission, table_params } from 'actions/business/clues/DispatchClues'

import QueryDataTable from 'components/Business/QueryDataTable'
import getQueryString from 'components/Business/GetQueryString'

import 'containers/Business/index.less'
//less
import './less/clues.less'

import * as DispatchCluesActions from 'actions/business/clues/DispatchClues'

const columns = [{
    title: '姓名',
    dataIndex: 'Name',
    key: 'Name',
    width: 165,
    render(text, row, index) {

        return text.length>5 ? text.substring(0,5) : text

    },
}, {
    title: '客户名称',
    dataIndex: 'Company',
    key: 'Company',
    width: 180
},{
    title: '导入来源',
    dataIndex: 'ImportSource',
    key: 'ImportSource',
    width: 180
}, {
    title: '创建时间',
    dataIndex: 'CreatedTime',
    key: 'CreatedTime',
    width: 140
},  {
    title: '线索负责人',
    dataIndex: 'OwnerID',
    key: 'OwnerID',
    width: 180
}, {
    title: '线索录入人',
    dataIndex: 'CreatedByID',
    key: 'CreatedByID',
    width: 180
}, {
    title: '微信',
    dataIndex: 'Wechat',
    key: 'Wechat',
    width: 160
}, {
    title: 'QQ',
    dataIndex: 'QQ',
    key: 'QQ',
    width: 160
}, {
    title: '线索来源',
    dataIndex: 'Source',
    key: 'Source',
    width: 260
}, {
    title: '描述',
    dataIndex: 'Description',
    key: 'Description',
    width:160
}, {
    title: '电话',
    dataIndex: 'Phone',
    key: 'Phone',
    width: 160
}, {
    title: '已转化客户',
    dataIndex: 'TransedAccountID',
    key: 'TransedAccountID',
    width: 280
}, {
    title: '已转化联系人',
    dataIndex: 'TransedContactID',
    key: 'TransedContactID',
    width: 280
}]


class DispatchCluesPage extends Component {

    constructor(props, context) {
        super(props, context)

        this.state = {

        }
    }



    componentDidMount(){
        
        // todo: url包装
        this.props.getTableData({
            url: SCRM.url('/scrmlead/index/getAssignList'),
            data:{}

        })
        //this.props.getTableQuery(SCRM.url('/scrmweb/business/getOpportunityFilter'))

        /*this.fetchTableData({
            assigned:dispatchState,//0未分派,1已分派未处理 不传默认0
            rowsPerPage: 10
        })*/



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

    fetchTableData(params = {canAssign:1}){
        const { $$dispatchCluesState,actions } = this.props


        //console.log('请求参数：', params);
        this.setState({ loading: true });
        reqwest({
            url:SCRM.url('/scrmlead/index/getAssignList'),
            method:'post',
            data:params,
            type:'json',
            error:  (result) => {
                message.error('服务器错误,请联系客服!')
            },
            success:(result) => {

                if(result.rs){
                    const pagination = this.state.pagination;
                    const rowData = result.data.rowData;
                    pagination.total = result.data.total*1;
                    pagination.showTotal =()=> `共 ${result.data.total} 条`;

                    this.setState({
                        loading:false,
                        pagination,
                    })
                    actions.fetchData(true,rowData)
                }else{
                    message.error(result.error)
                }


            }
        })


    }

    handleTableChange(pagination) {
        const { dispatchCluesState,actions } = this.props
        const dispatchState = dispatchCluesState.toJS().dispatchState
        const pager = this.state.pagination;
        const owner = this.state.owner;
        //  清空select状态
        if(this.refs.tableList){
            this.refs.tableList.setState({
                selectedRowKeys:[]
            })
        }


        pager.current = pagination.current;

        this.setState({
            pagination: pager
        });

        this.fetchTableData({
            rowsPerPage : pagination.pageSize,
            page : pagination.current,
            assigned:dispatchState,//0未分派,1已分派未处理 不传默认0
            owner,
        });
    }

    renderTableList(){
        const { dispatchCluesState ,actions } = this.props
        const { rowData, loading, dispatchState } = dispatchCluesState.toJS()

        //未分派0
        const rowSelection = {
            onChange: this.onSelectChange.bind(this)
        };
        return (
            loading  ? <Table ref="tableList"
                              onChange={this.handleTableChange.bind(this)}
                              loading={this.state.loading}
                              pagination={this.state.pagination}
                              rowSelection={rowSelection}
                              columns={columns}
                              dataSource={rowData} /> : <div className="loading-box"><Spin  /></div>
        )

    }

    handClickTab(state){
        const { $$dispatchCluesState,actions } = this.props
        const $$dispatchState = dispatchCluesState.toJS().dispatchState

        if(state === dispatchState) return;

        this.setState({
            pagination: {},
            owner:''
        })

        actions.clickTab(state,false)

        if(this.refs.searchInput){
            this.refs.searchInput.setState({
                value:''
            })
        }

        this.fetchTableData({
            assigned:state,//0未分派,1已分派未处理 不传默认0
        })



    }

    clickSearch(value){
        const val = value.trim()

        this.setState({
            owner:val,
            pagination:{
                current:1
            }
        })

        this.searchFetchData(val)
    }

    searchFetchData(value){
        const { $$dispatchCluesState ,actions } = this.props
        const dispatchState = $$dispatchCluesState.toJS().dispatchState


        this.fetchTableData({
            assigned:dispatchState,//0未分派,1已分派未处理 不传默认0
            owner:value
        })

    }

    showModal(){
        const { $$dispatchCluesState ,actions } = this.props
        const rowData = $$dispatchCluesState.toJS().selectData
        const deptData = $$dispatchCluesState.toJS().deptData

        if(!rowData.length ) {
            message.warn('请先选择要分派的线索!');
            return false;
        }

        this.setState({
            visible:true,
            selectOwner:null,
        })


        actions.selectDeptChange(null)
        if(this.refs.radioGroup){
            this.refs.radioGroup.setState({
                value:null
            })
        }


        if(!this.state.visible && !deptData.length){

            reqwest({
                url:SCRM.url('/deptcomponent/DeptComponent/getUserListForLeadAssign'),
                method:'get',
                type:'json',
                success:(result) => {
                    if(result.rs){
                        actions.fetchDeptData(true,result.data)
                    }else{
                        message.error(result.error)
                    }
                }
            })
        }

    }

    cancelModal(){
        this.setState({
            visible:false
        })
    }

    onDeptRadioChange(e){
        const { actions } = this.props

        this.setState({
            selectOwner:e.target['data-name']
        })
        actions.selectDeptChange(e.target.value)
    }

    handleDispatchOk(){
        const { $$dispatchCluesState ,actions } = this.props
        const { selectedRadioID, selectData} = $$dispatchCluesState.toJS()
        const selectIDs = selectData.map((item) => item.ID)



        if(!selectedRadioID){
            message.warn('请选择要分派的人员')
            return false;
        }



        reqwest({
            url:SCRM.url('/scrmlead/index/changeOwner'),
            method:'post',
            data:{
                ownerID:selectedRadioID,
                selectIDs:selectIDs
            },
            type:'json',
            success:(result) => {
                if(result.rs){
                    //  清空select状态
                    if(this.refs.tableList){
                        this.refs.tableList.setState({
                            selectedRowKeys:[]
                        })
                    }

                    actions.updateTableData(selectIDs);
                    this.setState({
                        visible:false
                    },() => {

                        actions.selectChange([], [])
                        message.success('分派成功！')
                        console.log(dispatchCluesState.toJS().rowData)
                        if(!dispatchCluesState.toJS().rowData.length){
                            window.location.reload()
                        }

                    })
                }else{
                    message.error(result.error)
                }
            }
        })

    }

    renderModalBox(){
        const { $$dispatchCluesState ,actions } = this.props
        const deptData = $$dispatchCluesState.toJS().deptData

        return (
            <div>

                <Modal ref="modal"
                       visible={ this.state.visible }
                       title="选择要分派的人员" onOk={this.handleOk} onCancel={this.cancelModal.bind(this)}
                       footer={[
                <Button key="back" type="ghost" size="large" onClick={this.cancelModal.bind(this)}>取消</Button>,
                <Button key="submit" type="primary" size="large"  onClick={this.handleDispatchOk.bind(this)}>
                  确定分派
                </Button>]}>
                    {
                        <div>
                            <p className="select-owner">
                                你已经选择的负责人是:<em>{ this.state.selectOwner }</em>
                            </p>
                            <div className="ds-dept-list">

                                <div  className = { !deptData.length ? "loading-box" : "loading-box hidden" }>
                                    <Spin  />
                                </div>
                                <RadioGroup ref = "radioGroup" onChange={this.onDeptRadioChange.bind(this)} >
                                    {
                                        deptData.map((item, index) => {
                                            return (
                                                <Radio  key={ index } value={item.ID} data-name = {item.Name} className ="radio-item">
                                                    <div className="photo clearfix">
                                                        <img src={ item.Avatar ? item.Avatar :'/front/images/scrm/default_avatar.png' }/>
                                                        <p className="name">{ item.Name }</p>
                                                    </div>
                                                </Radio>

                                            )
                                        })
                                    }
                                </RadioGroup>
                            </div>
                        </div>
                    }
                </Modal>
            </div>
        )
    }

    onSelectChange(selectedRowKeys,selectedRows){
        const { $$dispatchCluesState ,actions } = this.props
        actions.selectChange(selectedRowKeys, selectedRows)
    }


    render() {

        const {
            $$dispatchCluesState,
            getTableData

            } = this.props


        const dispatchState = $$dispatchCluesState.toJS().dispatchState
        let queryDataTable = {};

        queryDataTable.dataSource = $$dispatchCluesState.toJS().rows
        queryDataTable.current = $$dispatchCluesState.toJS().current
        queryDataTable.total = $$dispatchCluesState.toJS().total
        queryDataTable.pageSize = $$dispatchCluesState.toJS().pageSize
        queryDataTable.queryColumns = $$dispatchCluesState.toJS().queryColumns
        queryDataTable.loading = $$dispatchCluesState.toJS().loading



        return (
            <div className="ck-root-main">
                <div className="col-right">
                    <div className="ck-root-title">

                        <Row>
                            <Col span="16">
                                <SearchInput ref="searchInput"  placeholder="输入线索负责人" style={{ width: 200 }} onSearch = { this.clickSearch.bind(this) } {...this.props}  />
                            </Col>

                            <Col span="8">
                                <button className = "col-cktop-btn "  onClick = { this.showModal.bind(this) }>分派</button>
                            </Col>
                        </Row>
                    </div>
                    <div className="ck-tab-hd">
                        <ul className="clearfix">
                            <li className = { dispatchState === 0 ? "active" : null } onClick = { this.handClickTab.bind(this,0) }><a>未分派</a></li>
                            <li className = { dispatchState === 1 ? "active" : null } onClick = { this.handClickTab.bind(this,1) }><a>已分派</a></li>
                        </ul>
                    </div>
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

                </div>
                { this.renderModalBox() }
            </div>
        )
    }

}







function mapStateToProps(state) {
    return {
        $$dispatchCluesState: state.business.dispatchCluesState //所有的业务页面state，都在state.business下
    }
}



function mapDispatchToProps(dispatch) {

    return {
        actions: bindActionCreators(DispatchCluesActions, dispatch)
    }
}

export default connect(mapStateToProps, {
    getTableData,
    getTableQuery,
})(DispatchCluesPage)

/*
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(DispatchCluesPage)*/
