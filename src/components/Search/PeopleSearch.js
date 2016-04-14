import React ,{ Component, PropTypes ,findDOMNode} from 'react'


export  default class PeopleSearch extends Component{
	constructor(props) {
        super(props)
        this.handleTag = this.handleTag.bind(this)
        //this.handleDown = this.handleDown.bind(this)

    }
    componentWillUpdate(){
		const isClear = this.props.mapState.toJS().isClear;
		const textarea = this.refs.textarea
		const value = textarea.value;
		if(isClear){
			// textarea.value = "";
		}else {
			// textarea.value = value;
		}
    }
    componentDidMount(prevProps, prevState) {
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
		if(nameItemData.length == 0 && e.keyCode == 8){
			console.log("当删除最后一个tag时重新拿到全部数据")

		}
	}
	handleUp(e){
		const textValue = e.currentTarget.value;
		const nameItemData = this.props.mapState.toJS().itemdata;
	    var that = e.target;
	    clearTimeout(that.timer);

	    that.timer = setTimeout(
	        function()
	        {
	            delete that.timer;
	            // why delete? it is about high performance?
					const { searchPeopleData} = this.props;
					//当textValue为空的时候，搜索的结果默认为初始数据
					if(textValue.length == 0){
						if(nameItemData.length == 0){
							searchPeopleData(textValue)
						}
					}else{
							searchPeopleData(textValue)
					}

	        }.bind(this),
	        500
	    );
			
	}
	render(){
		const nameItemData = this.props.mapState.toJS().itemdata;
		const arreapadding = this.props.mapState.toJS().areapadding;
		return (
			<div className="mbox784_textwrap">
	          <textarea id="textarea" rows="1" className="M01text" 
	          style={{paddingLeft: (10+arreapadding) + 'px'}} 
	          onKeyDown = {this.handleDown.bind(this)} onKeyUp = {this.handleUp.bind(this)}
			  ref = "textarea"></textarea>
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
