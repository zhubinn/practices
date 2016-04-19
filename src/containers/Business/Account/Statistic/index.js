import fetch from 'isomorphic-fetch'
/**
 * Created by fuwenfang on 4/7/16.
 */


import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import searchPeople from 'components/Business/searchPeople'
import  { initSource}  from 'actions/Component/searchPeople'
import { getPeopleData,clickPeopleDate,clickPeopleTag ,
  deletePeopleTag,searchPeopleData,submitData,handleCancle,
  loadNextPage,handleChangeInput} from 'actions/Component/searchPeople'


const DATA_SELECTPEOPLE_SOURCE = 'Account_static'

let selectPeopleParams = {
    url: 'http://esn.fuwenfang.com/setting/scrm/getSelectList/VISITID/1'
      
}

class AccountStatistic extends React.Component{
    componentDidMount() {
      this.props.initSource(DATA_SELECTPEOPLE_SOURCE)
  }
    handleSelection(){
    this.props.getPeopleData(selectPeopleParams, DATA_SELECTPEOPLE_SOURCE)
  }
  render(){
    const IsModalShow = this.props.$$searchPeople.get('default').toJS().IsShow
    const IsMultiselect = this.props.$$searchPeople.get('default').toJS().IsMultiselect
    const {$$searchPeople} =  this.props; 
    const { getPeopleData,clickPeopleDate,clickPeopleTag ,deletePeopleTag,searchPeopleData,submitData,handleCancle,
  loadNextPage,handleChangeInput}  = this.props;
    return (
      <div>
        <button onClick = {this.handleSelection.bind(this)}>筛选</button><button>变更</button>
        <searchPeople 
          getPeopleData = {getPeopleData} 
          clickPeopleDate = {clickPeopleDate}
          clickPeopleTag = {clickPeopleTag} 
          deletePeopleTag= {deletePeopleTag}
          submitData= {submitData}
          handleCancle= {handleCancle}
          loadNextPage= {loadNextPage}
          handleChangeInput= {handleChangeInput}
          IsModalShow= {IsModalShow}
          IsMultiselect = {IsMultiselect}
          $$searchPeople = {$$searchPeople}
          >
        </searchPeople>
      </div>
    )
  }
}

const mapStateToProps = (state, ownProps) => {

    return {
        $$searchPeople: state.components.searchPeople,
        $$account_statistic: state.business.account_statistic
    }
}

export default connect(mapStateToProps, {
  initSource,
  getPeopleData,
})(AccountStatistic)