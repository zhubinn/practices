
/**
 * Created by yangtm on 4/7/16.
 */

import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import classNames from 'classnames'
import { Row, Col, Table, Button, Input, Pagination, Modal} from 'antd'

import { getDeptSummaryData }  from 'actions/business/business/summary/DeptSummary'
import QueryDataTable from 'components/Business/QueryDataTable'
import SearchInput from 'components/Business/SearchInput'
import 'antd/lib/index.css'
import './index.css'

//获取table列表数据接口
let DeptSummaryParams = {
    //url: SCRM.url('/front/js/scrm/fakeData/deptStatistic.php'),
    url: SCRM.url('/scrmweb/business/getDeptSummary'),
    data: {
        keyword:''
    }
};

class DeptSummary extends React.Component {
    constructor(props) {
      super(props)
    }

    componentDidMount() {
      //初始获取数据
      this.props.getDeptSummaryData(DeptSummaryParams);
    }

    searchInputChange(val) {
      DeptSummaryParams.data.keyword = val;
      this.props.getDeptSummaryData(DeptSummaryParams);
    }

    exportConfirm() {
      let exportParam = {
        objName:'OpportunityDeptSummary',
        keywords:DeptSummaryParams['data'].keyword
      }
      let exportParamStr = JSON.stringify(exportParam);
      let p = 'param='+exportParamStr;
      const exportUrl = SCRM.url('/common/scrmExport/export')+'?'+p;
      window.open(exportUrl);
    }

    render() {

        //table数据配置
        const { $$deptSummary } = this.props;
        const dataSource = $$deptSummary.get('tableData').get('data').toJS();
        const columns = $$deptSummary.get('tableColumns').toJS();

        return (
            <div  style = {{margin: '0 10px'}} >
              <div style={{marginTop: '14px',marginBottom: '14px'}}>
              <Row>
                <Col span="10">
                  <SearchInput onSearch = {this.searchInputChange.bind(this)} />
                </Col>
                <Col span="14" style = {{textAlign: 'right'}} >
                  <Button type="ghost" onClick = {this.exportConfirm} >导出EXCEL</Button>
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
        $$deptSummary: state.business.deptsummary
    }
}

export default connect(mapStateToProps, {
    getDeptSummaryData,
})(DeptSummary)