/**
 * Created by fuwenfang on 4/7/16.
 */


import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import {searchKeyWord,getAccountSummaryDetailData} from 'actions/Business/Account/Summary/DeptSummaryDetail'

import { Table, Icon ,Button,Input, Row, Col} from 'antd';
import SearchInput from 'components/Business/SearchInput'
import QueryDataTable from 'components/Business/QueryDataTable'
import 'containers/styles/default/less/index.less'
import getQueryString from 'components/Business/GetQueryString'


let summaryDetailColumns = [

    {title: '部门名称', dataIndex: 'DeptName', key: 'DeptName', width: 150,render: function(text, record, index){
        return (
          <span>{text}</span>
          );
    }},
    {title: '员工姓名', dataIndex: 'Name', key: 'Name', width: 100,render: function(text, record, index){
        const  peneUrl = SCRM.url('/scrmweb/accounts/peraccountdetail?id=' + record.ID);
        if(record.Name == "小计" || record.Name == "合计"){
        return (
          <span>{text}</span>
          );
        }else{
            return (
            <span>
              <a href = {peneUrl} target="_blank">{text}</a>
            </span>
            );   
        }
    }},
    {title: '全部客户数量', dataIndex: 'Accounts', key: 'Accounts',width: 150,className: 'column-money',render: function(text, record, index){
        return (
          <span>{text}</span>
          );
    }},
    {title: '全部生意数量', dataIndex: 'Business',key: 'Business', width: 150,className: 'column-money',render: function(text, record, index){
        return (
          <span>{text}</span>
          );
    }},
    {title: '全部预计销售金额', dataIndex: 'AmountPlan', key: 'AmountPlan',width: 150,className: 'column-money',render: function(text, record, index){
        return (
          <span>{text}</span>
          );
    }},
    {title: '全部成交金额', dataIndex: 'Amount', key: 'Amount',width:150,className: 'column-money',render: function(text, record, index){
        return (
          <span>{text}</span>
          );
    }},
    {title: '全部回款金额', dataIndex: 'Payment', key: 'Payment',width:150,className: 'column-money',render: function(text, record, index){
        return (
          <span>{text}</span>
          );
    }},
    {title: '全部输单金额', dataIndex: 'Failed', key: 'Failed',width:150,className: 'column-money',render: function(text, record, index){
        return (
          <span>{text}</span>
          );
    }}
];


/*统计页面的请求接口*/
let id = getQueryString("id")?getQueryString("id"): -1
let name = getQueryString("name")? getQueryString("name"):''

let summaryDetailParams = {
    url: SCRM.url('/scrmweb/accounts/getDeptSummaryDetail'),
    data: {
      deptID: id,
      deptName:unescape(name.replace(/\\u/gi, '%u')),
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
      getAccountSummaryDetailData(summaryDetailParams)
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
    window.open(exportUrl);
  }
  //搜索
  handleClickSearch(value){
    const {getAccountSummaryDetailData} = this.props
    summaryDetailParams['data'].keyword = value
    getAccountSummaryDetailData(summaryDetailParams)
  }

  
  render(){

          const {getAccountSummaryDetailData,$$account_deptsummarydetail} = this.props

          const rowData = $$account_deptsummarydetail.toJS().rowData
          let dataSource = []
          rowData.map((r,i)=>{
             r["key"] = i;
             dataSource.push(r)
          })      

         let queryDataTable = {}
         queryDataTable.dataSource = dataSource
         queryDataTable.loading = $$account_deptsummarydetail.toJS().loading



          return (
          <div className="ck-root-main">
              <div className="ck-root-title">
                        <Row>
                            <Col span="10"><SearchInput  onSearch = {this.handleClickSearch.bind(this)}/> </Col>
                            <Col span="2" offset="12">
                                <Button type="ghost" onClick = {e=>this.exportTable(this)}>导出</Button>
                            </Col>
                        </Row>                     
                  </div> 
                
                <QueryDataTable
                    columns={summaryDetailColumns}
                    checkMode={false}
                    pagination = {false}
                    rowClassName = {
                      function(record, index){
                        if (record.DeptName == "小计" || record.DeptName == "合计") {
                          return "amountClassName";
                        }
                        return "";
                      }
                    }
                    {...queryDataTable}
                    onGetTableData={

                                (obj)=>{
                                    this.refs.searchInput.emptyInput()
                                    getAccountSummaryDetailData({
                                        data: obj
                                    })
                                }
                            }
                    ref="queryDataTable"
                >
                </QueryDataTable>
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