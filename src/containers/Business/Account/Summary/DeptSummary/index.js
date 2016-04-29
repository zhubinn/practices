/**
 * Created by fuwenfang on 4/7/16.
 */


import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import basic from '../css/basic_new_v2.css'
import Statistic from '../css/Summary.less'

import {searchKeyWord,getAccountDeptSummaryData} from 'actions/Business/Account/Summary/DeptSummary'

import { Table, Icon } from 'antd';

let deptSummaryColumns = [

    {title: '部门名称', dataIndex: 'Name', key: 'Name', width: 150,render: function(text, record, index){
        const  peneUrl = SCRM.url('/scrmweb/accounts/deptsummarydetail?id=' + record.ID + '&name='+record.Name);
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
          <div className = {record.ID == 0?'summarySumColumn':''}>{text}</div>
          );
    }},
    {title: '全部成交金额', dataIndex: 'Amount', key: 'Amount',width: 200,render: function(text, record, index){
        return (
          <div className = {record.ID == 0?'summarySumColumn':''}>{text}</div>
          );
    }},
    {title: '全部回款金额', dataIndex: 'Payment', key: 'Payment',width: 200,render: function(text, record, index){
        return (
          <div className = {record.ID == 0?'summarySumColumn':''}>{text}</div>
          );
    }},
    {title: '全部输单金额', dataIndex: 'Failed', key: 'Failed',width: 200,render: function(text, record, index){
        return (
          <div className = {record.ID == 0?'summarySumColumn':''}>{text}</div>
          );
    }}
];


/*统计页面的请求接口*/
let summaryParams = {
    url: SCRM.url('/scrmweb/accounts/getDeptSummary'),
    data: {
    }
}


class AccountDeptSummary extends React.Component{
  constructor(props) {
        super(props)
    }
  componentDidMount() {
      // 页面初始完,获取统计数据,触发action: GET_DATA
      this.props.getAccountDeptSummaryData(summaryParams)
  }
  exportTable(){
    alert('导出报表接口')

  }
  handleOnChange(e){
      const textValue = e.currentTarget.value;
      const {changeInputVal} = this.props
      changeInputVal(textValue)
    }
  handleClickSearch(e){
    const textValue = this.props.$$account_deptsummary.toJS().value
    const {searchKeyWord} = this.props
    searchKeyWord(textValue)
  }
  
  render(){
          const rowData = this.props.$$account_deptsummary.toJS().rowData
          const loading = this.props.$$account_deptsummary.toJS().loading
          return (
            <div style={{marginLeft: '20px'}}>
                <div className = "col_cktop">
                  <div className="col_cktop-gongneng clearfix">
                     <div className="col_cktop-Hightsearch">
                         <input type="text" className="Hightsearch_input" onChange = {this.handleOnChange.bind(this)}/>
                         <button onClick = {this.handleClickSearch.bind(this)}>搜索</button>
                     </div>
                     <button className="col_cktop-btnFpai" onClick={this.exportTable.bind(this)}>导出EXCEL</button>
                  </div>  
                </div>
                <div className = "summarydataTableWrap">
                  <div className = "deptSummarydataTableCon">
                      <Table ref = "dataTable"
                       columns={deptSummaryColumns} 
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
        $$account_deptsummary: state.business.account_deptsummary,
    }
}

export default connect(mapStateToProps, {
  searchKeyWord,
  getAccountDeptSummaryData
})(AccountDeptSummary)