
/**
 * Created by ytm on 4/7/16.
 */

import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import classNames from 'classnames'
import { Row, Col, Table, Radio, Button, Input, Pagination, Modal, DatePicker} from 'antd'
import SearchInput from 'components/Business/SearchInput'
import QueryDataTable from 'components/Business/QueryDataTable'
import {getDataLogData, pageSizeChange, exportShow, exportHide}  from 'actions/business/Log/DataLog'
import 'antd/lib/index.css'
const RangePicker = DatePicker.RangePicker;
//table列表数据接口
let DataLogParams = {
    //url: 'http://esn.yangtianming.com/front/js/scrm/fakeData/logData.php',
    url: 'http://esn.yangtianming.com/scrmoplog/index/opdetaillogIndex',
    data: {
        page: 1,
        pageSize: 10,
        keyword:''
    }
}


class DataLog extends React.Component {
    constructor(props) {
      super(props)
      // this.searchInputChange = this.searchInputChange.bind(this)
      // this.searchTimer;
      this.state = {
        visible: false 
      };
    }

    componentDidMount() {
      this.props.getDataLogData(DataLogParams);
    }

    // searchInputChange(val) {
    //   clearTimeout(this.searchTimer)
    //   this.searchTimer = setTimeout(() => { this.props.getDataLogData(DataLogParams) }, 300);
    // }

    // 普通搜索和筛选(高级搜索)互斥
    normalSearch = (value) => {
        // 重置筛选(高级搜索)
        this.refs.queryDataTable.resetQueryForm()

        this.refs.queryDataTable.clearCheckedAndExpanded()
        this.props.getTableData({
            data: {
                searchData: [],
                keyword: value,
                page: 1,
                pageSize: 0
            }
        })


    }

    changeType = (type) => {
        // 重置筛选(高级搜索)
        this.refs.searchInput.emptyInput()
        this.refs.queryDataTable.resetQueryForm()
        this.refs.queryDataTable.clearCheckedAndExpanded()
        this.props.getDataLogData({
            data: {
                searchData: [],
                keyword: '',
                page: 1,
                pageSize: 0,
                type
            }
        })

    }

    showModal() {
      this.props.exportShow()
    }

    handleOk() {
      this.props.exportHide()
    }

    handleCancel(e) {
      this.props.exportHide()
    }

    exportTimeChange(value){
      console.log('From: ', value[0], ', to: ', value[1]);
      this.props.exportHide()
    }

    render() {
        //table数据配置
        const { $$logState } = this.props;
        // const dataSource = $$logState.get('tableData').get('data').get('rowData').toJS();
        const columns = $$logState.get('tableColumns').toJS();
        
        const expotModal = $$logState.get('export').get('visible');
        //分页配置
        // const pageSize = $$logState.get('tableData').get('data').get('pageSize');
        // const pageTotal = $$logState.get('tableData').get('data').get('total');
        // const pageCurrent = $$logState.get('tableData').get('data').get('current');
        // const pagination = {
        //   current: pageCurrent,
        //   total: pageTotal,
        //   pageSize:pageSize,
        //   showSizeChanger: true,
        //   showQuickJumper: true,
        //   onShowSizeChange: this.onShowSizeChange.bind(this),
        //   onChange: this.pageOnChange.bind(this),
        //   showTotal: this.showPageTotal
        // };

        let queryDataTable = {}
        queryDataTable.dataSource = $$logState.get('tableData').get('data').get('rowData').toJS();
        queryDataTable.current = $$logState.get('tableData').get('data').get('current');
        queryDataTable.total = $$logState.get('tableData').get('data').get('total');
        queryDataTable.pageSize = $$logState.get('tableData').get('data').get('pageSize');
        //queryDataTable.queryColumns = $$account_list_person.toJS().queryColumns
        //queryDataTable.loading = $$account_list_person.toJS().loading

        return (
            <div  style = {{marginLeft: '20px'}} >
              <Row>
                <Col span="10">
                  <SearchInput ref="searchInput" onSearch = {this.searchInputChange} />
                </Col>
                <Col span="14" style = {{ textAlign: 'right' }}>
                  <Button type="primary" style = {{marginRight: '10px'}}>筛选</Button>
                  <Button type="ghost" onClick = { this.showModal.bind(this) }>导出EXCEL</Button>
                </Col>
              </Row>
              <QueryDataTable
                    columns={columns}
                    checkMode={false}
                    {...queryDataTable}
                    onGetTableData={

                                (obj)=>{
                                    this.refs.searchInput.emptyInput()
                                    getDataLogData({
                                        data: obj
                                    })
                                }
                            }
                    ref="queryDataTable"
                >
                </QueryDataTable>
                <Modal title="导出日志" visible={expotModal}
                onOk={this.handleOk.bind(this)} onCancel={this.handleCancel.bind(this)}>
                  <RangePicker showTime format="yyyy/MM/dd HH:mm:ss" onChange={this.exportTimeChange.bind(this)} />
                </Modal>
            </div>
        )
    }
}

const mapStateToProps = (state, ownProps) => {
    return {
      $$logState: state.business.datalog
    }
}

export default connect(mapStateToProps, {
    getDataLogData,
    pageSizeChange,
    exportShow,
    exportHide,
})(DataLog)