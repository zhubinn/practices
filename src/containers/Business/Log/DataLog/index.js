
/**
 * Created by ytm on 4/7/16.
 */

import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import classNames from 'classnames'
import { Row, Col, Table, Radio, Button, Input, Pagination, Modal} from 'antd'
import {handleInputChange, getDataLogData, pageSizeChange}  from 'actions/business/Log/DataLog'

import SearchPeople from 'components/Business/SearchPeople'
import {
  selectPeopelinitSource,
  changeIsMultiselect, 
  getPeopleData,
  clickPeopleDate,
  clickPeopleTag ,
  deletePeopleTag,
  searchPeopleData,
  submitData,
  handleCancle,
  loadNextPage,
  handleChangeInput
} from 'actions/Component/searchPeople'

import 'antd/lib/index.css'

let DataLogParams = {
    url: 'http://esn.yangtianming.com/front/js/scrm/fakeData/logData.php',
    data: {
        page: 1,
        pageSize: 10
    }
}

let selectPeopleParams = {
    url: 'http://esn.yangtianming.com/setting/scrm/getSelectList/VISITID/1',
}


const DATA_SELECTPEOPLE_SOURCE = 'log_filter'
let flag = false;

class DataLog extends React.Component {
    constructor(props) {
      super(props)
      this.handleInputChange = this.handleInputChange.bind(this)
      this.exportConfirm = this.exportConfirm.bind(this)
      this.searchTimer;
      this.state = {};
    }

    componentDidMount() {
      this.props.getDataLogData(DataLogParams);
      //this.props.selectPeopelinitSource(DATA_SELECTPEOPLE_SOURCE)
    }

    handleInputChange() {
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

    handleChange(){
      flag = true
      const IsMultiselect = 0;
      this.props.changeIsMultiselect(IsMultiselect)
      this.props.getPeopleData(selectPeopleParams, DATA_SELECTPEOPLE_SOURCE)
    }

    showfilter() {
      flag = true;
      const IsMultiselect = 1;
      this.props.changeIsMultiselect(IsMultiselect)
      this.props.getPeopleData(selectPeopleParams, DATA_SELECTPEOPLE_SOURCE)
    }

    render() {
        //table数据配置
        const { $$logState } = this.props;

        const dataSource = $$logState.get('dataResult').get('data').toJS();

        const columns = $$logState.get('dataResult').get('columns').toJS();

        const pageSize = $$logState.get('pageData').get('pageSize');

        
        //分页配置
        const pagination = {
          total: dataSource.length,
          showSizeChanger: true,
          showQuickJumper: true,
          pageSize:pageSize,
          onShowSizeChange: this.onShowSizeChange.bind(this),
          onChange: this.pageOnChange.bind(this),
          showTotal: this.showPageTotal
        };

        //选人组件配置
        let IsModalShow = false
        let IsMultiselect = 1
        if(!flag){
           IsModalShow = this.props.$$searchPeople.get('default').toJS().IsShow
           IsMultiselect = this.props.$$searchPeople.get('default').toJS().IsMultiselect

        }else{
           IsModalShow = this.props.$$searchPeople.get('log_filter').toJS().IsShow
           IsMultiselect = this.props.$$searchPeople.get('log_filter').toJS().IsMultiselect
        }
        const { $$searchPeople } =  this.props; 

        const { 
          getPeopleData,
          clickPeopleDate,
          clickPeopleTag ,
          deletePeopleTag,
          searchPeopleData,
          submitData,
          handleCancle,
          loadNextPage,
          handleChangeInput
        }  = this.props;

        return (
            <div  style = {{marginLeft: '20px'}} >
              <Row>
                <Col span="16">
                  <input placeholder="请输入.." className="Hightsearch_input" style={{ width: 220 }} ref = "seachVal"/>
                  <Button type="primary" onClick = {this.handleInputChange}>搜索</Button>
                </Col>
                <Col span="6">
                  <Button type="primary" style = {{marginRight: '10px'}}  onClick = {this.showfilter.bind(this)}>筛选</Button>
                  <Button type="ghost" onClick = {this.exportConfirm}>导出EXCEL</Button>
                </Col>
              </Row>
              <Table dataSource={dataSource} columns={columns} pagination={pagination}/>
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
        $$logState: state.business.datalog,
        $$searchPeople: state.components.searchPeople,
    }
}

export default connect(mapStateToProps, {
    getDataLogData,
    handleInputChange,
    pageSizeChange,

    selectPeopelinitSource,
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
})(DataLog)