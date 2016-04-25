import { isPlainObject, isFunction, isString } from 'lodash'
import warning from 'fbjs/lib/warning'
import {message } from 'antd';

class DivEdit extends React.Component{
	constructor(props) {
        super(props)

    }
	handleAddItem(i){
		const {addItem} = this.props;
        const ColumnsOptions = this.props.$$mapState.toJS().editColumnsOptions;
		/*zanding 20 tiao*/
		if(ColumnsOptions.length<20){
			addItem(i);
		}else{
			message.warn('最多可添加20条选项');
		}
	}
	handleDeletItem(i){
		const {deletItem} = this.props;
        const ColumnsOptions = this.props.$$mapState.toJS().editColumnsOptions;
        let IsLast 
        if(ColumnsOptions.length ==1){
        	IsLast =1
        }
		deletItem(i,IsLast);
	}
	handleChangeInput(i,e){
		const value = e.currentTarget.value;
		const {changeInputValue} = this.props;
		const textValue = value.substr(0,10);
		changeInputValue(i,textValue);
	}
	handleChangeselect(i,e){
        const ColumnsOptions = this.props.$$mapState.toJS().editColumnsOptions[i];
        const {ChangeStatus}=this.props;
        ColumnsOptions['IsStop']==1?ChangeStatus({index:i,IsStop:0}):ChangeStatus({index:i,IsStop:1})
		
	}
	handleItemUp(i){
		const {UpItem} = this.props;
		if(i > 0){
			UpItem(i)
		}
	}
	handleItemDown(i){
		const {DownItem} = this.props;
		const editColumnsOptionsLen = this.props.$$mapState.toJS().editColumnsOptions.length
		if(i < editColumnsOptionsLen-1){
			DownItem(i)
		}
	}
	render(){
		const editColumnsOptions = this.props.$$mapState.toJS().editColumnsOptions
		const lastLen = editColumnsOptions.length-1
		return (
			<div className = "ck-customize-gongn01">
				<ul className = "ck-customize-gongnTit clearfix">
                    <li className="ck-customizeSequence">排序</li>
					<li className = "ck-customizeOptions">选项信息</li>
					<li className = "ck-customizeCz">操作</li>
					<li className="ck-customizeZt">状态</li>
				</ul>
				
				<div className ="ck-customize-gongWrap" >
					<ul className = "ck-customize-gongncnt">
						{

							editColumnsOptions.map((opt,i)=>{

							return (
								<li key = {i}>
			                         <div className="Sequence clearfix">
				                          <div className={i==0?'Sequence-none':'Sequence-top'} onClick = {this.handleItemUp.bind(this,i)}></div>
				                          <div className={i==lastLen?'Sequence-none02':'Sequence-bottom'} onClick = {this.handleItemDown.bind(this,i)}></div>
			                         </div>
									<div className = "ck-gongncnt-first">
										<input type = 'text' value = {opt.Val} placeholder = "输入文字"  onChange = {this.handleChangeInput.bind(this,i)} />
									</div>
									<div className = "ck-gongncnt-second clearfix">
										<button className={i==19?'disableadd':'add'} onClick = {this.handleAddItem.bind(this,i)}>+</button>
										<button className={opt.IsSys=='1'?'disableCut':'cut'} disabled = {opt.IsSys=='1'?'disabled':''} onClick = {this.handleDeletItem.bind(this,i)}>-</button>
									</div>
									<div className = "ck-gongncnt-third">
										<select name = "statusSelect" value = {opt.IsStop} onChange={this.handleChangeselect.bind(this,i)}>
											<option value = "1" >未启用</option>
											<option value = "0" >启用</option>
										</select>
									</div>
								</li>
								)
							})
						}
					</ul>
				</div>	
			</div>
		)
	}
}

export default DivEdit