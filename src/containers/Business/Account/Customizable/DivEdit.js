import { isPlainObject, isFunction, isString } from 'lodash'
import warning from 'fbjs/lib/warning'
import {message,Select } from 'antd';
import reqwest from 'reqwest';

const Option = Select.Option;


class DivEdit extends React.Component{
	constructor(props) {
        super(props)

    }
	handleAddItem(i){
		const {addItem} = this.props;
        const ColumnsOptions = this.props.$$mapState.toJS().localeditColumnsOptions;
		/*最多添加50条信息，不包含系统默认的*/
		let columnArrNoSys = []

		ColumnsOptions.map((r,i)=>{
			if(r.IsSys==0){
				columnArrNoSys.push(r)
			}
		})

		if(columnArrNoSys.length<51){
			addItem(i);
		}else{
	        message.config({
	          top: 250
	        });   			
	        message.warn('最多可添加50条选项');
		}
	}
	handleDeletItem(i){
		const {deletItem} = this.props;
        let ColumnsOptions = this.props.$$mapState.toJS().localeditColumnsOptions;
        const currentDeletedItem = ColumnsOptions[i]
        let IsLast =0
        if(ColumnsOptions.length ==1){
        	IsLast =1
        }

        if(currentDeletedItem.Val){
	        reqwest({
	            url: SCRM.url('/scrmdefined/account/checkEnumAttr'),
	            method: 'post',
	            data: 'params='+JSON.stringify({data:currentDeletedItem}),
	            type: 'json',
	            success: (json) => {
	                if(json.rs){
	                	if(json.data.count == 0){
	                		//未使用可删除

					        deletItem(i,IsLast);
							let  deletedItem  = this.props.$$mapState.toJS().deletedItem;
							ColumnsOptions[i].IsDeleted = 1
							deletedItem.push(ColumnsOptions[i])
							const {collectDeletedItem} = this.props
							collectDeletedItem(deletedItem)                		

	                	}else if(json.data.count > 0){
	                		//已使用不可删除
		                    message.config({
		                      top: 250
		                    });             
		                    message.error(json.data.message);                	
		                }

	                }else{
	                    message.config({
	                      top: 250
	                    });             
	                    message.error(json.error);           
	                }
	            }
	        })
        }else{
					        deletItem(i,IsLast);
							let  deletedItem  = this.props.$$mapState.toJS().deletedItem;
							ColumnsOptions[i].IsDeleted = 1
							deletedItem.push(ColumnsOptions[i])
							const {collectDeletedItem} = this.props
							collectDeletedItem(deletedItem) 
        }










	}
	handleChangeInput(i,e){
		let value = e.currentTarget.value;
		const {changeInputValue} = this.props;
			changeInputValue(i,value)
	}
	handleChangeselect(i,e){
        const ColumnsOptions = this.props.$$mapState.toJS().localeditColumnsOptions[i];
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
		const localeditColumnsOptionsLen = this.props.$$mapState.toJS().localeditColumnsOptions.length
		if(i < localeditColumnsOptionsLen-1){
			DownItem(i)
		}
	}
	handleRepeatData(){
        const ColumnsOptions = this.props.$$mapState.toJS().localeditColumnsOptions;
		let columnsArr = []
		ColumnsOptions.map((r,i)=>{
			if(r.Val!=''){
				columnsArr.push(r.Val)
			}
		})
		//判断所填选项是否有重复值
		let nary=columnsArr.sort();

		//定义一个变量记录
		let isRepeat = 1
		for(let i=0;i<columnsArr.length;i++){

			if (nary[i]==nary[i+1]){

				isRepeat = 0

		        message.config({
		          top: 250
		        });    			
		        message.warn('选项信息不允许重复');

				break;

			}

		}

	}
	render(){
		let localeditColumnsOptions = this.props.$$mapState.toJS().localeditColumnsOptions

		const lastLen = localeditColumnsOptions.length-1

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
								localeditColumnsOptions.map((opt,i)=>{
									if(opt.IsDeleted==0){
										return (
											<li key = {i}>
						                         <div className="Sequence clearfix">
							                          <div className={i==0?'Sequence-none':'Sequence-top'} onClick = {this.handleItemUp.bind(this,i)}></div>
							                          <div className={i==lastLen?'Sequence-none02':'Sequence-bottom'} onClick = {this.handleItemDown.bind(this,i)}></div>
						                         </div>
												<div className = "ck-gongncnt-first">
													<input type = 'text' value = {opt.Val} placeholder = "最多输入10个汉字"  
													 onChange = {this.handleChangeInput.bind(this,i)} 
													 onBlur = {this.handleRepeatData.bind(this)}
													 readOnly = {opt.IsSys =='1'?true:false}/>
												</div>
												<div className = "ck-gongncnt-second clearfix">
													<button className='add' onClick = {this.handleAddItem.bind(this,i)}>+</button>
													<button className={opt.IsSys=='1'?'disableCut':'cut'} disabled = {opt.IsSys=='1'?'disabled':''} onClick = {this.handleDeletItem.bind(this,i)}>-</button>
												</div>
												<div className = "ck-gongncnt-third">
													 <Select  value = {opt.IsStop==0?'启用':'未启用'} style={{ width: 90 }} 
													 onChange={this.handleChangeselect.bind(this,i)} disabled = {opt.IsSys=='1'?true:false}>
													      <Option value = "1" >未启用</Option>
													      <Option value = "0" >启用</Option>
													  </Select>
												</div>
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

export default DivEdit