import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import randomString  from 'random-string'

import Search from './Search.less'

import PeopleTitle from './PeopleTitle'
import PeopleSearch from './PeopleSearch'
import PeopleList from './PeopleList'
import ConfirmForm from './ConfirmForm'

import { getPeopleData,clickPeopleDate,clickPeopleTag ,
	deletePeopleTag,searchPeopleData,submitData,handleCancle,
	loadNextPage,handleChangeInput,changePageNum} from 'actions/Component/SearchPeople'


export default class SearchPage extends React.Component{
    constructor() {
        super()
        this.identity = 'searchPeopleCom_'+ randomString()
    }

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
				changePageNum,
				$$searchPeople 
			} = this.props;
			if(IsModalShow){
				return (
					<div className = "mbox_BombBoxBg">
					  <div className="mbox_BombBox">
						 <div className = "mbox784" >
					        <PeopleTitle           />
					        <PeopleSearch 
						        $$searchPeople = {$$searchPeople} 
						        clickPeopleTag ={clickPeopleTag} 
						        deletePeopleTag={deletePeopleTag} 
						        searchPeopleData = {searchPeopleData} 
						        handleChangeInput={handleChangeInput}
					        />
					        <PeopleList 
						        getPeopleData = {getPeopleData} 
						        $$searchPeople = {$$searchPeople} 
						        clickPeopleDate={clickPeopleDate} 
						        loadNextPage ={loadNextPage}
						        changePageNum={changePageNum}
					        />
					        <div style={{display:IsMultiselect==0?'block':'none'}}>您已经选择2个客户</div>
					        <ConfirmForm 
						        submitData={submitData} 
						        handleCancle = {handleCancle} 
						        $$searchPeople = {$$searchPeople}
					        />
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

