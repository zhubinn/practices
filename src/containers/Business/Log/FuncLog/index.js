
/**
 * Created by ytm on 4/7/16.
 */

import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import classNames from 'classnames'
import { Row, Col, Table, Radio, Button, Input, Pagination, Modal, DatePicker, Form} from 'antd'

import SearchInput from 'components/Business/SearchInput'
import QueryDataTable from 'components/Business/QueryDataTable'
import { isEmpty } from 'lodash'

import { getFuncLogData, getFuncLogQuery, pageSizeChange,  exportShow, exportHide}  from 'actions/business/Log/FunctionLog'
import 'antd/lib/index.css'

const RangePicker = DatePicker.RangePicker;
const FormItem = Form.Item;
//获取table列表数据接口
let FuncLogParams = {
    //url: 'http://esn.yangtianming.com/front/js/scrm/fakeData/funcLog.php',
    url: SCRM.url('/scrmoplog/index/oplogIndex'),
    //url: 'http://esn.yangtianming.com/scrmoplog/index/oplogIndex',
};

let exportParams = {
    objName:"OperationLog",
    begin:'',
    end:''
}

class FunctionLog extends React.Component {
    constructor(props) {
      super(props);
    }

    componentDidMount() {
      //初始获取数据
      this.props.getFuncLogData(FuncLogParams);
      //this.props.getFuncLogQuery(SCRM.url('/scrmoplog/index/getOplogFilter'))
    }

    // 普通搜索和筛选(高级搜索)互斥
    normalSearch = (value) => {
        // 重置筛选(高级搜索)
        this.refs.queryDataTable.resetQueryForm()
        this.refs.queryDataTable.clearCheckedAndExpanded()
        this.props.getFuncLogData({
            data: {
                searchData: [],
                keyword: value,
                page: 1,
                pageSize: 10
            }
        })
    }

    showModal = () => {
      this.props.exportShow()
    }

    handleOk() {
      this.props.exportHide()
      //console.log(exportParams);
      let objData = JSON.stringify(exportParams);
      window.open(SCRM.url("/common/ScrmExportOptimization/export")+ '?param=' + objData);
    }

    handleCancel(e) {
      this.props.exportHide()
    }

    exportTimeChange(value){

      // function comple(val){
      //   if(val<10){
      //     return "0"+val;
      //   }else{
      //     return val;
      //   }
      // }

      // function formatDate(date, format){
      //   switch(format){
      //     case "yyyy-MM-dd HH:mm:ss":
      //     return date.getFullYear() + "-" + comple(date.getMonth()) + "-" + comple(date.getDate()) + " " + comple(date.getHours()) + ":" + comple(date.getMinutes()) + ":" + comple(date.getSeconds());
      //     case "yyyy-MM-dd":
      //     return date.getFullYear() + "-" + comple(date.getMonth()) + "-" + comple(date.getDate());
      //     default:
      //     return date.getFullYear() + "-" + comple(date.getMonth()) + "-" + comple(date.getDate());
      //   }
      // }

      // exportParams.begin = formatDate(value[0], "yyyy-MM-dd HH:mm:ss");
      // exportParams.end = formatDate(value[1], "yyyy-MM-dd HH:mm:ss");
      exportParams.begin = value[0];
      exportParams.end = value[1];
    }

    render() {
        //table数据配置
        const { $$funcLogState, getFuncLogData } = this.props;
        const columns = $$funcLogState.get('tableColumns').toJS();
        const expotModal = $$funcLogState.get('export').get('visible');
        //分页配置
        let queryDataTable = {}
        let tablePageData = $$funcLogState.get('tableData').get('data');
        queryDataTable.dataSource = tablePageData.get('rowData').toJS();
        queryDataTable.current = tablePageData.get('current');
        queryDataTable.total = tablePageData.get('total');
        queryDataTable.pageSize = tablePageData.get('pageSize');
        queryDataTable.queryColumns = $$funcLogState.get('queryColumns').toJS()
        //queryDataTable.loading = $$account_list_person.toJS().loading
        
        return (
            <div  style = {{margin: '0 10px'}} >
              <div style={{marginTop: '14px',marginBottom: '14px'}}>
              <Row>
                <Col span="10">
                  <SearchInput ref="searchInput" onSearch = {this.normalSearch} />
                </Col>
                <Col span="14"  style = {{ textAlign: 'right' }}>
                  <div className="cklist-Persontfilter">
                  <Button type="primary" onClick={(e)=>{
                            this.refs.queryDataTable.toggleQueryTable(e)
                        }} >筛选</Button>
                  </div>
                  <Button type="ghost" onClick = { this.showModal.bind(this) }>导出EXCEL</Button>
                </Col>
              </Row>
              </div>
              <QueryDataTable
                    columns={columns}
                    checkMode={false}
                    {...queryDataTable}
                    onGetTableData={
                                (obj)=>{
                                    this.refs.searchInput.emptyInput()
                                    getFuncLogData({
                                        data: obj
                                    })
                                }
                            }
                    ref="queryDataTable"
                >
                </QueryDataTable>
                <Modal 
                  title="导出日志" 
                  visible={expotModal}
                  onOk={this.handleOk.bind(this)} 
                  onCancel={this.handleCancel.bind(this)}
                >
                  <RangePicker showTime format="yyyy-MM-dd HH:mm:ss"  onChange={this.exportTimeChange.bind(this)} />
                </Modal>
            </div>
        )
    }
}

const mapStateToProps = (state, ownProps) => {
    return {
      $$funcLogState: state.business.FuncLog
    }
};

export default connect(mapStateToProps, {
    getFuncLogData,
    getFuncLogQuery,
    pageSizeChange,
    exportShow,
    exportHide,
})(FunctionLog)