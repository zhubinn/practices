import fetch from 'isomorphic-fetch'
import { findDOMNode } from 'react-dom'
import { Table, Modal, Button, Radio, Input } from 'antd'
const RadioGroup = Radio.Group;
//less
import './less/clues.less'

const columns = [{
    title: '公司名称',
    dataIndex: 'Company',
}, {
    title: '姓名',
    dataIndex: 'CreatedByID',
}, {
    title: '导入来源',
    dataIndex: 'Source',
}, {
    title: '创建时间',
    dataIndex: 'CreatedTime',
}, {
    title: '线索负责人',
    dataIndex: 'manager',
}, {
    title: '线索录入人',
    dataIndex: 'recorder',
}, {
    title: '微信',
    dataIndex: 'weixin',
}];





export default class DispatchClues extends React.Component {
    constructor(props, context) {
        super(props, context)

    }

    componentDidMount(){
        const { actions } = this.props
        $.post(SCRM.url('/scrmlead/index/getAssignList'),{
            assigned:0,
            page:1,
            rowsPerPage:20,
            ownerID:12,
            canAssign:1
        },function(data){
            const rowData = data.data.rowData;
            actions.fetchData(true,rowData)
        },'json')

    }

    showModal(){
        const { dispatchCluesState ,actions } = this.props
        const isShowModal = dispatchCluesState.toJS().showModal
        const rowData = dispatchCluesState.toJS().selectData

        if(!rowData.length ) return;

        const idArr = rowData.map((item) => item.ID)


        actions.showDispatchModal(!isShowModal)

        if(!isShowModal){
            $.post(SCRM.url('/deptcomponent/DeptComponent/getUserListForLeadAssign'),function(data){
                if(data.rs === true){
                    actions.fetchDeptData(true,data.data)
                }
            },'json')
        }

    }



    renderModalBox(){
        const { dispatchCluesState ,actions } = this.props
        const isShowModal = dispatchCluesState.toJS().showModal
        const deptData = dispatchCluesState.toJS().deptData



        return (
            <div>
                <Modal ref="modal"
                       visible={ isShowModal }
                       title="选择要分派的人员" onOk={this.handleOk} onCancel={this.showModal.bind(this)}
                       footer={[
                <Button key="back" type="ghost" size="large" onClick={this.showModal.bind(this)}>关闭</Button>,
                <Button key="submit" type="primary" size="large"  onClick={this.handleOk}>
                  确定分派
                </Button>]}>
                    {
                        <div className="ds-dept-list">
                            <RadioGroup>
                            {
                                deptData.map((item, index) => {
                                    console.log(index)
                                    return (
                                        <Radio  key={ index } value={item.ID}>
                                            <div>
                                                <img src={ item.Avatar }/>
                                                <span>{ item.Name }</span>
                                            </div>
                                        </Radio>

                                    )
                                })
                            }
                            </RadioGroup>
                        </div>
                    }
                </Modal>
            </div>
        )
    }

    onSelectChange(selectedRowKeys,selectedRows){
        const { dispatchCluesState ,actions } = this.props
        console.log(this.props,selectedRows)
        actions.selectChange(selectedRowKeys, selectedRows)
    }

    render() {
        const { dispatchCluesState ,actions } = this.props
        const rowData = dispatchCluesState.toJS().rowData
        // 通过 rowSelection 对象表明需要行选择

        const rowSelection = {
            onChange: this.onSelectChange.bind(this)
        };
        return (
            <div>
                <div className="col-right">
                    <div className="col-cktop">
                        <div className="col-cktop-gongneng clearfix">
                            <div className="col-cktop-Hightsearch">
                                <input type="text" className="Hightsearch_input" placeholder="输入线索负责人" />
                                <button className="Hightsearch-btn">高级搜索</button>
                            </div>
                            <button className="col-cktop-btn" onClick = { this.showModal.bind(this) }>分派</button>
                        </div>

                    </div>
                    <div className="ck-tab-hd">
                        <ul className="clearfix">
                            <li className="active"><a href="">未分派</a></li>
                            <li><a href="">已分派</a></li>
                        </ul>
                    </div>
                    <Table rowSelection={rowSelection} columns={columns} dataSource={rowData} />
                </div>
                { this.renderModalBox() }
            </div>
        )
    }
}
