import fetch from 'isomorphic-fetch'
import { findDOMNode } from 'react-dom'
import { Table, Modal, Spin,  Button, Radio, message, Input } from 'antd'
const RadioGroup = Radio.Group;
import Search from './search'
//less
import './less/clues.less'



const columns = [{
            title: '姓名',
            dataIndex: 'Name',
            width: 65
        }, {
            title: '客户名称',
            dataIndex: 'Company',
            width: 180
        },{
            title: '导入来源',
            dataIndex: 'ImportSource',
            width: 180
        }, {
            title: '创建时间',
            dataIndex: 'CreatedTime',
            width: 140
        },  {
            title: '线索负责人',
            dataIndex: 'OwnerID',
            width: 180
        }, {
            title: '线索录入人',
            dataIndex: 'CreatedByID',
            width: 180
        }, {
            title: '微信',
            dataIndex: 'Wechat',
            width: 160
        }, {
            title: 'QQ',
            dataIndex: 'QQ',
            width: 160
        }, {
            title: '线索来源',
            dataIndex: 'Source',
            width: 260
        }, {
            title: '描述',
            dataIndex: 'Description',
            width:160
        }, {
            title: '电话',
            dataIndex: 'Phone',
            width: 160
        }, {
            title: '已转化客户',
            dataIndex: 'TransedAccountID',
            width: 280
        }, {
            title: '已转化联系人',
            dataIndex: 'TransedContactID',
            width: 280
        }]



export default class DispatchClues extends React.Component {
    constructor(props, context) {
        super(props, context)
        this.state = {}
    }

    componentDidMount(){
        const { dispatchCluesState,actions } = this.props
        const dispatchState = dispatchCluesState.toJS().dispatchState
        $.post(SCRM.url('/scrmlead/index/getAssignList'),{
            assigned:0,//0未分派,1已分派未处理 不传默认0
            page:1,
            rowsPerPage:20,
            canAssign:1
        },function(data){
            if(data.rs === true){
                const rowData = data.data.rowData;
                actions.fetchData(true,rowData)
            }else{
                message.error('服务器错误，请联系客服！')
            }
        },'json')

    }

    handClickTab(state){
        const { dispatchCluesState,actions } = this.props
        const dispatchState = dispatchCluesState.toJS().dispatchState
        actions.clickTab(state,false)
        $.post(SCRM.url('/scrmlead/index/getAssignList'),{
            assigned:state,//0未分派,1已分派未处理 不传默认0
            page:1,
            rowsPerPage:20,
            canAssign:1
        },function(data){
            if(data.rs === true){
                const rowData = data.data.rowData;
                actions.fetchData(true,rowData)
            }else{
                message.error('服务器错误，请联系客服！')
            }
        },'json')
    }

    showModal(){
        const { dispatchCluesState ,actions } = this.props
        const isShowModal = dispatchCluesState.toJS().showModal
        const rowData = dispatchCluesState.toJS().selectData

        if(!rowData.length ) {
            message.warn('请先选择要分派的线索!');
            return false;
        };

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

    onDeptRadioChange(e){
        const { actions } = this.props

        actions.selectDeptChange(e.target.value)
    }

    handleDispatchOk(){
        const { dispatchCluesState ,actions } = this.props
        const isShowModal = dispatchCluesState.toJS().showModal
        const { selectedRadioID, selectData} = dispatchCluesState.toJS()
        const selectIDs = selectData.map((item) => item.ID)
        $.post(SCRM.url('/scrmlead/index/changeOwner'),{
            ownerID:selectedRadioID,
            selectIDs:selectIDs
        },function(data){
            if(data.rs === true){
                actions.showDispatchModal(!isShowModal)
                message.success('分派成功！');
                location.reload()
            }else{
                message.error('分派失败！');
            }
        },'json')
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
                <Button key="back" type="ghost" size="large" onClick={this.showModal.bind(this)}>取消</Button>,
                <Button key="submit" type="primary" size="large"  onClick={this.handleDispatchOk.bind(this)}>
                  确定分派
                </Button>]}>
                    {
                        <div className="ds-dept-list">
                            <Spin spining = { !deptData.length  } />
                            <RadioGroup onChange={this.onDeptRadioChange.bind(this)} >
                            {
                                deptData.map((item, index) => {
                                    return (
                                        <Radio  key={ index } value={item.ID} className ="radio-item">
                                            <div className="photo">
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
        actions.selectChange(selectedRowKeys, selectedRows)
    }

    renderTableList(){
        const { dispatchCluesState ,actions } = this.props
        const rowData = dispatchCluesState.toJS().rowData
        const loading = dispatchCluesState.toJS().loading
        const dispatchState = dispatchCluesState.toJS().dispatchState


        //未分派0
        if(dispatchState === 0){
            const rowSelection = {
                onChange: this.onSelectChange.bind(this)
            };
            return (
                loading  ? <Table  rowSelection={rowSelection} columns={columns} dataSource={rowData} /> : <Spin  />
            )
        }else if(dispatchState === 1){
            return (
                loading  ? <Table  columns={columns} dataSource={rowData} /> : <Spin  />
            )
        }
        // switch (dispatchState) {
        //     case 0:
        //
        //         break;
        //     case 1:
        //     return (
        //         <Table rowSelection={rowSelection} columns={columns} dataSource={rowData} />
        //     )
        //         break;
        //     default:
        //
        // }

    }

    render() {
        const { dispatchCluesState ,actions } = this.props
        const dispatchState = dispatchCluesState.toJS().dispatchState

        return (
            <div>
                <div className="col-right">
                    <div className="col-cktop">
                        <div className="col-cktop-gongneng clearfix">
                            <Search dispatchCluesState = { dispatchCluesState } actions = { actions }  />
                            <button className = { dispatchState === 0 ? "col-cktop-btn " : "col-cktop-btn hidden" }  onClick = { this.showModal.bind(this) }>分派</button>
                        </div>

                    </div>
                    <div className="ck-tab-hd">
                        <ul className="clearfix">
                            <li className = { dispatchState === 0 ? "active" : null } onClick = { this.handClickTab.bind(this,0) }><a>未分派</a></li>
                            <li className = { dispatchState === 1 ? "active" : null } onClick = { this.handClickTab.bind(this,1) }><a>已分派</a></li>
                        </ul>
                    </div>
                    <div className="clues-table">
                        { this.renderTableList() }
                    </div>

                </div>
                { this.renderModalBox() }
            </div>
        )
    }
}
