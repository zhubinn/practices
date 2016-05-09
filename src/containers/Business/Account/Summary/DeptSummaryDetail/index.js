/**
 * Created by fuwenfang on 4/7/16.
 */


import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import basic from '../css/basic_new_v2.css'
import Statistic from '../css/Summary.less'

import {searchKeyWord,getAccountSummaryDetailData} from 'actions/Business/Account/Summary/DeptSummaryDetail'

import { Table, Icon ,Button,Input, Row, Col} from 'antd';
import SearchInput from 'components/Business/SearchInput'

let summaryDetailColumns = [

    {title: '部门名称', dataIndex: 'DeptName', key: 'DeptName', width: 200,render: function(text, record, index){
        return (
          <div className = {record.ID == 0?'summarySumColumn':''}>{text}</div>
          );
    }},
    {title: '员工姓名', dataIndex: 'Name', key: 'Name', width: 150,render: function(text, record, index){
        const  peneUrl = SCRM.url('/scrmweb/accounts/peraccountdetail?id=' + record.ID);
        return (
          <div className = {record.ID == 0?'summarySumColumn':''}>
            <a href = {peneUrl} title = {text}>{text}</a>
          </div>
          );
    }},
    {title: '全部客户数量', dataIndex: 'Accounts', key: 'Accounts',width: 150,render: function(text, record, index){
        return (
          <div className = {record.ID == 0?'summarySumColumn':''}>{text}</div>
          );
    }},
    {title: '全部生意数量', dataIndex: 'Business',key: 'Business', width: 150,render: function(text, record, index){
        return (
          <div className = {record.ID == 0?'summarySumColumn':''}>{text}</div>
          );
    }},
    {title: '全部预计销售金额', dataIndex: 'AmountPlan', key: 'AmountPlan',width: 150,render: function(text, record, index){
        return (
          <div className = {record.ID == 0?'summarySumColumn':''}>{parseFloat(text).toFixed(2)}</div>
          );
    }},
    {title: '全部成交金额', dataIndex: 'Amount', key: 'Amount',width:150,render: function(text, record, index){
        return (
          <div className = {record.ID == 0?'summarySumColumn':''}>{parseFloat(text).toFixed(2)}</div>
          );
    }},
    {title: '全部回款金额', dataIndex: 'Payment', key: 'Payment',width:150,render: function(text, record, index){
        return (
          <div className = {record.ID == 0?'summarySumColumn':''}>{parseFloat(text).toFixed(2)}</div>
          );
    }},
    {title: '全部输单金额', dataIndex: 'Failed', key: 'Failed',width:150,render: function(text, record, index){
        return (
          <div className = {record.ID == 0?'summarySumColumn':''}>{parseFloat(text).toFixed(2)}</div>
          );
    }}
];


/*统计页面的请求接口*/
let summaryDetailParams = {
    url: SCRM.url('/scrmweb/accounts/getDeptSummaryDetail'),
    data: {
      deptID: typeof id === 'undefined' ? -1 :id,
      deptName:typeof name === 'undefined' ? '':name,
      keyword:''
    }
}


class AccountSummaryDetail extends React.Component{
  constructor(props) {
        super(props)
    }
  componentDidMount() {
      // 页面初始完,获取统计数据,触发action: GET_DATA
    const {getAccountSummaryDetailData} = this.props
      this.props.getAccountSummaryDetailData(summaryDetailParams)
  }
  //导出报表
  exportTable(){
    let exportParam = {
      objName:'accountSummaryDetail',
      keyword:summaryDetailParams['data'].keyword,
      deptID:typeof id === 'undefined' ? -1 :id,
      deptName:typeof name === 'undefined' ? '':name
    }
    let exportParamStr = JSON.stringify(exportParam);
    let p = 'param='+exportParamStr;
    const exportUrl = SCRM.url('/common/scrmExport/export')+'?'+p;
    console.log(exportUrl);
    window.open(exportUrl);
  }
  //搜索
  handleClickSearch(value){
    const {getAccountSummaryDetailData} = this.props
    summaryDetailParams['data'].keyword = value
    getAccountSummaryDetailData(summaryDetailParams)
  }

  
  render(){
          const rowData = this.props.$$account_deptsummarydetail.toJS().rowData
          const loading = this.props.$$account_deptsummarydetail.toJS().loading
          return (
            <div style={{marginLeft: '20px'}}>
                <div className = "col_cktop">
                  <div className="col_cktop-gongneng">
                        <Row>
                            <Col span="10"><SearchInput  onSearch = {this.handleClickSearch.bind(this)}/> </Col>
                            <Col span="4" offset="10">
                                <Button type="ghost" onClick = {e=>this.exportTable(this)}>导出</Button>
                            </Col>
                        </Row>                     
                  </div> 
                </div>
                
                <div className = "summarydataTableWrap">
                    <div className = "summaryDetaildataTableCon">
                      <Table ref = "dataTable"
                       columns={summaryDetailColumns} 
                       dataSource={rowData} 
                       useFixedHeader 
                       pagination = {false}
                       loading={loading}
                      />
                    </div>               
                </div>
            </div>
          )
        }
  
}

const mapStateToProps = (state, ownProps) => {

    return {
        $$account_deptsummarydetail: state.business.account_deptsummarydetail
    }
}

export default connect(mapStateToProps, {
  searchKeyWord,
  getAccountSummaryDetailData
})(AccountSummaryDetail)