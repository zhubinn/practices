import React ,{ Component, PropTypes ,findDOMNode} from 'react'


export  default class PeopleSearch extends Component{
	constructor(props) {
        super(props)
        this.handleTag = this.handleTag.bind(this)
        //this.handleDown = this.handleDown.bind(this)

    }
	handleTag(i){
		let nameItemData = this.props.$$searchPeople.get('Account_static').toJS().itemdata;
		let newareapadding = this.props.$$searchPeople.get('Account_static').toJS().areapadding;
		
		newareapadding = newareapadding -nameItemData[i].itemWidth;
		nameItemData.splice(i,1);
		const { clickPeopleTag } = this.props;

		clickPeopleTag({"itemdata":nameItemData,"areapadding":newareapadding});

	}
	handleDown(e){
		let nameItemData = this.props.$$searchPeople.get('Account_static').toJS().itemdata;
		let newareapadding = this.props.$$searchPeople.get('Account_static').toJS().areapadding;
		const textValue = e.currentTarget.value;
		if(e.keyCode == 8&&textValue.length == 0){
			newareapadding = newareapadding -nameItemData[nameItemData.length-1].itemWidth;
			nameItemData.splice(nameItemData.length-1,1);
			const { deletePeopleTag } = this.props;
			deletePeopleTag({"itemdata":nameItemData,"areapadding":newareapadding});

		}
		if(nameItemData.length == 0 && e.keyCode == 8){
			//TODO 
			console.log("当删除最后一个tag时重新拿到全部数据")

		}
	}
	handleUp(e){
		const textValue = e.currentTarget.value;
		const nameItemData = this.props.$$searchPeople.get('Account_static').toJS().itemdata;
		let searchParams = {
		    url: 'http://esn.fuwenfang.com/setting/scrm/getSelectList/VISITID/1',
		    data:{
		      page:1,
		      keyword:textValue,
		    }
		}
	    let that = e.target;
	    clearTimeout(that.timer);

	    that.timer = setTimeout(
	        function()
	        {
	            delete that.timer;
	            // why delete? it is about high performance?
					const { searchPeopleData} = this.props;
					//当textValue为空的时候，搜索的结果默认为初始数据
					if(textValue.length == 0){
						//TODO
						if(nameItemData.length == 0){
							searchPeopleData(searchParams)
						}
					}else{
							searchPeopleData(searchParams)
					}

	        }.bind(this),
	        500
	    );
			
	}
	changeInput(e){
		const value = e.currentTarget.value;
		const {handleChangeInput} = this.props;
		handleChangeInput(value)
	}
	render(){
		const nameItemData = this.props.$$searchPeople.get('Account_static').toJS().itemdata;
		const arreapadding = this.props.$$searchPeople.get('Account_static').toJS().areapadding;
		const value = this.props.$$searchPeople.get('Account_static').toJS().textValue;
		return (
			<div className="mbox784_textwrap">
	          <textarea id="textarea" rows="1" className="M01text" 
	          style={{paddingLeft: (10+arreapadding) + 'px'}} 
	          onKeyDown = {this.handleDown.bind(this)} onKeyUp = {this.handleUp.bind(this)}
			   value = {value} onChange = {this.changeInput.bind(this)}></textarea>
	          <p className = "dev-tags">
		          {
		          	nameItemData.map((item,i)=>{
		          		return (
            				<span className ="nameSpan"  key = {i} onClick = {this.handleTag.bind(this,i)}>{item.itemName}
            					<a className = "tagClose"></a>
            				</span>
            				)
		          	})
		          }
	          </p>
	        </div>
		)
	}	
} 
