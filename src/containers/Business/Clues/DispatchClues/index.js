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
import { Table,Row , Col, Modal, Spin,  Button, Radio,Tabs, message, Input } from 'antd'
const RadioGroup = Radio.Group;
const TabPane = Tabs.TabPane;


import SearchInput from 'components/Business/SearchInput'
import { getTableData, getTableQuery,selectChange, selectDeptChange,fetchDeptData, showDispatchModal,updateTableData, table_params } from 'actions/business/clues/DispatchClues'

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
},{
    title: '导入来源',
    dataIndex: 'ImportSource',
    key: 'ImportSource',
}, {
    title: '创建时间',
    dataIndex: 'CreatedTime',
    key: 'CreatedTime',
},  {
    title: '线索负责人',
    dataIndex: 'OwnerID',
    key: 'OwnerID',
}, {
    title: '线索录入人',
    dataIndex: 'CreatedByID',
    key: 'CreatedByID',
}, {
    title: '微信',
    dataIndex: 'Wechat',
    key: 'Wechat',
}, {
    title: 'QQ',
    dataIndex: 'QQ',
    key: 'QQ',
}, {
    title: '线索来源',
    dataIndex: 'Source',
    key: 'Source',
}, {
    title: '描述',
    dataIndex: 'Description',
    key: 'Description',
}, {
    title: '电话',
    dataIndex: 'Phone',
    key: 'Phone',
}, {
    title: '已转化客户',
    dataIndex: 'TransedAccountID',
    key: 'TransedAccountID',
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
            type:0,
            flag:false
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
                owner: value,
                page: 1,
            }
        })




    }
    changeType = (type) => {


        // 重置筛选(高级搜索)
        this.refs.searchInput.emptyInput()
        this.refs.queryDataTable.resetQueryForm()
        this.refs.queryDataTable.clearCheckedAndExpanded()


        /*this.setState({
            tabActive:!this.state.tabActive
        })*/


        this.setState({
            type
        })

        this.props.getTableData({
            data: {
                searchData: [],
                owner: '',
                page: 1,
                pageSize: 0,
                assigned:type
            }
        })

        //  清空select状态
        if(this.refs.queryDataTable){
            this.refs.queryDataTable.setState({
                selectedRowKeys:[]
            })
        }


    }

    componentDidUpdate(prevProps,prevState){

        /*console.log(prevProps,prevState,this.state.tabActive)

        if(prevState.tabActive){
            console.log(findDOMNode(this.refs.queryDataTable))
            document.querySelector('.ant-pagination-options-quick-jumper input').value = '1';
        }*/

    }


    showModal(){
        const { $$dispatchCluesState  } = this.props

        const rowData = this.refs.queryDataTable.getCheckedRows()
        const deptData = $$dispatchCluesState.toJS().deptData

        if(!rowData.length ) {
            message.warn('请先选择要分派的线索!');
            return false;
        }

        this.setState({
            visible:true,
            selectOwner:null,
        })


        this.props.selectDeptChange(null)
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
                        this.props.fetchDeptData(true,result.data)
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


        this.setState({
            selectOwner:e.target['data-name']
        })
        this.props.selectDeptChange(e.target.value)
    }


    handleDispatchOk(){
        const { $$dispatchCluesState  } = this.props
        const { selectedRadioID } = $$dispatchCluesState.toJS()
        const selectData = this.refs.queryDataTable.getCheckedRows()
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
                    if(this.refs.queryDataTable){
                        this.refs.queryDataTable.setState({
                            selectedRowKeys:[]
                        })
                    }


                    this.props.selectChange([], []);
                    this.setState({
                        visible:false
                    },() => {
                        message.success('分派成功！')
                        this.props.updateTableData(selectIDs);

                        this.setState({
                            flag:true
                        },()=>{

                            //当当前页面数据为空时，刷新页面
                            //console.log(this.props.$$dispatchCluesState.toJS().rows.length)
                            if(!this.props.$$dispatchCluesState.toJS().rows.length){
                                //window.location.reload()
                                this.props.getTableData({
                                    url: SCRM.url('/scrmlead/index/getAssignList'),
                                    data:{
                                        page:1
                                    }

                                })

                            }else{
                                this.props.getTableData({
                                    url: SCRM.url('/scrmlead/index/getAssignList'),

                                })
                            }
                        })


                    })


                }else{
                    message.error(result.error)
                }
            }
        })



    }

    renderModalBox(){
        const { $$dispatchCluesState  } = this.props
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



    render() {

        const {
                $$dispatchCluesState,
                getTableData

            } = this.props

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
                            <Col span="8"><SearchInput ref="searchInput" placeholder="请输入线索负责人" onSearch={(value)=>{this.normalSearch(value)}}/> </Col>

                            <Col span="10" offset="6" style = {{textAlign: 'right'}}>
                                <button className = "col-cktop-btn "  onClick = { this.showModal.bind(this) }>分派</button>
                            </Col>
                        </Row>
                    </div>
                    <div className="ck-tab-hd">
                        <Tabs defaultActiveKey="all"
                              type="card"
                              onChange={i => {this.changeType(i)}}>
                            <TabPane tab="未分派" key="0">
                            </TabPane>
                            <TabPane tab="已分派" key="1">
                            </TabPane>

                        </Tabs>
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
        actions: bindActionCreators(DispatchCluesActions, dispatch),
    }
}





export default connect(
    mapStateToProps,
    {
        getTableData,
        getTableQuery,
        selectChange,
        fetchDeptData,
        selectDeptChange,
        showDispatchModal,
        updateTableData
    }
)(DispatchCluesPage)
