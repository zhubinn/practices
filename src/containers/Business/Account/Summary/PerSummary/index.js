/**
 * Created by fuwenfang on 4/7/16.
 */


import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import {searchKeyWord,getAccountPerSummaryData} from 'actions/Business/Account/Summary/PerSummary'

import { Table, Icon ,Button,Input, Row, Col} from 'antd';
import SearchInput from 'components/Business/SearchInput'
import QueryDataTable from 'components/Business/QueryDataTable'
import 'containers/Business/index.less'
let perSummaryColumns = [

    {title: '部门名称', dataIndex: 'Dept', key: 'Dept', width: 150,render: function(text, record, index){
        return (
          <div>{text}</div>
          );
    }},    
    {title: '员工姓名', dataIndex: 'Name', key: 'Name', width: 150,render: function(text, record, index){
        const  peneUrl = SCRM.url('/scrmweb/accounts/peraccountdetail?id=' + record.ID );
        if(record.ID == 0){
        return (
          <div>{text}</div>
          );
        }else{
            return (
            <div>
              <a href = {peneUrl} target="_blank">{text}</a>
            </div>
            );   
        }
    }},
    {title: '全部客户数量', dataIndex: 'Accounts', key: 'Accounts',width: 250,render: function(text, record, index){
        return (
          <div>{text}</div>
          );
    }},
    {title: '全部生意数量', dataIndex: 'Business',key: 'Business', width: 200,render: function(text, record, index){
        return (
          <div>{text}</div>
          );
    }},
    {title: '全部预计销售金额', dataIndex: 'AmountPlan', key: 'AmountPlan',width: 200,render: function(text, record, index){
        return (
          <div>{parseFloat(text).toFixed(2)}</div>
          );
    }},
    {title: '全部成交金额', dataIndex: 'Amount', key: 'Amount',width: 200,render: function(text, record, index){
        return (
          <div>{parseFloat(text).toFixed(2)}</div>
          );
    }},
    {title: '全部回款金额', dataIndex: 'Payment', key: 'Payment',width: 200,render: function(text, record, index){
        return (
          <div>{parseFloat(text).toFixed(2)}</div>
          );
    }},
    {title: '全部输单金额', dataIndex: 'Failed', key: 'Failed',width: 200,render: function(text, record, index){
        return (
          <div>{parseFloat(text).toFixed(2)}</div>
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
      getAccountPerSummaryData(summaryParams)
  }
  //导出报表
  exportTable(){
    let exportParam = {
      objName:'accountPerSummary',
      keyword:summaryParams['data'].keyword
    }
    let exportParamStr = JSON.stringify(exportParam);
    let p = 'param='+exportParamStr;
    const exportUrl = SCRM.url('/common/scrmExport/export')+'?'+p;
    console.log(exportUrl);
    window.open(exportUrl);
  }
  //搜索
  handleClickSearch(value){
    const {getAccountPerSummaryData} = this.props
    summaryParams['data'].keyword = value
    getAccountPerSummaryData(summaryParams)
  }
  
  render(){
          const {getAccountPerSummaryData,$$account_persummary} = this.props

          const rowData = $$account_persummary.toJS().rowData
          let dataSource = []
          rowData.map((r,i)=>{
             r["key"] = i;
             dataSource.push(r)
          })  

         let queryDataTable = {}
         queryDataTable.dataSource = dataSource
         queryDataTable.loading = $$account_persummary.toJS().loading



          return (
          <div className="ck-root-main">

              <div className="ck-root-title">
                        <Row>
                            <Col span="10"><SearchInput  onSearch = {this.handleClickSearch.bind(this)}/> </Col>
                            <Col span="2" offset="12" style = {{textAlign: 'right'}}>
                                <Button type="ghost" onClick = {this.exportTable.bind(this)}>导出</Button>
                            </Col>
                        </Row>                     

                </div>
                <QueryDataTable
                    columns={perSummaryColumns}
                    checkMode={false}
                    pagination = {false}
                    rowClassName = {
                      function(record, index){
                        record.ID == 0?"amountClassName":""
                        }
                    }
                    {...queryDataTable}
                    onGetTableData={

                                (obj)=>{
                                    this.refs.searchInput.emptyInput()
                                    getAccountPerSummaryData({
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
        $$account_persummary: state.business.account_persummary,
    }
}

export default connect(mapStateToProps, {
  searchKeyWord,
  getAccountPerSummaryData
})(AccountPerSummary)