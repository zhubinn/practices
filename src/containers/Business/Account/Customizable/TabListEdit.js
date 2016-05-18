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
                    collectDeletedItem,
                    HasRepeatData

                } = this.props;
        return (
            <div className = "ck-customize-CntMian">
                <div >
                    <ul className = "ck-customize-Txt01 clearfix">
                        <li>字段名称：{selectedRow["Label"]}</li>
                        <li>字段类型：{selectedRow["AttrType"]==13?'单选':''}</li>
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
                        HasRepeatData={HasRepeatData}
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