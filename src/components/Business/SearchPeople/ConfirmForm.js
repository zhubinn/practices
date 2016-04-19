import React ,{ Component, PropTypes ,findDOMNode} from 'react'


export  default  class ConfirmForm extends Component{
	constructor(props) {
        super(props)
        //this.handleDown = this.handleDown.bind(this)
    }	
    clickOkBtn(e){
    	
    	const {submitData,$$searchPeople} = this.props;
    	const choseData = $$searchPeople.get('Account_static').toJS().itemdata;
    	let choseNameData = [];
    	for(let i = 0; i<choseData.length;i++){
    		choseNameData.push(choseData[i].ownerId);
    	}
    	
    	submitData({"chosedNameData":choseNameData});
    }

    clickCancleBtn(){
        const {handleCancle} = this.props;
        handleCancle();
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