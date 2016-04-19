import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import Search from './Search.less'

import PeopleTitle from './PeopleTitle'
import PeopleSearch from './PeopleSearch'
import PeopleList from './PeopleList'
import ConfirmForm from './ConfirmForm'

import { getPeopleData,clickPeopleDate,clickPeopleTag ,
	deletePeopleTag,searchPeopleData,submitData,handleCancle,
	loadNextPage,handleChangeInput} from 'actions/Component/SearchPeople'


class SearchPage extends React.Component{
	render(){
		const {	getPeopleData, 
				clickPeopleDate,
				clickPeopleTag ,
				deletePeopleTag,
				searchPeopleData,
				submitData,
				handleCancle,
				loadNextPage,
				handleChangeInput,
				IsMultiselect,
				IsModalShow,
				$$mapState 
			} = this.props;

			if(IsModalShow){
				return (
					<div className = "mbox_BombBoxBg">
					  <div className="mbox_BombBox">
						 <div className = "mbox784" >
					        <PeopleTitle/>
					        <PeopleSearch $$mapState = {$$mapState} clickPeopleTag ={clickPeopleTag} deletePeopleTag={deletePeopleTag} 
					        searchPeopleData = {searchPeopleData} handleChangeInput={handleChangeInput}/>
					        <PeopleList getPeopleData = {getPeopleData} $$mapState = {$$mapState} clickPeopleDate={clickPeopleDate} loadNextPage ={loadNextPage}/>
					        <div style={{display:IsMultiselect==0?'block':'none'}}>您已经选择2个客户</div>
					        <ConfirmForm submitData={submitData} handleCancle = {handleCancle} $$mapState = {$$mapState}/>
					      </div>
				      </div>
					</div>
				)
			}else{
				return(
					<div></div>
					)
			}
	}
}

