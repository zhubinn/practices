
/**
 * Created by ytm on 4/7/16.
 */

import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import classNames from 'classnames'
import { Row, Col, Tabs, Table, Button} from 'antd'

import DataTable from 'components/Business/DataTable'
import  { initSource,getData, showDetail, checkRow, updateRow, toggleSearch}  from 'actions/Component/DataTable'

import SearchInput from 'components/Business/SearchInput'
import { getDataobj, getDataSuccess, getDataFailure}  from 'actions/business/business/statistic'
import { handleInputChange }  from 'actions/Component/SearchInput'
import 'antd/lib/index.css';

const TabPane = Tabs.TabPane;

let params = {
    url: 'http://esn.yangtianming.com/front/js/scrm/fakeData/demoData.php',
}


let params1 = {
    url: 'http://esn.yangtianming.com/front/js/scrm/fakeData/tableData.php',
    data: {
        page: 1,
        rowsPerPage: 20
    }
}


class BusinessStatistic extends React.Component {
    constructor(props) {
      super(props)
      this.handleInputChange = this.handleInputChange.bind(this)
      this.onSearch = this.onSearch.bind(this)
    }

    componentDidMount() {
      const { getDataobj } = this.props
      // 页面初始完,获取数据,触发action: GET_DATA
      getDataobj(params)
    }

    handleInputChange(val) {
      const { handleInputChange } = this.props
      handleInputChange(val)
    }

    onSearch (val) {
      const { getDataobj } = this.props
      getDataobj(val)
    }

    render() {
        const { $$searchState, $$tableState} = this.props;
        debugger
        let val = $$searchState.get('val');
        let columns = $$tableState.get("statisticReport").get('columns').toJS();
        let data = $$tableState.get("statisticReport").get('data').toJS();
        return (
            <div  style = {{marginLeft: '20px'}} >
              <Row>
                <Col span="9">
                  <SearchInput placeholder="请输入..."  style={{ width: 300 }} val = { val } onSearch ={this.onSearch} handleInputChange = {this.handleInputChange}/>
                </Col>
                <Col span="10">
                  <Button type="primary"  style={{ marginLeft: 10 }} >高级搜索</Button>
                </Col>
                <Col span="4">
                  <Button type="ghost">导出EXCEL</Button>
                </Col>
              </Row>
              <Tabs defaultActiveKey="1" >
                <TabPane tab="生意汇总表" key="1">
                  <Table columns={columns} dataSource={data} />
                </TabPane>
                <TabPane tab="生意明细汇总表" key="2">
                  2222222
                </TabPane>
              </Tabs>
            </div>
        )
    }
}

const mapStateToProps = (state, ownProps) => {
    return {
        $$searchState: state.components.searchInput,
        $$tableState: state.business.statistic,
    }
}

export default connect(mapStateToProps, {
    getDataobj,
    getDataSuccess,
    getDataFailure,
    handleInputChange,
})(BusinessStatistic)