import React ,{ Component, PropTypes ,findDOMNode} from 'react'


export  default class PeopleSearch extends Component{
	constructor(props) {
        super(props)
        this.handleTag = this.handleTag.bind(this)
        //this.handleDown = this.handleDown.bind(this)
    }	
	handleTag(i){
		let nameItemData = this.props.mapState.toJS().itemdata;
		let newareapadding = this.props.mapState.toJS().areapadding;
		
		newareapadding = newareapadding -nameItemData[i].itemWidth;
		nameItemData.splice(i,1);
		const { clickPeopleTag } = this.props;

		clickPeopleTag({"itemdata":nameItemData,"areapadding":newareapadding});

	}
	handleDown(e){
		let nameItemData = this.props.mapState.toJS().itemdata;
		let newareapadding = this.props.mapState.toJS().areapadding;
		const textValue = e.currentTarget.value;
		if(e.keyCode == 8&&textValue.length == 0){
			newareapadding = newareapadding -nameItemData[nameItemData.length-1].itemWidth;
			nameItemData.splice(nameItemData.length-1,1);
			const { deletePeopleTag } = this.props;
			deletePeopleTag({"itemdata":nameItemData,"areapadding":newareapadding});
		}
	}
	handleUp(e){
		const textValue = e.currentTarget.value;
	    var that = e.target;
	    clearTimeout(that.timer);

	    that.timer = setTimeout(
	        function()
	        {
	            delete that.timer;
	            // why delete? it is about high performance?
	            if(textValue !=0){
					const { searchPeopleData} = this.props;
					searchPeopleData(textValue);
	            }

	        }.bind(this),
	        500
	    );
			
	}
	render(){
		let nameItemData = [];
		nameItemData = this.props.mapState.toJS().itemdata;
		const arreapadding = this.props.mapState.toJS().areapadding;
		return (
			<div className="mbox784_textwrap">
	          <textarea id="textarea" rows="1" className="M01text" 
	          style={{paddingLeft: (10+arreapadding) + 'px'}} 
	          onKeyDown = {this.handleDown.bind(this)} onKeyUp = {this.handleUp.bind(this)}></textarea>
	          <p className = "dev-tags">
		          {
		          	nameItemData.map((item,i)=>{
		          		return (
            				<span className ="nameSpan"  key = {i} onClick = {this.handleTag.bind(this,i)}>{item.itemName	}</span>
		          		)
		          	})
		          }
	          </p>
	        </div>
		)
	}	
} 
