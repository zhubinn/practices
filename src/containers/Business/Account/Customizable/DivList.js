import { isPlainObject, isFunction, isString } from 'lodash'
import warning from 'fbjs/lib/warning'
import DivEdit from './DivEdit'


class DivList extends React.Component{
	constructor(props) {
        super(props)
        this.handleCheckbox = this.handleCheckbox.bind(this)
    }
    handleCheckbox(){
        const selectedRow = this.props.$$mapState.toJS().selectedRow;
        const {changeIsRequired}=this.props;
        selectedRow['col_IsRequired']=='是'?changeIsRequired({'col_IsRequired':'否'}):changeIsRequired({'col_IsRequired':'是'})
    }
    handleApply(){
        const editColumnsOptions = this.props.$$mapState.toJS().editColumnsOptions
        //数据可能需要过滤 如果没有任何选项就应用  则提示要先选择应用
        const {clickapplyBtn} = this.props
        if(editColumnsOptions.length ==1 && editColumnsOptions[0].optionInfor == ''){
            layer.msg('请填写选项信息', {icon: 7}); 
        }else{
            clickapplyBtn(editColumnsOptions)
        }
        
    }
    handleCancle(){
        const {clickCancleBtn} = this.props;
        clickCancleBtn();
    }
    componentWillUpdate() {
        const currentTabIndex = this.props.$$mapState.toJS().currentTabIndex;
        const selectedRow = this.props.$$mapState.toJS().selectedRow;
        const editColumnsOptions = this.props.$$mapState.toJS().editColumnsOptions
        if(currentTabIndex==0){
            const {$$mapState,addItem,deletItem,changeInputValue,ChangeStatus,DownItem,UpItem,clickapplyBtn,clickCloseBtn} = this.props;

            return (
                <div >
                    <ul className = "ck-customize-Txt01 clearfix">
                        <li>字段名称：{selectedRow["col_name"]}</li>
                        <li>字段类型：{selectedRow["col_type"]}</li>
                        <li>是否必填：<input type = "checkbox" ref="checkboxInput" 
                        defaultChecked={selectedRow['col_IsRequired']=='是'?'checked':''} onChange = {this.handleCheckbox}
                        disabled = {editColumnsOptions[0].optionInfor.length == 0?'disabled':''}/>必填</li>
                    </ul>
                    <DivEdit addItem={addItem} $$mapState={$$mapState} deletItem={deletItem} 
                    changeInputValue={changeInputValue} ChangeStatus={ChangeStatus}
                    DownItem = {DownItem} UpItem={UpItem}></DivEdit>
                    <div className = "ck-customizeConfirm">
                        <p className="ck-customize-gongn01Txt01">
                            <span className = "xinghua">*</span>应用后直接在移动端保存显示
                        </p> 
                        <p className="ck-customize-gongn01Txt01">
                            <span className = "xinghua">*</span>取消后新增的内容不再保存
                        </p> 

                        <div className = "ck-customizeBtn clearfix">
                            <button className = "ck-customizeBtnL" onClick = {this.handleApply.bind(this)}>应用</button>
                            <button className = "ck-customizeBtnR" onClick = {this.handleCancle.bind(this)}>取消</button>
                        </div>
                    </div>
                </div>
            )
        }else if(currentTabIndex==1){
             const {$$mapState} = this.props;
             let editColumnsOptions = this.props.$$mapState.toJS().editColumnsOptions
            /*只展示从后台拿到的启用状态的选项*/
             let showColumnsOptions = []
             if(editColumnsOptions.length ==1 && editColumnsOptions[0].optionInfor == ''){
                showColumnsOptions = [{optionInfor:'请选择',status:'启用'}]

             }else {
                 editColumnsOptions.map((r, i) => {
                    if (r.status =='启用') {
                        return showColumnsOptions.push(r)
                    }else{
                        showColumnsOptions = [{optionInfor:'请选择',status:'启用'}]
                    }
                })
             }

            return(
                <div className = "ck-customize-CntMian">
                    <ul className = "ck-customize-Txt01 clearfix">
                        <li>字段名称：{selectedRow["col_name"]}</li>
                        <li>字段类型：{selectedRow["col_type"]}</li>
                        <li>是否必填：{selectedRow["col_IsRequired"]=="是"?"必填":"不必填"}</li>
                    </ul>
                    <div className = "ck-customize-gongn02">
                        <ul className = "ck-customize-gongn02Tit clearfix">
                            <li className = "ck-customize02Options">选项信息</li>
                            <li className="ck-customize02Zt">状态</li>
                        </ul>
                        <ul className = "ck-customize-gongn02cnt clearfix">
                            {
                                showColumnsOptions.map((opt,i)=>{
                                    if(opt.optionInfor){
                                    return (
                                        <li key = {i}>
                                            <div className = "ck-gongn02cnt-first">{opt.optionInfor}</div>
                                            <div className = "ck-gongn02cnt-third">{opt.status}</div>
                                        </li>
                                        )
                                    }
                                })
                            }
                        </ul>
                    </div>
                </div>
            )

        }
    }

	render(){
        return (
            <div className = "ck-customize-CntMian">{this.componentWillUpdate()}</div>
        )
	}
}

export default DivList