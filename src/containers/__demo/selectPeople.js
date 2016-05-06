
/**
 * Created by fuwenfang on 5/4/16.
 */


import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import { Modal, Button } from 'antd';

import {
  changeIsMultiselect,
  getPeopleData,
  changeIsShowStatus,
  getNextPagePeopleData
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

  //筛选选人
  handleSelection(){
    const IsMultiselect = 1;//0 单选  1 多选
    const {changeIsMultiselect} = this.props
    changeIsMultiselect(IsMultiselect)
    const {getPeopleData} = this.props
    getPeopleData(getPeopleParams)
  }

  //变更负责人选人
  handleChangeOwner(){
    const IsMultiselect = 0;//0 单选  1 多选
    const {changeIsMultiselect} = this.props
    changeIsMultiselect(IsMultiselect)  
    const {getPeopleData} = this.props
    getPeopleData(getPeopleParams)  
  }

  //点击取消按钮改变模态层显示状态
  handleChangeStatus(){
    const {changeIsShowStatus} = this.props
    changeIsShowStatus()
  }


  //点击确定按钮获取所选人员信息
  getFilterData(PeopleInfor){
    console.log('所选人员信息')
    console.log(PeopleInfor)
    const {changeIsShowStatus} = this.props
    changeIsShowStatus()
  }

  //再次请求数据(按关键词搜索)
  requestPDList(page,value){

    const paramData = {
      page:page,
      rowsPerPage:20,
      keyword:value
    }

    Object.assign(getPeopleParams.data, paramData);

    console.log('搜索关键词请求')
    const {getPeopleData} = this.props
    getPeopleData(getPeopleParams)  


  }


  //请求人员组件的下一页数据
  requestNextPoepleData(page,value){


    const paramData = {
      page:page,
      rowsPerPage:20,
      keyword:value
    }

    Object.assign(getPeopleParams.data, paramData);

    console.log('请求下一页数据')
    const {getNextPagePeopleData} = this.props
    getNextPagePeopleData(getPeopleParams)  


  }




  render(){
      const {$$mapState} = this.props
      let peoplePropsData = {}
      peoplePropsData.IsMultiselect = $$mapState.toJS().IsMultiselect
      peoplePropsData.data = $$mapState.toJS().data
      peoplePropsData.selectPeopleModal = $$mapState.toJS().selectPeopleModal

    return (
      <div >
        <Button type="ghost"  onClick = {this.handleSelection.bind(this)}>筛选</Button>
        <Button type="ghost" onClick = {this.handleChangeOwner.bind(this)}>变更</Button>                   
      
            <SelectPeople 
                {...peoplePropsData} 
                handleClickConfirm={this.getFilterData.bind(this)} 
                handleClickCancle={this.handleChangeStatus.bind(this)}
                requestData = {this.requestPDList.bind(this)}
                requestNextPoepleData = {this.requestNextPoepleData.bind(this)}
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
getNextPagePeopleData,
})(selectPeoplePage)