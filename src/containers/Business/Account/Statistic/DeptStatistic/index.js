/**
 * Created by fuwenfang on 4/7/16.
 */


import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import {searchKeyWord,getAccountDeptStatisticData} from 'actions/Business/Account/Statistic/DeptStatistic'

import { Table, Icon ,Button,Input, Row, Col} from 'antd';
import SearchInput from 'components/Business/SearchInput'
import QueryDataTable from 'components/Business/QueryDataTable'
import 'containers/Business/index.less'
import getQueryString from 'components/Business/GetQueryString'



let deptstatisticColumns = [

    {title: '部门名称', dataIndex: 'Name', key: 'Name', width: 220,render: function(text, record, index){
        const  peneUrl = SCRM.url('/scrmweb/accounts/deptstatisticdetail?id=' + record.ID + '&name='+ escape(record.Name).replace(/%u/gi, '\\u'));
        const linkHref = SCRM.url('/scrmweb/accounts/deptstatistic?deptID=' + record.ID);
        const sumHref = SCRM.url('/scrmweb/accounts/deptstatistic');
        if(record.Name == "小计"){
        return (
          <span>
              <a href = {linkHref}>{text}</a>
          </span>
          );
        }else if(record.Name == "合计"){
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
    {title: '全部客户数量', dataIndex: 'All', key: 'All',width: 220,className: 'column-money',
    render: function(text, record, index){
        return (
          <span>{text}</span>
          );
    }},
    {title: '负责的客户数量', dataIndex: 'Owner',key: 'Owner', width: 220,className: 'column-money',
    render: function(text, record, index){
        return (
          <span>{text}</span>
          );
    }},
    // {title: '参与的客户数量', dataIndex: 'Relation', key: 'Relation',width: 150,render: function(text, record, index){
    //     return (
    //       <div>{text}</div>
    //       );
    // }},
    {title: '重点客户数量', dataIndex: 'Focus', key: 'Focus',width: 220,className: 'column-money',
    render: function(text, record, index){
        return (
          <span>{text}</span>
          );
    }}
];


/*统计页面的请求接口*/
let statisticParams = {
    url: SCRM.url('/scrmweb/accounts/getDeptStatistic'),
    data: {
      keyword:'',
      deptID:getQueryString("deptID")
    }
}


class AccountDeptStatistic extends React.Component{
  constructor(props) {
        super(props)
    }
  componentDidMount() {
      // 页面初始完,获取统计数据,触发action: GET_DATA
    const {getAccountDeptStatisticData} = this.props
    getAccountDeptStatisticData(statisticParams)
  }
  //导出报表
  exportTable(){
    let exportParam = {
      objName:'accountDeptStatistic',
      keyword:statisticParams['data'].keyword
    }
    let exportParamStr = JSON.stringify(exportParam);
    let p = 'param='+exportParamStr;
    const exportUrl = SCRM.url('/common/scrmExport/export')+'?'+p;
    console.log(exportUrl);
    window.open(exportUrl);
  }
  handleClickSearch(value){
    const {getAccountDeptStatisticData} = this.props
    statisticParams['data'].keyword = value
    getAccountDeptStatisticData(statisticParams)
  }
  
  render(){
          const {getAccountDeptStatisticData} = this.props

          const rowData = this.props.$$account_deptstatistic.toJS().rowData

          let dataSource = []
          rowData.map((r,i)=>{
             r["key"] = i;
             dataSource.push(r)
          })  

        let queryDataTable = {}
        queryDataTable.dataSource = dataSource
        queryDataTable.loading = this.props.$$account_deptstatistic.toJS().loading



          return (
              <div className="ck-root-main">
                  <div className="ck-root-title">

                      <Row>
                            <Col span="10"><SearchInput  onSearch = {this.handleClickSearch.bind(this)}/> </Col>
                            <Col span="2" offset="12" style = {{textAlign: 'right'}}>
                                <Button type="ghost" onClick = {e=>this.exportTable(this)}>导出</Button>
                            </Col>
                        </Row>                     


                  </div>

                <QueryDataTable
                    columns={deptstatisticColumns}
                    checkMode={false}
                    pagination = {false}
                    rowClassName = {
                      function(record, index){
                        if (record.Name == "小计" || record.Name == "合计") {
                          return "amountClassName";
                        }
                        return "";
                      }
                    }                   
                    {...queryDataTable}
                    onGetTableData={

                                (obj)=>{
                                    this.refs.searchInput.emptyInput()
                                    getAccountDeptStatisticData({
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
        $$account_deptstatistic: state.business.account_deptstatistic,
    }
}

export default connect(mapStateToProps, {
  searchKeyWord,
  getAccountDeptStatisticData
})(AccountDeptStatistic)