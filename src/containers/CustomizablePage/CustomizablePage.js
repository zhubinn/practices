import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import Customizable from 'components/CustomizablePage/CustomizablePage.less'

import Table from 'components/CustomizablePage'
import DivTab from 'components/CustomizablePage/DivTab'
import DivList from 'components/CustomizablePage/DivList'
import { selectedRowData,clickCloseBtn,selectedTabIndex,changeIsRequired,getTableData,
    addItem,deletItem,changeInputValue,ChangeStatus,clickapplyBtn,DownItem,UpItem,clickCancleBtn} from 'actions/CustomizablePage/CustomizablePage'

import layer from 'ucjs_modules/layer/2.2.0/layer.js'

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
	render(){
        const {selectedRowData,mapState, getTableData} = this.props;
        const IsShow = mapState.toJS().IsShow;
        const rows = mapState.toJS().rows;
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
        const {mapState,selectedTabIndex,changeIsRequired,getTableData,addItem,deletItem,
            changeInputValue,ChangeStatus,DownItem,UpItem ,clickapplyBtn,clickCancleBtn} = this.props;
        const col_name = mapState.toJS().selectedRow["col_name"];
        const applyTankuangShow = mapState.toJS().applyTankuangShow
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
                                <DivTab mapState={mapState} selectedTabIndex={selectedTabIndex} ></DivTab>
                                <DivList mapState={mapState} changeIsRequired = {changeIsRequired} addItem={addItem} 
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
        mapState: state.Customizable
    }
}

export default connect(mapStateToProps, {
    selectedRowData,
    clickCloseBtn,
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