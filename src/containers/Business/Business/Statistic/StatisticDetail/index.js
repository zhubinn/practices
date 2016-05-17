
/**
 * Created by ytm on 4/7/16.
 */

import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import classNames from 'classnames'
import { Row, Col, Table, Button, Input, Pagination, Modal} from 'antd'

import { getStatisticDetailData, getStatisticDetailQuery }  from 'actions/business/business/statistic/statisticDetail'

import SearchInput from 'components/Business/SearchInput'
import QueryDataTable from 'components/Business/QueryDataTable'
import 'antd/lib/index.css'
import './index.css'

import getQueryString from 'components/Business/GetQueryString'
//获取table列表数据接口
let statisticdetailParams = {
    //url: SCRM.url('/front/js/scrm/fakeData/deptStatistic.php'),
    url: SCRM.url('/scrmweb/business/getDeptStatisticDetail'),
    data: {
        keyword:'',
        deptID:getQueryString("deptID")
    }
};

class statisticDetail extends React.Component {
    constructor(props) {
      super(props)
    }

    componentDidMount() {
      //初始获取数据
      this.props.getStatisticDetailData(statisticdetailParams);
      //this.props.getStatisticDetailQuery(SCRM.url('/scrmweb/accounts/getAccountFilter'))
    }

    searchInputChange(val) {
      statisticdetailParams.data.keyword = val;
      this.props.getStatisticDetailData(statisticdetailParams);
    }

    // 普通搜索和筛选(高级搜索)互斥
    normalSearch = (value) => {
        // 重置筛选(高级搜索)
        this.refs.queryDataTable.resetQueryForm()

        this.refs.queryDataTable.clearCheckedAndExpanded()
        this.props.getStatisticDetailData({
            data: {
                searchData: [],
                keyword: value
            }
        })
    }

    exportConfirm() {

      let exportParam = {
        objName:'OpportunityDeptUserStatistic',
        keyword:statisticdetailParams['data'].keyword,
        deptID:getQueryString("deptID"),
        deptName: unescape(getQueryString("deptName").replace(/\\u/gi, '%u')) 
      }
      let exportParamStr = JSON.stringify(exportParam);
      let p = 'param='+exportParamStr;
      const exportUrl = SCRM.url('/common/scrmExport/export')+'?'+p;
      window.open(exportUrl);
    }

    render() {

        //table数据配置
        const { $$statisticDetail } = this.props;
        const columns = $$statisticDetail.get('tableColumns').toJS();

        let queryDataTable = {}
        queryDataTable.dataSource = $$statisticDetail.get('tableData').get('data').toJS();
        //queryDataTable.queryColumns = $$statisticDetail.get('queryColumns').toJS()

        return (
            <div  style = {{margin: '0 10px'}} >
              <div style={{marginTop: '14px',marginBottom: '14px'}}>
              <Row>
                <Col span="10">
                  <SearchInput  ref="searchInput"  onSearch = {this.normalSearch} />
                </Col>
                <Col span="14" style = {{textAlign: 'right'}} >
                  <Button type="ghost" onClick = {this.exportConfirm} >导出EXCEL</Button>
                </Col>
              </Row>
              </div>
              <QueryDataTable
                    columns={columns}
                    checkMode={false}
                    pagination={false}
                    {...queryDataTable}
                    ref="queryDataTable"
                    rowClassName = {
                      function(record, index){
                        if (record.DeptName == "小计" || record.DeptName == "合计") {
                          return "amountClassName";
                        }
                        return "";
                      }
                    }
                />
            </div>
        )
    }
}

const mapStateToProps = (state, ownProps) => {
    return {
        $$statisticDetail: state.business.statisticdetail
    }
}

export default connect(mapStateToProps, {
    getStatisticDetailData,
    getStatisticDetailQuery,
})(statisticDetail)