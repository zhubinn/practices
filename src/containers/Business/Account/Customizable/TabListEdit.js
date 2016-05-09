import { isPlainObject, isFunction, isString } from 'lodash'
import warning from 'fbjs/lib/warning'
import DivEdit from './DivEdit'
import {message } from 'antd';
import { Checkbox } from 'antd';

class TabListEdit extends React.Component{
	constructor(props) {
        super(props)
        this.handleCheckbox = this.handleCheckbox.bind(this)
    }
    handleCheckbox(){
        const selectedRow = this.props.$$mapState.toJS().selectedRow;
        const {changeIsRequired}=this.props;
        selectedRow['IsMust']=='1'?changeIsRequired({'IsMust':'0'}):changeIsRequired({'IsMust':'1'})
    }
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
    handleCancle(){
        const {clickCancleBtn} = this.props;
        clickCancleBtn();
    }

	render(){
        const selectedRow = this.props.$$mapState.toJS().selectedRow;
        const editColumnsOptions = this.props.$$mapState.toJS().editColumnsOptions        
        const {
                    $$mapState,
                    addItem,
                    deletItem,
                    changeInputValue,
                    ChangeStatus,
                    DownItem,
                    UpItem,
                    clickapplyBtn,
                    clickCloseBtn,
                    getTableData,
                    collectDeletedItem
                } = this.props;
        return (
            <div className = "ck-customize-CntMian">
                <div >
                    <ul className = "ck-customize-Txt01 clearfix">
                        <li>字段名称：{selectedRow["Label"]}</li>
                        <li>字段类型：{selectedRow["AttrType"]==13?'下拉单选':''}</li>
                        <li>
                            <label>是否必填：
                                <Checkbox checked={selectedRow['IsMust']=='1'?true:false} onChange={this.handleCheckbox} ref="checkboxInput"/>必填
                            </label>
                        </li>

                    </ul>
                    <DivEdit 
                        addItem={addItem} 
                        $$mapState={$$mapState} 
                        deletItem={deletItem} 
                        changeInputValue={changeInputValue} 
                        ChangeStatus={ChangeStatus}
                        DownItem = {DownItem} 
                        UpItem={UpItem}
                        collectDeletedItem={collectDeletedItem}
                        >
                    </DivEdit>
                    <div className = "ck-customizeConfirm">
                        <p className="ck-customize-gongn01Txt01">
                            <span className = "xinghua">*</span>应用后直接在移动端保存显示
                        </p> 
                        <p className="ck-customize-gongn01Txt01">
                            <span className = "xinghua">*</span>取消后新增的内容不再保存
                        </p> 


                    </div>
                </div>
            </div>
        )
	}
}

export default TabListEdit