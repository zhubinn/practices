
/**
 * Created by ytm on 4/7/16.
 */

import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import classNames from 'classnames'
import { Row, Col, Button, Modal} from 'antd'
import { getPerSummaryData }  from 'actions/business/business/summary/PerSummary'
import SearchInput from 'components/Business/SearchInput'
import QueryDataTable from 'components/Business/QueryDataTable'

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
        const { $$perSummary } = this.props;
        const dataSource = $$perSummary.get('tableData').get('data').toJS();
        const columns = $$perSummary.get('tableColumns').toJS();
        const loading = $$perSummary.get('loading')
        
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
                    loading = {loading}
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
        $$perSummary: state.business.persummary
    }
}

export default connect(mapStateToProps, {
    getPerSummaryData,
})(PerSummary)