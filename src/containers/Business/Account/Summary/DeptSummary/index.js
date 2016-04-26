
/**
 * Created by fuwenfang on 4/7/16.
 */


import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'


import SearchPeople from 'components/Business/searchPeople'
import  { selectPeopelinitSource}  from 'actions/Component/searchPeople'
import {changeIsMultiselect, getPeopleData,clickPeopleDate,clickPeopleTag ,
  deletePeopleTag,searchPeopleData,submitData,handleCancle,
  loadNextPage,handleChangeInput,changePageNum} from 'actions/Component/searchPeople'


let getPeopleParams = {
    url: 'http://esn.fuwenfang.com/setting/scrm/getSelectList/VISITID/1',
    data:{
      page:1,
      rowsPerPage:20,
      keyword:''
    }
}

let confirmOkParams = {
    url: '',//根据需求确认接口地址
    data:{
      filter:[],
      page:1,
      rowsPerPage:20,
      keyword:''
    }
}

/*给筛选变更设定一个flag*/
let flag = false;

class AccountDeptSummaryPage extends React.Component{

    componentDidMount() {
      const  id  = this.refs.searchPeopleCom.identity
      this.props.selectPeopelinitSource(id,getPeopleParams,confirmOkParams)
  }
  handleSelection(){
    flag = true
    const IsMultiselect = 1;
    const source = this.props.$$searchPeople.toJS().source
    this.props.changeIsMultiselect(IsMultiselect,source)
    this.props.getPeopleData(getPeopleParams, source)
  }
  handleChange(){
    flag = true
    const IsMultiselect = 0;
    const source = this.props.$$searchPeople.toJS().source
    this.props.changeIsMultiselect(IsMultiselect,source)
    this.props.getPeopleData(getPeopleParams, source)
  }
  render(){
    let IsModalShow = false
    let IsMultiselect = 1
    const source = this.props.$$searchPeople.toJS().source
    if(!flag){
       IsModalShow = this.props.$$searchPeople.get('default').toJS().IsShow
       IsMultiselect = this.props.$$searchPeople.get('default').toJS().IsMultiselect

    }else{
       IsModalShow = this.props.$$searchPeople.get(source).toJS().IsShow
       IsMultiselect = this.props.$$searchPeople.get(source).toJS().IsMultiselect
    }
    const {$$searchPeople} =  this.props; 
    const { getPeopleData,clickPeopleDate,clickPeopleTag ,deletePeopleTag,searchPeopleData,submitData,handleCancle,
  loadNextPage,handleChangeInput,changePageNum}  = this.props;

    return (
      <div>
        <button onClick = {this.handleSelection.bind(this)}>筛选</button>
        <button onClick = {this.handleChange.bind(this)}>变更</button>
        <SearchPeople ref = "searchPeopleCom"
          clickPeopleDate = {clickPeopleDate}
          clickPeopleTag = {clickPeopleTag} 
          deletePeopleTag= {deletePeopleTag}
          searchPeopleData ={searchPeopleData}
          submitData= {submitData}
          handleCancle= {handleCancle}
          loadNextPage= {loadNextPage}
          changePageNum={changePageNum}
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
  changePageNum

})(AccountDeptSummaryPage)