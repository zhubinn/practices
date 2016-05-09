
/**
 * Created by ytm on 4/7/16.
 */

import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import classNames from 'classnames'
import { Row, Col, Table, Button, Input, Pagination, Modal} from 'antd'

import { getPerStatisticData }  from 'actions/business/business/statistic/PerStatistic'

import SearchInput from 'components/Business/SearchInput'
import 'antd/lib/index.css'
import './index.css'

//获取table列表数据接口
let PerStatisticDataParams = {
    url: 'http://esn.yangtianming.com/front/js/scrm/fakeData/deptStatistic.php',
    data: {
        keyword:''
    }
};
class PerStatistic extends React.Component {
    constructor(props) {
      super(props)
    }

    componentDidMount() {
      //初始获取数据
      this.props.getPerStatisticData(PerStatisticDataParams);
    }

    searchInputChange(val) {
      PerStatisticDataParams.data.keyword = val;
      this.props.getPerStatisticData(PerStatisticDataParams);
    }

    exportConfirm() {
    }

    render() {
      

        //table数据配置
        const { $$PerStatistic } = this.props;
        const dataSource = $$PerStatistic.get('tableData').get('data').toJS();
        const columns = $$PerStatistic.get('tableColumns').toJS();

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
                    if (dataSource[index].classname == "total") {
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
        $$PerStatistic: state.business.perstatistic
    }
}

export default connect(mapStateToProps, {
    getPerStatisticData,
})(PerStatistic)