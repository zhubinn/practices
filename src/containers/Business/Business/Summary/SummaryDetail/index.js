
/**
 * Created by ytm on 4/7/16.
 */

import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import classNames from 'classnames'
import { Row, Col, Table, Button, Input, Pagination, Modal} from 'antd'

import { getSummaryDetailData }  from 'actions/business/business/summary/summaryDetail'

import SearchInput from 'components/Business/SearchInput'
import 'antd/lib/index.css'
import './index.css'

//获取table列表数据接口
let summarydetailParams = {
    //url: SCRM.url('/front/js/scrm/fakeData/deptStatistic.php'),
    url: SCRM.url('/scrmweb/business/getDeptStatistic/VISITID/1'),
    data: {
        keyword:''
    }
};

class summaryDetail extends React.Component {
    constructor(props) {
      super(props)
    }

    componentDidMount() {
      //初始获取数据
      this.props.getSummaryDetailData(summarydetailParams);
    }

    searchInputChange(val) {
      summarydetailParams.data.keyword = val;
      this.props.getSummaryDetailData(summarydetailParams);
    }

    exportConfirm() {
    }

    render() {

        //table数据配置
        const { $$summaryDetail } = this.props;
        const dataSource = $$summaryDetail.get('tableData').get('data').toJS();
        const columns = $$summaryDetail.get('tableColumns').toJS();

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
        $$summaryDetail: state.business.summarydetail
    }
}

export default connect(mapStateToProps, {
    getSummaryDetailData,
})(summaryDetail)