
/**
 * Created by ytm on 4/7/16.
 */

import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import classNames from 'classnames'
import { Row, Col, Table, Radio, Button, Input, Pagination, Modal} from 'antd'
import { getFuncLogData, pageSizeChange}  from 'actions/business/Log/FunctionLog'
import 'antd/lib/index.css'

import SearchInput from 'components/Business/SearchInput'
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

//获取table列表数据接口
let FuncLogParams = {
    //url: 'http://esn.yangtianming.com/front/js/scrm/fakeData/funcLog.php',
    url: 'http://esn.yangtianming.com/scrmoplog/index/oplogIndex',
    data: {
        page: 1,
        pageSize: 10,
        keyword:''
    }
};

//引入选人组件接口
let getPeopleParams = {
    url: 'http://esn.yangtianming.com/setting/scrm/getSelectList/VISITID/1',
    data:{
      page:1,
      rowsPerPage:20,
      keyword:''
    }
};

/*给筛选变更设定一个flag, 这个其实就是*/
let flag = false;

class FunctionLog extends React.Component {
    constructor(props) {
      super(props);
      this.searchInputChange = this.searchInputChange.bind(this);
      this.exportConfirm = this.exportConfirm.bind(this);
      this.exportHandleOkClick = this.exportHandleOkClick.bind(this);
      this.searchTimer;
    }

    componentDidMount() {
      //初始获取数据
      this.props.getFuncLogData(FuncLogParams);
      //引入选人组件
      const  id  = this.refs.searchPeopleCom.identity;
      this.props.selectPeopelinitSource(id, getPeopleParams, FuncLogParams);
    }

    searchInputChange(val) {
      FuncLogParams.data.keyword = val;
      clearTimeout(this.searchTimer);
      this.searchTimer = setTimeout(() => { this.props.getFuncLogData(FuncLogParams) }, 300);
    }

    onShowSizeChange(current, pageSize) {
      FuncLogParams.data.page = current;
      FuncLogParams.data.pageSize = pageSize;
      this.props.getFuncLogData(FuncLogParams);
      //this.props.pageSizeChange({current, pageSize});
    }

    pageOnChange(page){
      FuncLogParams.data.page = page;
      this.props.getFuncLogData(FuncLogParams);
    }

    showPageTotal(total){
      return `共 ${total} 条`;
    }

    exportConfirm() {
      Modal.confirm({
        title: '您是否确认导出？',
        content: '导出Excel表。',
        onOk() {
          console.log('确定');
        },
        onCancel() {}
      });
    }

    //引入选人组件方法
    handleSelection(){
      flag = true;
      const IsMultiselect = 1;
      const source = this.props.$$searchPeople.toJS().source;
      this.props.changeIsMultiselect(IsMultiselect,source);
      this.props.getPeopleData(getPeopleParams, source);
    }

    handleChange(){
      flag = true
      const IsMultiselect = 0;
      const source = this.props.$$searchPeople.toJS().source;
      this.props.changeIsMultiselect(IsMultiselect,source);
      this.props.getPeopleData(getPeopleParams, source);
    }

    exportHandleOkClick(filter){
      console.log(filter)
      FuncLogParams.data.filter = filter;
      this.props.getFuncLogData(FuncLogParams);
    }

    render() {
        //table数据配置
        const { $$funcLogState } = this.props;
        const dataSource = $$funcLogState.get('tableData').get('data').get('rowData').toJS();
        const columns = $$funcLogState.get('tableColumns').toJS();

        //分页配置
        const pageSize = $$funcLogState.get('tableData').get('data').get('pageSize');
        const pageTotal = $$funcLogState.get('tableData').get('data').get('total');
        const pageCurrent = $$funcLogState.get('tableData').get('data').get('current');
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
          let IsModalShow = false;
          let IsMultiselect = 1;
          const source = this.props.$$searchPeople.toJS().source;
          if(!flag){
             IsModalShow = this.props.$$searchPeople.get('default').toJS().IsShow;
             IsMultiselect = this.props.$$searchPeople.get('default').toJS().IsMultiselect;

          }else{
             IsModalShow = this.props.$$searchPeople.get(source).toJS().IsShow;
             IsMultiselect = this.props.$$searchPeople.get(source).toJS().IsMultiselect;
          };
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
                <Col span="10">
                  <SearchInput onSearch = {this.searchInputChange} />
                </Col>
                <Col span="14"  style = {{ textAlign: 'right' }}>
                  <Button type="primary" style = {{marginRight: '10px'}}  onClick = {this.handleSelection.bind(this)}>筛选</Button>
                  <Button type="ghost" onClick = {this.exportConfirm}>导出EXCEL</Button>
                </Col>
              </Row>
              <Table 
                dataSource={dataSource} 
                columns={columns} 
                pagination={pagination} 
                rowClassName = {
                  function(record, index){
                    if (index == 1) {
                      return "ytm";
                    }
                    return "";
                  }
                } 
              />
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
      $$funcLogState: state.business.FuncLog
    }
};

export default connect(mapStateToProps, {
    getFuncLogData,
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
})(FunctionLog)