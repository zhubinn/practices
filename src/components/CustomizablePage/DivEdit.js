import { isPlainObject, isFunction, isString } from 'lodash'
import warning from 'fbjs/lib/warning'

class DivEdit extends React.Component{
	constructor(props) {
        super(props)

    }
	handleAddItem(i){
		const {addItem} = this.props;
		addItem(i);
	}
	handleDeletItem(i){
		const {deletItem} = this.props;
		deletItem(i);
	}
	handleChangeInput(i,e){
		const textValue = e.currentTarget.value;
		const {changeInputValue} = this.props;
		changeInputValue(i,textValue);
	}
	handleChangeselect(i,e){
        const ColumnsOptions = this.props.mapState.toJS().editColumnsOptions[i];
        const {ChangeStatus}=this.props;
        ColumnsOptions['status']=='启用'?ChangeStatus({'index':i,'status':'未启用'}):ChangeStatus({'index':i,'status':'启用'})
		
	}

	render(){
		const editColumnsOptions = this.props.mapState.toJS().editColumnsOptions
		return (
			<div>
				<ul className = "editColumnsHead">
					<li className = "optionInfor">选项信息</li>
					<li className = "operation">操作</li>
					<li className="status">状态</li>
				</ul>
				
				<ul className = "editColumnsCon">
					{

						editColumnsOptions.map((opt,i)=>{

						return (
							<li key = {i}>

								<div className = "optionInforInput">
									<input type = 'text' value = {opt.optionInfor} placeholder = "输入文字"  onChange = {this.handleChangeInput.bind(this,i)} />
								</div>
								<div className = "operationBtn">
									<button onClick = {this.handleAddItem.bind(this,i)}>+</button><button disabled = {opt.IsDelete=='否'?'disabled':''} onClick = {this.handleDeletItem.bind(this,i)}>-</button>
								</div>
								<div className = "statusSelect">
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
		)
	}
}

export default DivEdit