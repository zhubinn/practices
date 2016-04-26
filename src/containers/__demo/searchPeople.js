/**
 * Created by fuwenfang on 4/7/16.
 */


import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'


import SearchPeople from 'components/Business/searchPeople'
import  { selectPeopelinitSource}  from 'actions/Component/searchPeople'
import {changeIsMultiselect, getPeopleData,clickPeopleDate,clickPeopleTag ,
  deletePeopleTag,searchPeopleData,submitData,handleCancle,
  loadNextPage,handleChangeInput} from 'actions/Component/searchPeople'
const DATA_SELECTPEOPLE_SOURCE = 'Account_static'


let selectPeopleParams = {
    url: 'http://esn.yangtianming.com/setting/scrm/getSelectList/VISITID/1',
    data:{
      page:1
    }
}



/*给筛选变更设定一个flag*/
let flag = false;

class AccountStatistic extends React.Component{
  componentDidMount() {
      this.props.selectPeopelinitSource(DATA_SELECTPEOPLE_SOURCE)
  }
  handleSelection(){
    flag = true
    const IsMultiselect = 1;
    this.props.changeIsMultiselect(IsMultiselect)
    this.props.getPeopleData(selectPeopleParams, DATA_SELECTPEOPLE_SOURCE)
  }
  handleChange(){
    flag = true
    const IsMultiselect = 0;
    this.props.changeIsMultiselect(IsMultiselect)
    this.props.getPeopleData(selectPeopleParams, DATA_SELECTPEOPLE_SOURCE)
  }
  render(){
    let IsModalShow = false
    let IsMultiselect = 1
    if(!flag){
       IsModalShow = this.props.$$searchPeople.get('default').toJS().IsShow
       IsMultiselect = this.props.$$searchPeople.get('default').toJS().IsMultiselect

    }else{
       IsModalShow = this.props.$$searchPeople.get('Account_static').toJS().IsShow
       IsMultiselect = this.props.$$searchPeople.get('Account_static').toJS().IsMultiselect
    }
    const { $$searchPeople } =  this.props; 

    const { getPeopleData,clickPeopleDate,clickPeopleTag ,deletePeopleTag,searchPeopleData,submitData,handleCancle,
  loadNextPage,handleChangeInput}  = this.props;

    return (
      <div>
        <button onClick = {this.handleSelection.bind(this)}>筛选</button>
        <button onClick = {this.handleChange.bind(this)}>变更</button>
        <SearchPeople 
          clickPeopleDate = {clickPeopleDate}
          clickPeopleTag = {clickPeopleTag} 
          deletePeopleTag= {deletePeopleTag}
          searchPeopleData ={searchPeopleData}
          submitData= {submitData}
          handleCancle= {handleCancle}
          loadNextPage= {loadNextPage}
          handleChangeInput= {handleChangeInput}
          IsModalShow= {IsModalShow}
          IsMultiselect = {IsMultiselect}
          $$searchPeople = {$$searchPeople}
          />
          
          
      </div>
    )
  }
}

const mapStateToProps = (state, ownProps) => {

    return {
        $$searchPeople: state.components.searchPeople,
        $$account_statistic: state.business.account_statistic,
        dataTable: state.components.dataTable,
    }
}

export default connect(mapStateToProps, {
  selectPeopelinitSource,
  changeIsMultiselect,
  getPeopleData,
  getPeopleData,
  clickPeopleDate,
  clickPeopleTag ,
  deletePeopleTag,
  searchPeopleData,
  submitData,
  handleCancle,
  loadNextPage,
  handleChangeInput,

})(AccountStatistic)