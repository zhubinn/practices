
/**
 * Created by ytm on 4/7/16.
 */

import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import classNames from 'classnames'
import { Row, Col, Table, Button, Input, Pagination, Modal} from 'antd'

import { getDeptstatisticData }  from 'actions/business/business/statistic/deptstatistic'

import SearchInput from 'components/Business/SearchInput'
import 'antd/lib/index.css'
import './index.css'

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
    }

    render() {

        //table数据配置
        const { $$deptStatistic } = this.props;
        const dataSource = $$deptStatistic.get('tableData').get('data').toJS();
        const columns = $$deptStatistic.get('tableColumns').toJS();

        return (
            <div  style = {{marginLeft: '20px'}} >
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
        $$deptStatistic: state.business.deptstatistic
    }
}

export default connect(mapStateToProps, {
    getDeptstatisticData,
})(Deptstatistic)