/**
 * Created by fuwenfang on 4/7/16.
 */


import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import basic from '../css/basic_new_v2.css'
import Statistic from '../css/Summary.less'

import {searchKeyWord,getAccountPerSummaryData} from 'actions/Business/Account/Summary/PerSummary'

import { Table, Icon ,Button,Input, Row, Col} from 'antd';
import SearchInput from 'components/Business/SearchInput'

let perSummaryColumns = [

    {title: '部门名称', dataIndex: 'Dept', key: 'Dept', width: 150,render: function(text, record, index){
        return (
          <div className = {record.ID == 0?'summarySumColumn':''}>{text}</div>
          );
    }},    
    {title: '员工姓名', dataIndex: 'Name', key: 'Name', width: 150,render: function(text, record, index){
        const  peneUrl = SCRM.url('/scrmweb/accounts/peraccountdetail?id=' + record.ID );
        if(record.ID == 0){
        return (
          <div className = 'summarySumColumn'>{text}</div>
          );
        }else{
            return (
            <div className = {record.ID == 0?'summarySumColumn':''}>
              <a href = {peneUrl} target="_blank" title = {text}>{text}</a>
            </div>
            );   
        }
    }},
    {title: '全部客户数量', dataIndex: 'Accounts', key: 'Accounts',width: 250,render: function(text, record, index){
        return (
          <div className = {record.ID == 0?'summarySumColumn':''}>{text}</div>
          );
    }},
    {title: '全部生意数量', dataIndex: 'Business',key: 'Business', width: 200,render: function(text, record, index){
        return (
          <div className = {record.ID == 0?'summarySumColumn':''}>{text}</div>
          );
    }},
    {title: '全部预计销售金额', dataIndex: 'AmountPlan', key: 'AmountPlan',width: 200,render: function(text, record, index){
        return (
          <div className = {record.ID == 0?'summarySumColumn':''}>{parseFloat(text).toFixed(2)}</div>
          );
    }},
    {title: '全部成交金额', dataIndex: 'Amount', key: 'Amount',width: 200,render: function(text, record, index){
        return (
          <div className = {record.ID == 0?'summarySumColumn':''}>{parseFloat(text).toFixed(2)}</div>
          );
    }},
    {title: '全部回款金额', dataIndex: 'Payment', key: 'Payment',width: 200,render: function(text, record, index){
        return (
          <div className = {record.ID == 0?'summarySumColumn':''}>{parseFloat(text).toFixed(2)}</div>
          );
    }},
    {title: '全部输单金额', dataIndex: 'Failed', key: 'Failed',width: 200,render: function(text, record, index){
        return (
          <div className = {record.ID == 0?'summarySumColumn':''}>{parseFloat(text).toFixed(2)}</div>
          );
    }}
];


/*统计页面的请求接口*/
let summaryParams = {
    url: SCRM.url('/scrmweb/accounts/getPerSummary'),
    data: {
      keyword:''
    }
}


class AccountPerSummary extends React.Component{
  constructor(props) {
        super(props)
    }
  componentDidMount() {
      // 页面初始完,获取统计数据,触发action: GET_DATA
      const {getAccountPerSummaryData} = this.props
      this.props.getAccountPerSummaryData(summaryParams)
  }
  exportTable(e){
    e.preventDefault()
    alert('导出报表接口')

  }
  handleClickSearch(value){
    const {getAccountPerSummaryData} = this.props
    summaryParams['data'].keyword = value
    getAccountPerSummaryData(summaryParams)
  }
  
  render(){
          const rowData = this.props.$$account_persummary.toJS().rowData
          const loading = this.props.$$account_persummary.toJS().loading
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
                  <div className = "perSummarydataTableCon">
                      <Table ref = "dataTable"
                       columns={perSummaryColumns} 
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
        $$account_persummary: state.business.account_persummary,
    }
}

export default connect(mapStateToProps, {
  searchKeyWord,
  getAccountPerSummaryData
})(AccountPerSummary)