import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import Customizable from './CustomizablePage.less'

import Table from './Table'
import DivTab from './DivTab'
import DivList from './DivList'
import { selectedRowData,clickCloseBtn,selectedTabIndex,changeIsRequired,getTableData,
    addItem,deletItem,changeInputValue,ChangeStatus,clickapplyBtn,DownItem,UpItem,
    clickCancleBtn,dataItem} from 'actions/Business/Account/Customizable'


//import 'ucjs_modules/Ztree/3.5.0/css/zTreeStyle.css'
//import 'ucjs_modules/jquery-deptotree/1.0.0/jquery-deptotree.css'

//import 'ucjs_modules/Ztree/3.5.0/jquery.ztree.core-3.5.js'
//import 'ucjs_modules/Ztree/3.5.0/jquery.ztree.excheck-3.5.js'

//import 'ucjs_modules/jquery-deptotree/1.0.0/jquery-deptotree.js'



let columns = [
    {text: '客户名称', datafield: 'col_name', width: 230},
    {text: '客户类型', datafield: 'col_type', width: 70},
    {text: '是否必填', datafield: 'col_IsRequired', width: 160},
    {text: '备注说明', datafield: 'col_Remark', width: 160},
    {text: '操作', datafield: 'id', width: 265, cellsrenderer: function(rowData, column, value){
        // this -> 所在行<Tr/>
        return (
            <div>
                <button className = "ck-customize-bnt01">设置</button>
            </div>

        )
    }
    }
];


class CustomizablePage extends  React.Component{
    handleClose(){
        const {clickCloseBtn} = this.props;
        clickCloseBtn();
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
    // handleclickPeople(){
    //     const {dataItem} = this.props;

    //     deptotree('#date-range1')
    //     .DeptoTree(
    //         {
    //             type: 1,  // 类型1 会员 2部门
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
                <div className = "col_right">
                    <div className="col_cktop">
                        <div className="col_cktop-topTitle"><a>客户</a>><a>自定义</a></div>
                    </div>
                    <Table 
                       columns={columns}
                       rows = {rows} 
                       selectedRowData = {selectedRowData}
                       getTableData = {getTableData}
                     >
                     </Table>
                </div>
            )
        }else{
        const {$$mapState,selectedTabIndex,changeIsRequired,getTableData,addItem,deletItem,
            changeInputValue,ChangeStatus,DownItem,UpItem ,clickapplyBtn,clickCancleBtn} = this.props;
        const col_name = $$mapState.toJS().selectedRow["col_name"];
        const applyTankuangShow = $$mapState.toJS().applyTankuangShow
            return (
                <div className = "col_right">
                    <div className="col_cktop">
                        <div className="col_cktop-topTitle"><a>客户</a>><a>自定义</a></div>
                    </div>
                    <Table 
                       columns={columns}
                       rows = {rows} 
                       selectedRowData = {selectedRowData}
                       getTableData = {getTableData}
                     >
                     </Table>
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