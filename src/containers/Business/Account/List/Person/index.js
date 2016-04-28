/**
 * Created by janeluck on 4/27/16.
 */
import { connect } from 'react-redux'
import {Button, Icon, Input, Row, Col, Tabs, Table } from 'antd'
import 'antd/style/index.less'



const TabPane = Tabs.TabPane;

class Account_List_Person_Page extends React.Component {
    constructor() {
        super()
    }

    render() {
        const {

            } = this.props

        return (
            <div>
                <Row>
                    <Col span="8"> </Col>
                    <Col span="8" offset="8">
                        <Button type="primary" >筛选</Button>
                        <Button type="ghost">变更联系人</Button>
                        <Button type="ghost">导出</Button>
                    </Col>
                </Row>
                <Tabs defaultActiveKey="1">
                    <TabPane tab="全部客户" key="1">

                    </TabPane>
                    <TabPane tab="负责的客户" key="2">
                    </TabPane>
                    <TabPane tab="参与的客户" key="3">
                    </TabPane>
                    <TabPane tab="重点客户" key="4">
                    </TabPane>
                    <TabPane tab="关注的客户" key="5">
                    </TabPane>
                </Tabs>

            </div>
        )
    }
}

const mapStateToProps = (state, ownProps) => {
    return {

    }
}

export default connect(mapStateToProps, {

})(Account_List_Person_Page)