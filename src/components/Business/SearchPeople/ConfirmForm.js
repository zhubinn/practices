import React ,{ Component, PropTypes ,findDOMNode} from 'react'
import { message, Button } from 'antd';

export  default  class ConfirmForm extends Component{
	constructor(props) {
        super(props)
    }	
    clickOkBtn(e){
    	
    	const {submitData,$$searchPeople} = this.props;
        const source = $$searchPeople.toJS().source
        let confirmOkParams = $$searchPeople.get(source).toJS().confirmOkParams;
    	const choseData = $$searchPeople.get(source).toJS().itemdata;
    	let choseNameData = [];
    	for(let i = 0; i<choseData.length;i++){
    		choseNameData.push(choseData[i].ownerId);
    	}
    	Object.assign(confirmOkParams.data.filter, choseNameData)
        if(choseNameData.length == 0){
            message.config({
              top: 250
            });            
            message.warn('请您先选择人员');
        }else{
            submitData(confirmOkParams,source);
        }
    }

    clickCancleBtn(){
        const source = this.props.$$searchPeople.toJS().source
        const {handleCancle} = this.props;
        handleCancle(source);
    }
    
	render(){
		return (
			<div className = "m_btn01 clearfix">
	            <div className="m_btn01L" onClick = {this.clickOkBtn.bind(this)}>确认</div>
	            <div className="m_btn01R" onClick = {this.clickCancleBtn.bind(this)}>取消</div>
	        </div>
		)
	}	
} 