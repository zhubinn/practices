
/**
 * Created by janeluck on 4/7/16.
 */


import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import classNames from 'classnames'
import { Row, Col, Tabs, Table, Button} from 'antd'
import SearchInput from 'components/Business/SearchInput'
import  { getData, getDataSuccess, getDataFailure}  from 'actions/business/business/statistic'
import 'antd/lib/index.css';

const TabPane = Tabs.TabPane;

class BusinessStatistic extends React.Component {
    constructor(props) {
        super(props)

        this.handleInputChange = this.handleInputChange.bind(this)
    }

    handleInputChange(val) {
       console.log(val);
    }

    render() {
        const { $$mapState } = this.props;
        const val = $$mapState.get('val');
        return (
            <div  style = {{marginLeft: '20px'}} >
              <Row>
                <Col span="9">
                  <SearchInput placeholder="请输入..."  style={{ width: 300 }} val = { val } handleInputChange = {this.handleInputChange}/>
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
                  11111111
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
        $$mapState: state.components.searchInput
    }
}

export default connect(mapStateToProps, {
    getData,
    getDataSuccess,
    getDataFailure,
})(BusinessStatistic)