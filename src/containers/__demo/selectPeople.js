
/**
 * Created by fuwenfang on 5/4/16.
 */


import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import {Button} from 'antd'

import {
  changeIsMultiselect,
  getPeopleData,
  changeIsShowStatus
} from 'actions/__demo/selectPeople'

import SelectPeople from 'components/Business/SelectPeople'


let getPeopleParams = {
    url: '../actions/__demo/pageOne.json',
    data:{
      page:1,
      rowsPerPage:20,
      keyword:''
    }
}

class selectPeoplePage extends React.Component{

  componentDidMount() {

  }
  handleSelection(){
    const IsMultiselect = 1;//0 单选  1 多选
    const {changeIsMultiselect} = this.props
    changeIsMultiselect(IsMultiselect)
    const {getPeopleData} = this.props
    getPeopleData(getPeopleParams)
  }
  handleChangeOwner(){
    const IsMultiselect = 0;//0 单选  1 多选
    const {changeIsMultiselect} = this.props
    changeIsMultiselect(IsMultiselect)  
    const {getPeopleData} = this.props
    getPeopleData(getPeopleParams)  
  }

  //改变模态层显示状态
  handleChangeStatus(){
    const {changeIsShowStatus} = this.props
    changeIsShowStatus()
  }

  //再次请求数据(下一页、搜索)
  requestPDList(page,value){

    const paramData = {
      page:page,
      rowsPerPage:20,
      keyword:value
    }

    Object.assign(getPeopleParams.data, paramData);

    console.log(getPeopleParams)
    getPeopleData(getPeopleParams)  


  }
  render(){
      const {$$mapState} = this.props
      let peoplePropsData = {}
      peoplePropsData.IsMultiselect = $$mapState.toJS().IsMultiselect
      peoplePropsData.data = $$mapState.toJS().data
      peoplePropsData.selectPeopleModal = $$mapState.toJS().selectPeopleModal

    return (
      <div>
        <Button type="ghost"  onClick = {this.handleSelection.bind(this)}>筛选</Button>
        <Button type="ghost" onClick = {this.handleChangeOwner.bind(this)}>变更</Button>                   
      
        <SelectPeople 
            {...peoplePropsData} 
            handleClickCancle = {this.handleChangeStatus.bind(this)}
            requestPoepleData = {this.requestPDList.bind(this)}
        />
      </div>
    )
  }
}

const mapStateToProps = (state, ownProps) => {

    return {
      $$mapState: state.__demo.selectPeople
    }
}

export default connect(mapStateToProps, {
changeIsMultiselect,
getPeopleData,
changeIsShowStatus,
})(selectPeoplePage)