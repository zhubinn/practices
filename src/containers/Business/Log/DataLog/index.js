
/**
 * Created by ytm on 4/7/16.
 */

import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import classNames from 'classnames'
import { Row, Col, Table, Radio, Button, Input, Pagination, Modal} from 'antd'
import {handleInputChange, getDataLogData, pageSizeChange}  from 'actions/business/Log/DataLog'

//引入选人组件
import SearchPeople from 'components/Business/searchPeople'
import { selectPeopelinitSource }  from 'actions/Component/searchPeople'
import {
  changeIsMultiselect, 
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
} from 'actions/Component/searchPeople'

import 'antd/lib/index.css'

//table列表数据接口
let DataLogParams = {
    url: 'http://esn.yangtianming.com/front/js/scrm/fakeData/logData.php',
    //url: 'http://esn.yangtianming.com/scrmoplog/index/oplogIndex',
    data: {
        page: 1,
        pageSize: 10
    }
}

//引入选人组件接口
let getPeopleParams = {
    url: 'http://esn.yangtianming.com/setting/scrm/getSelectList/VISITID/1',
    data:{
      page:1,
      rowsPerPage:20,
      keyword:''
    }
}

/*给筛选变更设定一个flag*/
let flag = false;
// let confirmOkParams = {
//     url: '',//根据需求确认接口地址
//     data:{
//       filter:[],
//       page:1,
//       rowsPerPage:20,
//       keyword:''
//     }
// }

class DataLog extends React.Component {
    constructor(props) {
      super(props)
      this.searchInputChange = this.searchInputChange.bind(this)
      this.exportConfirm = this.exportConfirm.bind(this)
      this.exportHandleOkClick = this.exportHandleOkClick.bind(this)
      this.searchTimer;
    }

    componentDidMount() {
      this.props.getDataLogData(DataLogParams);

      //引入选人组件
      const  id  = this.refs.searchPeopleCom.identity
      this.props.selectPeopelinitSource(id, getPeopleParams, DataLogParams)
    }

    searchInputChange() {
      let val = this.refs.seachVal.getDOMNode().value;
      alert(val)
      clearTimeout(this.searchTimer)
      this.searchTimer = setTimeout(() => { this.props.getDataLogData(DataLogParams) }, 300);
    }

    onShowSizeChange(current, pageSize) {
      DataLogParams.data.page = current;
      DataLogParams.data.pageSize = pageSize;
      this.props.pageSizeChange({current, pageSize});
    }
    
    pageOnChange(page){
      alert(page)
      DataLogParams.data.page = page;
      this.props.getDataLogData(DataLogParams);
    }

    showPageTotal(total){
      return `共 ${total} 条`;
    }

    exportConfirm() {
      Modal.confirm({
        title: '您是否确认导出？',
        content: '导出Excel表。',
        onOk() {
          alert('确定');
        },
        onCancel() {}
      });
    }

    //引入选人组件方法
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

    exportHandleOkClick(filter){
      console.log(filter)
      DataLogParams.data.filter = filter;
      this.props.getDataLogData(DataLogParams);
    }

    render() {
        //table数据配置
        const { $$logState } = this.props;
        const dataSource = $$logState.get('tableData').get('data').get('Data').toJS();
        const columns = $$logState.get('tableColumns').toJS();

        //分页配置
        const pageSize = $$logState.get('tableData').get('data').get('PageRow');
        const pageTotal = $$logState.get('tableData').get('data').get('Total');
        const pageCurrent = $$logState.get('tableData').get('data').get('CurrentPage');
        const pagination = {
          current: pageCurrent,
          total: pageTotal,
          pageSize:pageSize,
          showSizeChanger: true,
          showQuickJumper: true,
          onShowSizeChange: this.onShowSizeChange.bind(this),
          onChange: this.pageOnChange.bind(this),
          showTotal: this.showPageTotal
        };

        //选人组件配置
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
          const { 
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
          }  = this.props;

        return (
            <div  style = {{marginLeft: '20px'}} >
              <Row>
                <Col span="16">
                  <input placeholder="请输入.." className="Hightsearch_input" style={{ width: 220 }} ref = "seachVal"/>
                  <Button type="primary" onClick = {this.searchInputChange}>搜索</Button>
                </Col>
                <Col span="6">
                  <Button type="primary" style = {{marginRight: '10px'}}  onClick = {this.handleSelection.bind(this)}>筛选</Button>
                  <Button type="ghost" onClick = {this.exportConfirm}>导出EXCEL</Button>
                </Col>
              </Row>
              <Table dataSource={dataSource} columns={columns} pagination={pagination}/>
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
                parentHandleClick = {this.exportHandleOkClick}
              />
            </div>
        )
    }
}

const mapStateToProps = (state, ownProps) => {
    return {
      $$searchPeople: state.components.searchPeople,
      $$logState: state.business.datalog
    }
}

export default connect(mapStateToProps, {
    getDataLogData,
    handleInputChange,
    pageSizeChange,

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
})(DataLog)