
/**
 * Created by ytm on 4/7/16.
 */

import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import classNames from 'classnames'
import { Row, Col, Button, Modal, DatePicker, Form} from 'antd'
import SearchInput from 'components/Business/SearchInput'
import QueryDataTable from 'components/Business/QueryDataTable'
import { getFuncLogData, getFuncLogQuery}  from 'actions/business/Log/FunctionLog'

const RangePicker = DatePicker.RangePicker;
const FormItem = Form.Item;
//获取table列表数据接口
let FuncLogParams = {
    //url: 'http://esn.yangtianming.com/front/js/scrm/fakeData/funcLog.php',
    url: SCRM.url('/scrmoplog/index/oplogIndex'),
};

let exportParams = {
    objName:"OperationLog",
    begin:'',
    end:''
}

class FunctionLog extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
          inImport: false
      }
    }

    componentDidMount() {
      //初始获取数据
      this.props.getFuncLogData(FuncLogParams);
      this.props.getFuncLogQuery(SCRM.url('/scrmoplog/index/getOplogFilter'))
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
                pageSize: 0
            }
        })
    }

    showModal = () => {
      this.setState({
        inImport: true
      });
    }

    handleOk() {
      this.setState({
        inImport: false
      });
       if(exportParams.begin == "" || exportParams.begin == null){
        Modal.info({
            title: '请选择时间范围',
            content: '请选择开始时间和截止时间',
        });
      }else{
        let objData = JSON.stringify(exportParams);
        window.open(SCRM.url("/common/ScrmExportOptimization/export")+ '?param=' + objData);
      };
    }

    handleCancel(e) {
      this.setState({
        inImport: false
      });
    }

    exportTimeChange(value){
      exportParams.begin = value[0];
      exportParams.end = value[1];
    }

    render() {
        //table数据配置
        const { $$funcLogState, getFuncLogData } = this.props;
        const columns = $$funcLogState.get('tableColumns').toJS();
        //分页配置
        let queryDataTable = {}
        let tablePageData = $$funcLogState.get('tableData').get('data');
        queryDataTable.dataSource = tablePageData.get('rowData').toJS();
        queryDataTable.current = tablePageData.get('current');
        queryDataTable.total = tablePageData.get('total');
        queryDataTable.pageSize = tablePageData.get('pageSize');
        queryDataTable.queryColumns = $$funcLogState.get('queryColumns').toJS()
        queryDataTable.loading = $$funcLogState.get('loading')
        
        return (
            <div className="ck-root-main">
              <div className="ck-root-title">
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
                  <Button type="ghost" onClick = { this.showModal.bind(this) }>导出</Button>
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
                  visible={this.state.inImport}
                  onOk={this.handleOk.bind(this)} 
                  onCancel={this.handleCancel.bind(this)}
                >
                  <RangePicker 
                    format="yyyy-MM-dd HH:mm:ss" 
                    onChange={this.exportTimeChange.bind(this)} 
                  />
                  <p style={{marginTop:'10px', color:'#999'}}>提示：一次导出的数据量最大上限10万条，超出时请缩短时间范围</p>
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
})(FunctionLog)