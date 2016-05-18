
/**
 * Created by ytm on 4/7/16.
 */

import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import classNames from 'classnames'
import { Row, Col, Table, Button, Input, Pagination, Modal} from 'antd'

import { getPerSummaryData }  from 'actions/business/business/summary/PerSummary'
import QueryDataTable from 'components/Business/QueryDataTable'
import SearchInput from 'components/Business/SearchInput'
import 'antd/lib/index.css'

//获取table列表数据接口
let PerSummaryParams = {
    //url: SCRM.url('/front/js/scrm/fakeData/deptStatistic.php'),
    url: SCRM.url('/scrmweb/business/getPerSummary'),
    data: {
        keyword:''
    }
};
class PerSummary extends React.Component {
    constructor(props) {
      super(props)
    }

    componentDidMount() {
      //初始获取数据
      this.props.getPerSummaryData(PerSummaryParams);
    }

    searchInputChange(val) {
      PerSummaryParams.data.keyword = val;
      this.props.getPerSummaryData(PerSummaryParams);
    }

    exportConfirm() {
      let exportParam = {
        objName:'OpportunityPerSummary'
      }
      let exportParamStr = JSON.stringify(exportParam);
      let p = 'param='+exportParamStr;
      const exportUrl = SCRM.url('/common/scrmExport/export')+'?'+p;
      window.open(exportUrl);
    }

    render() {

        //table数据配置
        const { $$perStatistic } = this.props;
        const dataSource = $$perStatistic.get('tableData').get('data').toJS();
        const columns = $$perStatistic.get('tableColumns').toJS();
        
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
                />
            </div>
        )
    }
}

const mapStateToProps = (state, ownProps) => {
    return {
        $$perStatistic: state.business.persummary
    }
}

export default connect(mapStateToProps, {
    getPerSummaryData,
})(PerSummary)