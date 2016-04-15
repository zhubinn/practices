import { isPlainObject, isFunction, isString } from 'lodash'
import warning from 'fbjs/lib/warning'

class DivEdit extends React.Component{
	constructor(props) {
        super(props)

    }
	handleAddItem(i){
		const {addItem} = this.props;
		/*zanding 20 tiao*/
		if(i<20){
			addItem(i);
		}else{
            layer.msg('选项最多添加20条', {icon: 7}); 
		}
	}
	handleDeletItem(i){
		const {deletItem} = this.props;
		deletItem(i);
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
        ColumnsOptions['status']=='启用'?ChangeStatus({'index':i,'status':'未启用'}):ChangeStatus({'index':i,'status':'启用'})
		
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
										<input type = 'text' value = {opt.optionInfor} placeholder = "输入文字"  onChange = {this.handleChangeInput.bind(this,i)} />
									</div>
									<div className = "ck-gongncnt-second clearfix">
										<button className={i==19?'disableadd':'add'} onClick = {this.handleAddItem.bind(this,i)}>+</button><button className={i==0?'disableCut':'cut'} disabled = {opt.IsDelete=='否'?'disabled':''} onClick = {this.handleDeletItem.bind(this,i)}>-</button>
									</div>
									<div className = "ck-gongncnt-third">
										<select name = "statusSelect" value = {opt.status} onChange={this.handleChangeselect.bind(this,i)}>
											<option value = "启用" >启用</option>
											<option value = "未启用" >未启用</option>
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