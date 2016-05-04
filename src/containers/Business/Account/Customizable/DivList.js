import { isPlainObject, isFunction, isString } from 'lodash'
import warning from 'fbjs/lib/warning'
import DivEdit from './DivEdit'
import {message } from 'antd';


class DivList extends React.Component{
	constructor(props) {
        super(props)
        this.handleCheckbox = this.handleCheckbox.bind(this)
    }
    handleCheckbox(){
        const selectedRow = this.props.$$mapState.toJS().selectedRow;
        const {changeIsRequired}=this.props;
        selectedRow['IsMust']==1?changeIsRequired({'IsMust':0}):changeIsRequired({'IsMust':1})
    }
    handleApply(){
        const editColumnsOptions = this.props.$$mapState.toJS().editColumnsOptions
        //数据可能需要过滤 如果没有任何选项就应用  则提示要先选择应用
        const {clickapplyBtn} = this.props
        if(editColumnsOptions.length ==1 && editColumnsOptions[0].Val == ''){
            message.warn('请填写选项信息');
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
                        <li>字段名称：{selectedRow["Label"]}</li>
                        <li>字段类型：{selectedRow["AttrType"]==13?'下拉单选':''}</li>
                        <li>是否必填：<input type = "checkbox" ref="checkboxInput" 
                        defaultChecked={selectedRow['IsMust']==1?'checked':''} onChange = {this.handleCheckbox}/>必填</li>
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
             let servereditColumnsOptions = this.props.$$mapState.toJS().servereditColumnsOptions
            /*只展示从后台拿到的启用状态的选项*/
             let showColumnsOptions = []
             if(servereditColumnsOptions.length ==1 && servereditColumnsOptions[0].Val == ''){
                showColumnsOptions = [{Val:'请选择',IsStop:0}]

             }else {
                 servereditColumnsOptions.map((r, i) => {
                    if (r.IsStop ==0) {
                        return showColumnsOptions.push(r)
                    }
                })
                 if(showColumnsOptions.length == 0){
                    showColumnsOptions = [{Val:'请选择',IsStop:0}]
                 }
             }

            return(
                <div className = "ck-customize-CntMian">
                    <ul className = "ck-customize-Txt01 clearfix">
                        <li>字段名称：{selectedRow["Label"]}</li>
                        <li>字段类型：{selectedRow["AttrType"]==13?'下拉单选':''}</li>
                        <li>是否必填：{selectedRow["IsMust"]==1?"必填":"不必填"}</li>
                    </ul>
                    <div className = "ck-customize-gongn02">
                        <ul className = "ck-customize-gongn02Tit clearfix">
                            <li className = "ck-customize02Options">选项信息</li>
                            <li className="ck-customize02Zt">状态</li>
                        </ul>
                        <div className = "ck-customize-gongn02cntWrap">
                            <ul className = "ck-customize-gongn02cnt clearfix">
                                {
                                    showColumnsOptions.map((opt,i)=>{
                                        if(opt.Val){
                                        return (
                                            <li key = {i}>
                                                <div className = "ck-gongn02cnt-first">{opt.Val}</div>
                                                <div className = "ck-gongn02cnt-third">{opt.IsStop==1?'未启用':'启用'}</div>
                                            </li>
                                            )
                                        }
                                    })
                                }
                            </ul>
                        </div>
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