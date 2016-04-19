
/**
 * Created by ytm on 4/7/16.
 */


import { bindActionCreators } from 'redux'
import classNames from 'classnames';
import { connect } from 'react-redux'
import { Row, Col, Tabs, Table, Button} from 'antd';
import SearchInput from 'components/Business/SearchInput'
import  { getData, getDataSuccess, getDataFailure}  from 'actions/business/business/summary'
import 'antd/lib/index.css';

const TabPane = Tabs.TabPane;

class BusinessSummary extends React.Component {
    render() {
        return (
            <div  style = {{marginLeft: '20px'}} >
              <Row>
                <Col span="8">
                  <SearchInput placeholder="input search text" style={{ width: 200 }} />
                </Col>
                <Col span="12">
                  <Button type="primary">高级搜索</Button>
                </Col>
                <Col span="4">
                  <Button type="ghost">导出EXCEL</Button>
                </Col>
              </Row>
              <Tabs defaultActiveKey="1" >
                <TabPane tab="生意汇总表" key="1">
                  3333333
                </TabPane>
                <TabPane tab="生意明细汇总表" key="2">
                  4444444
                </TabPane>
              </Tabs>
            </div>
        )
    }
}

const mapStateToProps = (state, ownProps) => {
    return {
        dataTable: state.components.dataTable,
        account_list: state.business.account_list
    }
}

export default connect(mapStateToProps)(BusinessSummary)