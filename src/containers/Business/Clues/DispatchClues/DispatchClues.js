import fetch from 'isomorphic-fetch'
import { findDOMNode } from 'react-dom'
import reqwest from 'reqwest'
import { Table,Row , Col, Modal, Spin,  Button, Radio, message, Input } from 'antd'
const RadioGroup = Radio.Group;
import SearchInput from 'components/Business/SearchInput'
//less
import './less/clues.less'


const columns = [{
    title: '姓名',
    dataIndex: 'Name',
    key: 'Name',
    width: 65
}, {
    title: '客户名称',
    dataIndex: 'Company',
    key: 'Company',
    width: 180
},{
    title: '导入来源',
    dataIndex: 'ImportSource',
    key: 'ImportSource',
    width: 180
}, {
    title: '创建时间',
    dataIndex: 'CreatedTime',
    key: 'CreatedTime',
    width: 140
},  {
    title: '线索负责人',
    dataIndex: 'OwnerID',
    key: 'OwnerID',
    width: 180
}, {
    title: '线索录入人',
    dataIndex: 'CreatedByID',
    key: 'CreatedByID',
    width: 180
}, {
    title: '微信',
    dataIndex: 'Wechat',
    key: 'Wechat',
    width: 160
}, {
    title: 'QQ',
    dataIndex: 'QQ',
    key: 'QQ',
    width: 160
}, {
    title: '线索来源',
    dataIndex: 'Source',
    key: 'Source',
    width: 260
}, {
    title: '描述',
    dataIndex: 'Description',
    key: 'Description',
    width:160
}, {
    title: '电话',
    dataIndex: 'Phone',
    key: 'Phone',
    width: 160
}, {
    title: '已转化客户',
    dataIndex: 'TransedAccountID',
    key: 'TransedAccountID',
    width: 280
}, {
    title: '已转化联系人',
    dataIndex: 'TransedContactID',
    key: 'TransedContactID',
    width: 280
}]



export default class DispatchClues extends React.Component {
    constructor(props, context) {
        super(props, context)

        this.state = {
            pagination: {},
            loading: false,
            visible: false,
            selectedRowKeys:[]
        }
    }



    componentDidMount(){
        const { dispatchCluesState,actions } = this.props
        const dispatchState = dispatchCluesState.toJS().dispatchState

        this.fetchTableData({
            assigned:dispatchState,//0未分派,1已分派未处理 不传默认0
            rowsPerPage: 10
        })



    }

    fetchTableData(params = {canAssign:1}){
        const { dispatchCluesState,actions } = this.props


        //console.log('请求参数：', params);
        this.setState({ loading: true });
        reqwest({
            url:SCRM.url('/scrmlead/index/getAssignList'),
            method:'post',
            data:params,
            type:'json',
            error:  (result) => {
                message.error(result.error)
            },
            success:(result) => {

                const pagination = this.state.pagination;
                const rowData = result.data.rowData;
                pagination.total = result.data.total*1;

                this.setState({
                    loading:false,
                    pagination,
                })
                actions.fetchData(true,rowData)
            }
        })


    }

    handleTableChange(pagination) {
        const { dispatchCluesState,actions } = this.props
        const dispatchState = dispatchCluesState.toJS().dispatchState
        const pager = this.state.pagination;
        const owner = this.state.owner;
        //  清空select状态
        if(this.refs.tableList){
            this.refs.tableList.setState({
                selectedRowKeys:[]
            })
        }


        pager.current = pagination.current;

        this.setState({
            pagination: pager
        });

        this.fetchTableData({
            rowsPerPage : pagination.pageSize,
            page : pagination.current,
            assigned:dispatchState,//0未分派,1已分派未处理 不传默认0
            owner,
        });
    }

    renderTableList(){
        const { dispatchCluesState ,actions } = this.props
        const { rowData, loading, dispatchState } = dispatchCluesState.toJS()

        //未分派0
        if(dispatchState === 0){
            const rowSelection = {
                onChange: this.onSelectChange.bind(this)
            };
            return (
                loading  ? <Table ref="tableList"
                                  onChange={this.handleTableChange.bind(this)}
                                  loading={this.state.loading}
                                  pagination={this.state.pagination}
                                  rowSelection={rowSelection}
                                  columns={columns}
                                  dataSource={rowData} /> : <div className="loading-box"><Spin  /></div>
            )
        }else if(dispatchState === 1){
            return (
                loading  ? <Table ref="tableList"
                                  onChange={this.handleTableChange.bind(this)}
                                  loading={this.state.loading}
                                  pagination={this.state.pagination}
                                  columns={columns}
                                  dataSource={rowData} /> : <div className="loading-box"><Spin  /></div>
            )
        }

    }

    handClickTab(state){
        const { dispatchCluesState,actions } = this.props
        const dispatchState = dispatchCluesState.toJS().dispatchState

        if(state === dispatchState) return;

        this.setState({
            pagination: {}
        })
        actions.clickTab(state,false)

        this.fetchTableData({
            assigned:state,//0未分派,1已分派未处理 不传默认0
        })



    }

    clickSearch(value){
        const val = value.trim()


        this.setState({
            owner:val,
            pagination:{
                current:1
            }
        })

        this.searchFetchData(val)
    }

    searchFetchData(value){
        const { dispatchCluesState ,actions } = this.props
        const dispatchState = dispatchCluesState.toJS().dispatchState


        this.fetchTableData({
            assigned:dispatchState,//0未分派,1已分派未处理 不传默认0
            owner:value
        })

    }

    showModal(){
        const { dispatchCluesState ,actions } = this.props
        const rowData = dispatchCluesState.toJS().selectData

        if(!rowData.length ) {
            message.warn('请先选择要分派的线索!');
            return false;
        }

        this.setState({
            visible:true
        })

        if(!this.state.visible){

            reqwest({
                url:SCRM.url('/deptcomponent/DeptComponent/getUserListForLeadAssign'),
                method:'get',
                type:'json',
                success:(result) => {
                    actions.fetchDeptData(true,result.data)
                }
            })
        }

    }

    cancelModal(){
        this.setState({
            visible:false
        })
    }

    onDeptRadioChange(e){
        const { actions } = this.props

        actions.selectDeptChange(e.target.value)
    }

    handleDispatchOk(){
        const { dispatchCluesState ,actions } = this.props
        const { selectedRadioID, selectData} = dispatchCluesState.toJS()
        const selectIDs = selectData.map((item) => item.ID)



        if(!selectedRadioID){
            message.warn('请选择要分派的人员')
            return false;
        }

        reqwest({
            url:SCRM.url('/scrmlead/index/changeOwner'),
            method:'post',
            data:{
                ownerID:selectedRadioID,
                selectIDs:selectIDs
            },
            type:'json',
            success:(result) => {
                //  清空select状态
                if(this.refs.tableList){
                    this.refs.tableList.setState({
                        selectedRowKeys:[]
                    })
                }

                actions.updateTableData(selectIDs);
                this.setState({
                    visible:false
                },() => {
                    actions.selectChange([], [])
                    message.success('分派成功！')
                })
            }
        })

    }

    renderModalBox(){
        const { dispatchCluesState ,actions } = this.props
        const deptData = dispatchCluesState.toJS().deptData

        return (
            <div>

                <Modal ref="modal"
                       visible={ this.state.visible }
                       title="选择要分派的人员" onOk={this.handleOk} onCancel={this.cancelModal.bind(this)}
                       footer={[
                <Button key="back" type="ghost" size="large" onClick={this.cancelModal.bind(this)}>取消</Button>,
                <Button key="submit" type="primary" size="large"  onClick={this.handleDispatchOk.bind(this)}>
                  确定分派
                </Button>]}>
                    {
                        <div>
                            <div className="ds-dept-list">

                                <div  className = { !deptData.length ? "loading-box" : "loading-box hidden" }>
                                    <Spin  />
                                </div>
                                <RadioGroup onChange={this.onDeptRadioChange.bind(this)} >
                                    {
                                        deptData.map((item, index) => {
                                            return (
                                                <Radio  key={ index } value={item.ID} className ="radio-item">
                                                    <div className="photo clearfix">
                                                        <img src={ item.Avatar ? item.Avatar :'/front/images/scrm/default_avatar.png' }/>
                                                        <p className="name">{ item.Name }</p>
                                                    </div>
                                                </Radio>

                                            )
                                        })
                                    }
                                </RadioGroup>
                            </div>
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


    render() {
        const { dispatchCluesState ,actions } = this.props
        const dispatchState = dispatchCluesState.toJS().dispatchState

        return (
            <div style={{marginLeft: '20px'}}>
                <div className="col-right">
                    <div style={{marginTop: '14px',marginBottom: '14px'}}>

                    <Row>
                        <Col span="16">
                            <SearchInput  placeholder="输入线索负责人" style={{ width: 200 }} onSearch = { this.clickSearch.bind(this) } {...this.props}  />
                        </Col>

                        <Col span="8">
                            <button className = { dispatchState === 0 ? "col-cktop-btn " : "col-cktop-btn hidden" }  onClick = { this.showModal.bind(this) }>分派</button>
                        </Col>
                    </Row>
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
