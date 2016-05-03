import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import Customizable from './CustomizablePage.less'

import DivTab from './DivTab'

import { selectedRowData,clickCloseBtn,selectedTabIndex,changeIsRequired,getTableData,
    addItem,deletItem,changeInputValue,ChangeStatus,clickapplyBtn,DownItem,UpItem,
    clickCancleBtn,dataItem} from 'actions/Business/Account/Customizable'

import { Table, Icon,message } from 'antd';

let currentText


let columns = [
    {title: '客户名称', dataIndex: 'Label',key: 'Label', width: 170},
    {title: '客户类型', dataIndex: 'AttrType',key: 'AttrType', width: 160,render: function(text, record, index){
        return (<div>{text==13?'下拉单选':''}</div>);
    }},
    {title: '是否必填', dataIndex: 'IsMust',key: 'IsMust', width: 130,render: function(text, record, index){
        return (<div>{text==1?'是':'否'}</div>);
    }},
    {title: '备注说明', dataIndex: 'Content',key: 'Content', width: 170 },
    {title: '操作', dataIndex: 'ID',key: 'ID' , width: 170, render: function(text, record, index){
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

	render(){
        const {selectedRowData,$$mapState, getTableData,dataItem} = this.props;
        const IsShow = $$mapState.toJS().IsShow;
        const rows = $$mapState.toJS().rows;
        const data = $$mapState.toJS().data;
        if(!IsShow){
             return (
                <div className = "col_right" >
                    <div style={{marginLeft: '20px'}} className="customTableWrap">
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
                                <DivTab 
                                    $$mapState={$$mapState} 
                                    selectedTabIndex={selectedTabIndex} 
                                    $$mapState={$$mapState} 
                                    changeIsRequired = {changeIsRequired} 
                                    addItem={addItem} 
                                    deletItem={deletItem} 
                                    changeInputValue={changeInputValue} 
                                    ChangeStatus={ChangeStatus}
                                    DownItem = {DownItem} 
                                    UpItem={UpItem} 
                                    clickapplyBtn={clickapplyBtn} 
                                    clickCancleBtn={clickCancleBtn}
                                    getTableData= {getTableData}                                >
                                </DivTab>
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