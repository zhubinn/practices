
/**
 * Created by ytm on 4/7/16.
 */

import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import classNames from 'classnames'
import { Row, Col, Table, Button, Input, Pagination, Modal} from 'antd'

import { getSummaryDetailData, getSummaryDetailQuery }  from 'actions/business/business/summary/summaryDetail'

import SearchInput from 'components/Business/SearchInput'
import QueryDataTable from 'components/Business/QueryDataTable'
import 'antd/lib/index.css'
import 'containers/Business/index.less'

import getQueryString from 'components/Business/GetQueryString'

//获取table列表数据接口
let summarydetailParams = {
    //url: SCRM.url('/front/js/scrm/fakeData/deptStatistic.php'),
    url: SCRM.url('/scrmweb/business/getDeptSummaryDetail'),
    data: {
        keyword:'',
        deptID:getQueryString("deptID")
    }
};

class summaryDetail extends React.Component {
    constructor(props) {
      super(props)
    }

    componentDidMount() {
      //初始获取数据
      this.props.getSummaryDetailData(summarydetailParams);

      //this.props.getSummaryDetailQuery(SCRM.url('/scrmweb/accounts/getAccountFilter'))
    }
        // 普通搜索和筛选(高级搜索)互斥
    normalSearch = (value) => {
        // 重置筛选(高级搜索)
        this.refs.queryDataTable.resetQueryForm()

        this.refs.queryDataTable.clearCheckedAndExpanded()
        this.props.getSummaryDetailData({
            data: {
                searchData: [],
                keyword: value
            }
        })
    }

    exportConfirm() {
      let exportParam = {
        objName:'OpportunityDeptUserSummary',
        keyword:summarydetailParams['data'].keyword,
        deptID:getQueryString("deptID"),
        deptName:unescape(getQueryString("deptName").replace(/\\u/gi, '%u'))
      }
      let exportParamStr = JSON.stringify(exportParam);
      let p = 'param='+exportParamStr;
      const exportUrl = SCRM.url('/common/scrmExport/export')+'?'+p;
      window.open(exportUrl);
    }

    render() {

        //table数据配置
        const { $$summaryDetail, getSummaryDetailData } = this.props;
        const columns = $$summaryDetail.get('tableColumns').toJS();

        let queryDataTable = {}
        queryDataTable.dataSource = $$summaryDetail.get('tableData').get('data').toJS();
        queryDataTable.queryColumns = $$summaryDetail.get('queryColumns').toJS()

        return (
            <div className="ck-root-main">
              <div className="ck-root-title">
              <Row>
                <Col span="10">
                  <SearchInput ref="searchInput" onSearch = {this.normalSearch.bind(this)} />
                </Col>
                <Col span="14" style = {{textAlign: 'right'}} >
                  <Button type="ghost" onClick = {this.exportConfirm} >导出</Button>
                </Col>
              </Row>
              </div>
              <QueryDataTable
                    columns={columns}
                    checkMode={false}
                    {...queryDataTable}
                    pagination={false}
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
        $$summaryDetail: state.business.summarydetail
    }
}

export default connect(mapStateToProps, {
    getSummaryDetailData,
    getSummaryDetailQuery,
})(summaryDetail)