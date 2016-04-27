import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import Customizable from './CustomizablePage.less'

import DivTab from './DivTab'
import DivList from './DivList'
import { selectedRowData,clickCloseBtn,selectedTabIndex,changeIsRequired,getTableData,
    addItem,deletItem,changeInputValue,ChangeStatus,clickapplyBtn,DownItem,UpItem,
    clickCancleBtn,dataItem} from 'actions/Business/Account/Customizable'

import { Table, Icon,message } from 'antd';
//import 'ucjs_modules/Ztree/3.5.0/css/zTreeStyle.css'
//import 'ucjs_modules/jquery-deptotree/1.0.0/jquery-deptotree.css'

//import 'ucjs_modules/Ztree/3.5.0/jquery.ztree.core-3.5.js'
//import 'ucjs_modules/Ztree/3.5.0/jquery.ztree.excheck-3.5.js'

//import 'ucjs_modules/jquery-deptotree/1.0.0/jquery-deptotree.js'


let currentText


let columns = [
    {title: '客户名称', dataIndex: 'Label',key: 'Label', width: 120},
    {title: '客户类型', dataIndex: 'AttrType',key: 'AttrType', width: 120,render: function(text, record, index){
        return (<div>{text==13?'下拉单选':''}</div>);
    }},
    {title: '是否必填', dataIndex: 'IsMust',key: 'IsMust', width: 160,render: function(text, record, index){
        return (<div>{text==1?'是':'否'}</div>);
    }},
    {title: '备注说明', dataIndex: 'Content',key: 'Content' },
    {title: '操作', dataIndex: 'ID',key: 'ID' , width: 130, render: function(text, record, index){
        return (
                <button className = "ck-customize-bnt01" onClick = {e=>currentText.handleSelectSet(record)}>设置</button>
          );
    }}
];

let params = {
    url:SCRM.url('/scrmdefined/account/getAccountEnumAttrList'),
    data:{
        
    }
}


class CustomizablePage extends  React.Component{
    constructor(props) {
        super(props)
        currentText = this
    }
    handleClose(){
        const {clickCloseBtn} = this.props;
        clickCloseBtn();
    }
    componentDidMount() {
      // 页面初始完,获取统计数据,触发action: GET_DATA
      this.props.getTableData(params)
    }
    handleSelectSet(record){
        const {selectedRowData} = this.props;
        let selectedRow={}
        selectedRow.Label = record.Label
        selectedRow.AttrType = record.AttrType
        selectedRow.IsMust = record.IsMust
        selectedRow.col_Remark = record.col_Remark
        selectedRow.ID = record.ID
        selectedRow.Name= record.Name

        let editColumnsOptions = []
        editColumnsOptions = record.Enums 
        selectedRowData(selectedRow,editColumnsOptions)
    }
    // handleclickDept(){
    //     const {dataItem} = this.props;
    //     deptotree('#date-range0')
    //     .DeptoTree(
    //         {
    //             type: 2,  // 类型1 会员 2部门
    //             maxNum:20000, // 最大数量
    //             isMultiple:1, // 是否多选
    //             deptid: 0,  // 部门ID ，默认为0 全部
    //             headImg: GLOBAL_INFO.imageUrl + '/images/default_avatar.jpg', // 默认头像, defaultHeadImgUrl ./images/default_avatar.jpg.thumb.jpg
    //             requestUrl: [], // 请求接口路径路径，可填写1-3个数组元素，如:['url-1','url-2','url-3'],依次对应为部门列表、员工列表、搜索会员列表
    //             // requestUrl: [
    //             //     SCRM.url('/deptcomponent/DeptComponent/getDeptTree'),
    //             //     SCRM.url('/deptcomponent/DeptComponent/getMemberListByDeptId'),
    //             //     SCRM.url('/deptcomponent/DeptComponent/getUserList')
    //             // ],

    //             beforeSuccess:function(obj,data,index){
    //             },// 确认提交回调函数
    //             success:function(data){
    //                 dataItem(data)
    //             }
    //         }
    //     )

    // }
	render(){
        const {selectedRowData,$$mapState, getTableData,dataItem} = this.props;
        const IsShow = $$mapState.toJS().IsShow;
        const rows = $$mapState.toJS().rows;
        const data = $$mapState.toJS().data;
        if(!IsShow){
             return (
                <div className = "col_right" >
                    <div style={{marginLeft: '20px'}}>
                        <Table ref = "dataTable"
                         columns={columns} 
                         dataSource={rows} 
                         useFixedHeader 
                         pagination = {false}
                         selectedRowData = {selectedRowData}
                         getTableData = {getTableData}
                        />
                    </div>
                </div>
            )
        }else{
        const {$$mapState,selectedTabIndex,changeIsRequired,getTableData,addItem,deletItem,
            changeInputValue,ChangeStatus,DownItem,UpItem ,clickapplyBtn,clickCancleBtn} = this.props;
        const col_name = $$mapState.toJS().selectedRow["col_name"];
        const applyTankuangShow = $$mapState.toJS().applyTankuangShow
            return (
                <div className = "col_right" >
                    <div style={{marginLeft: '20px'}}>
                        <Table ref = "dataTable"
                         columns={columns} 
                         dataSource={rows} 
                         useFixedHeader 
                         pagination = {false}
                         selectedRowData = {selectedRowData}
                         getTableData = {getTableData}
                        />

                    </div>
                     <div className = "CustomizableSettingBg">
                        <div className = "ck-customize-popBox">
                            <div className = "CustomizableSettingHead">{col_name}
                            <span className="settingClose" onClick = {this.handleClose.bind(this)}>关闭</span>
                            </div>
                            <div>
                                <DivTab $$mapState={$$mapState} selectedTabIndex={selectedTabIndex} ></DivTab>
                                <DivList $$mapState={$$mapState} changeIsRequired = {changeIsRequired} addItem={addItem} 
                                deletItem={deletItem} changeInputValue={changeInputValue} ChangeStatus={ChangeStatus}
                                DownItem = {DownItem} UpItem={UpItem} clickapplyBtn={clickapplyBtn} clickCancleBtn={clickCancleBtn}></DivList>
                            </div>
                        </div>
                     </div>
                </div>
                )
        }
	}
}

const mapStateToProps = (state, ownProps) => {
    return {
        $$mapState: state.business.account_Customizable
    }
}

export default connect(mapStateToProps, {
    selectedRowData,
    clickCloseBtn,
    dataItem,
    selectedTabIndex,
    changeIsRequired,
    getTableData,
    addItem,
    deletItem,
    changeInputValue,
    ChangeStatus,
    clickapplyBtn,
    DownItem,
    UpItem,
    clickCancleBtn,

})(CustomizablePage)