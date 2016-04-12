import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import Search from 'components/Search/Search.less'

import PeopleTitle from 'components/Search/PeopleTitle'
import PeopleSearch from 'components/Search/PeopleSearch'
import PeopleList from 'components/Search/PeopleList'
import ConfirmForm from 'components/Search/ConfirmForm'

import { getPeopleData,clickPeopleDate,clickPeopleTag ,deletePeopleTag,searchPeopleData,submitData,loadNextPage} from 'actions/SearchPeople/searchPeople'


class SearchPage extends React.Component{
	render(){
		const {dispatch, getPeopleData, clickPeopleDate,clickPeopleTag ,deletePeopleTag,
			searchPeopleData,submitData,loadNextPage,mapState } = this.props;
		const isShow  = mapState.toJS().IsShow;
		return (
		  <div className="mbox_BombBox " style={{display: isShow? 'block':'none'}}>
			 <div className = "mbox784" >
		        <PeopleTitle/>
		        <PeopleSearch mapState = {mapState} clickPeopleTag ={clickPeopleTag} deletePeopleTag={deletePeopleTag} searchPeopleData = {searchPeopleData}/>
		        <PeopleList getPeopleData = {getPeopleData} mapState = {mapState} clickPeopleDate={clickPeopleDate} loadNextPage ={loadNextPage}/>
		        <ConfirmForm submitData={submitData} mapState = {mapState}/>
		      </div>
	      </div>
		)
	}
}

const mapStateToProps = (state, ownProps) => {
    return {
        mapState: state.searchPeople
    }

}

export default connect(mapStateToProps, {
    getPeopleData,
    clickPeopleDate,
    clickPeopleTag,
    deletePeopleTag,
    searchPeopleData,
    submitData,
    loadNextPage
})(SearchPage)