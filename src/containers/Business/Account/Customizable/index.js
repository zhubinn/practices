import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import './CustomizablePage.less'

import DivTab from './DivTab'

import { selectedRowData,clickCloseBtn,selectedTabIndex,changeIsRequired,getTableData,
    addItem,deletItem,changeInputValue,ChangeStatus,clickapplyBtn,DownItem,UpItem,
    clickCancleBtn,dataItem,collectDeletedItem} from 'actions/Business/Account/Customizable'

import { Table, Icon,message ,Modal,Button,Row,Col} from 'antd';

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
        //let self = new  CustomizablePage()
         console.log(currentText)
        return (<button className = "ck-customize-bnt01" onClick={e=>currentText.handleSelectSet(record)}>设置</button>)
    }}
];

let params = {
    url:SCRM.url('/scrmdefined/account/getAccountEnumAttrList'),
    data:{
        
    }
}

// const onOperationClick = function(record) {
//     console.log(this)
// }

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


    //点击取消按钮

    handleCancle(){
        const {clickCancleBtn} = this.props;
        clickCancleBtn();
    }


    //点击确定按钮

        handleApply(){
        let localeditColumnsOptions = this.props.$$mapState.toJS().localeditColumnsOptions
        const selectedRow = this.props.$$mapState.toJS().selectedRow
        const deletedColumnsOptions = this.props.$$mapState.toJS().deletedItem
        //数据可能需要过滤 如果没有任何选项就应用  则提示要先选择应用
        const {clickapplyBtn} = this.props
        let num = 0
        localeditColumnsOptions.map((r,i)=>{
            r.Val==''?num++:0
        })


        /*点击应用  只有一条且内容为空 可以提交; 
            若多条且内容为空 或者多条中有空内容，则警告提示*/
        if(num>0 && localeditColumnsOptions.length>1){
            
                message.config({
                  top: 250
                });
                message.warn('请填写选项信息');
        }else{
            let applyParamData = {}
            applyParamData.Name = selectedRow.Name
            applyParamData.ID = selectedRow.ID
            applyParamData.Label = selectedRow.Label
            applyParamData.AttrType = selectedRow.AttrType
            applyParamData.IsMust = selectedRow.IsMust
            let paramAllOptions = []

            localeditColumnsOptions=localeditColumnsOptions.concat(deletedColumnsOptions)

            localeditColumnsOptions.map((r,i)=>{
                let row = {}
                row.DispOrder = i
                row.Key = r.Key
                row.Val = r.Val
                row.IsStop = r.IsStop
                row.IsDeleted = r.IsDeleted
                return paramAllOptions.push(row)
            })
            applyParamData.Enums = paramAllOptions
            let applyParam = {
                url:SCRM.url('/scrmdefined/account/saveEnumAttr'),
                data:applyParamData
            }


            clickapplyBtn(applyParam)
            //点击应用完毕自带更新table数据
            let params = {
                url:SCRM.url('/scrmdefined/account/getAccountEnumAttrList'),
                data:{
                    
                }
            }

            this.props.getTableData(params)
        }
        
    }

	render(){
        const {$$mapState,selectedTabIndex,changeIsRequired,getTableData,addItem,deletItem,
            changeInputValue,ChangeStatus,DownItem,UpItem ,clickapplyBtn,clickCancleBtn,collectDeletedItem} = this.props;
        const col_name = $$mapState.toJS().selectedRow["col_name"];
        const applyTankuangShow = $$mapState.toJS().applyTankuangShow
        const {selectedRowData, dataItem} = this.props;
        const IsShow = $$mapState.toJS().IsShow;
        const rows = $$mapState.toJS().rows;
        const data = $$mapState.toJS().data;
        const currentTabIndex = $$mapState.toJS().currentTabIndex

        const Footer = (
                <div className = "ck-customizeBtn clearfix" style={{display:currentTabIndex=='2'?'none':'block'}}>
                    <Row justify="center" align="middle">
                        <Col span="10" >
                            <Button className = "ck-customizeBtnL" type = 'primary' onClick = {this.handleApply.bind(this)}>应用</Button>
                        </Col>
                        <Col span="10" >
                            <Button className = "ck-customizeBtnR" onClick = {this.handleCancle.bind(this)}>取消</Button>
                        </Col>
                    </Row>
                </div>          
            )

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

                    <div className="customizableSettingWrap">

                        <Modal ref="modal"
                              className="vertical-center-modal"
                              visible={IsShow}
                              title="自定义" 
                              width = '620'
                              footer = {Footer}
                              onCancel = {this.handleClose.bind(this)}                   
                              >
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
                                    getTableData= {getTableData}  
                                    collectDeletedItem={collectDeletedItem}                              
                                    >
                                </DivTab>
                             </div>
                        </Modal>
                    </div>




                </div>
                )
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
    collectDeletedItem,

})(CustomizablePage)