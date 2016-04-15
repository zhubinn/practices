import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import Search from 'components/Search/Search.less'

import PeopleTitle from 'components/Search/PeopleTitle'
import PeopleSearch from 'components/Search/PeopleSearch'
import PeopleList from 'components/Search/PeopleList'
import ConfirmForm from 'components/Search/ConfirmForm'

import { getPeopleData,clickPeopleDate,clickPeopleTag ,
	deletePeopleTag,searchPeopleData,submitData,handleCancle,loadNextPage,handleChangeInput} from 'actions/SearchPeople/searchPeople'


class SearchPage extends React.Component{
	render(){
		const {dispatch, getPeopleData, clickPeopleDate,clickPeopleTag ,deletePeopleTag,
			searchPeopleData,submitData,handleCancle,loadNextPage,handleChangeInput,$$mapState } = this.props;
		const isShow  = $$mapState.toJS().IsShow;
		const IsMultiselect = $$mapState.toJS().IsMultiselect;
			if(isShow){
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

const $$mapStateToProps = (state, ownProps) => {
    return {
        $$mapState: state.searchPeople
    }

}

export default connect($$mapStateToProps, {
    getPeopleData,
    clickPeopleDate,
    clickPeopleTag,
    deletePeopleTag,
    searchPeopleData,
    submitData,
    handleCancle,
    loadNextPage,
    handleChangeInput,
})(SearchPage)