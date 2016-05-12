
/**
 * Created by ytm on 4/7/16.
 */

import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import classNames from 'classnames'
import { Row, Col, Table, Button, Input, Pagination, Modal} from 'antd'

import { getDeptSummaryData }  from 'actions/business/business/summary/DeptSummary'

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
    }

    render() {

        //table数据配置
        const { $$deptSummary } = this.props;
        const dataSource = $$deptSummary.get('tableData').get('data').toJS();
        const columns = $$deptSummary.get('tableColumns').toJS();

        return (
            <div  style = {{marginLeft: '20px'}} >
              <Row>
                <Col span="10">
                  <SearchInput onSearch = {this.searchInputChange.bind(this)} />
                </Col>
                <Col span="14" style = {{textAlign: 'right'}} >
                  <Button type="ghost" onClick = {this.exportConfirm} >导出EXCEL</Button>
                </Col>
              </Row>
              <Table 
                dataSource={dataSource} 
                columns={columns} 
                rowClassName = {
                  function(record, index){
                    if (record.Name == "小计" || record.Name == "合计") {
                      return "busi-total-item";
                    }
                    return "";
                  }
                }
                pagination={false}
                useFixedHeader
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