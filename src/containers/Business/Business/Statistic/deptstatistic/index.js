
/**
 * Created by ytm on 4/7/16.
 */

import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import classNames from 'classnames'
import { Row, Col, Table, Button, Input, Pagination, Modal} from 'antd'

import { getDeptstatisticData }  from 'actions/business/business/statistic/deptstatistic'
import QueryDataTable from 'components/Business/QueryDataTable'
import SearchInput from 'components/Business/SearchInput'
import 'antd/lib/index.css'
import 'containers/Business/index.less'

//获取table列表数据接口
let DeptstatisticParams = {
    //url: SCRM.url('/front/js/scrm/fakeData/deptStatistic.php'),
    url: SCRM.url('/scrmweb/business/getDeptStatistic'),
    data: {
        keyword:''
    }
};

class Deptstatistic extends React.Component {
    constructor(props) {
      super(props)
    }

    componentDidMount() {
      //初始获取数据
      this.props.getDeptstatisticData(DeptstatisticParams);
    }

    searchInputChange(val) {
      DeptstatisticParams.data.keyword = val;
      this.props.getDeptstatisticData(DeptstatisticParams);
    }

    exportConfirm() {
      let exportParam = {
        objName:'OpportunityDeptStatistic',
        keyword:DeptstatisticParams['data'].keyword
      }
      let exportParamStr = JSON.stringify(exportParam);
      let p = 'param='+exportParamStr;
      const exportUrl = SCRM.url('/common/scrmExport/export')+'?'+p;
      window.open(exportUrl);
    }

    render() {

        //table数据配置
        const { $$deptStatistic } = this.props;
        const dataSource = $$deptStatistic.get('tableData').get('data').toJS();
        const columns = $$deptStatistic.get('tableColumns').toJS();

        return (
            <div className="ck-root-main">
              <div className="ck-root-title">
              <Row>
                <Col span="10">
                  <SearchInput onSearch = {this.searchInputChange.bind(this)} />
                </Col>
                <Col span="14" style = {{textAlign: 'right'}} >
                  <Button type="ghost" onClick = {this.exportConfirm} >导出</Button>
                </Col>
              </Row>
              </div>
              <QueryDataTable
                    columns={columns}
                    dataSource={dataSource} 
                    checkMode={false}
                    ref="queryDataTable"
                    pagination={false}
                    rowClassName = {
                      function(record, index){
                        if (record.Name == "小计" || record.Name == "合计") {
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
        $$deptStatistic: state.business.deptstatistic
    }
}

export default connect(mapStateToProps, {
    getDeptstatisticData,
})(Deptstatistic)