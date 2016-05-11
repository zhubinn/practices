/**
 * Created by fuwenfang on 4/7/16.
 */


import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import basic from '../css/basic_new_v2.css'
import Statistic from '../css/Statistic.less'

import {searchKeyWord,getAccountDeptStatisticData} from 'actions/Business/Account/Statistic/DeptStatistic'

import { Table, Icon ,Button,Input, Row, Col} from 'antd';
import SearchInput from 'components/Business/SearchInput'


let deptstatisticColumns = [

    {title: '部门名称', dataIndex: 'Name', key: 'Name', width: 150,render: function(text, record, index){
        const  peneUrl = SCRM.url('/scrmweb/accounts/deptstatisticdetail?id=' + record.ID + '&name='+record.Name);
        if(record.ID == 0){
        return (
          <div className = {record.ID == 0?'statisticSumColumn':''}>{text}</div>
          );
        }else{
            return (
            <div className = {record.ID == 0?'statisticSumColumn':''}>
              <a href = {peneUrl} target="_blank" title = {text}>{text}</a>
            </div>
            );   
        }
    }},
    {title: '全部客户数量', dataIndex: 'All', key: 'All',width: 150,render: function(text, record, index){
        return (
          <div className = {record.ID == 0?'statisticSumColumn':''}>{text}</div>
          );
    }},
    {title: '负责的客户数量', dataIndex: 'Owner',key: 'Owner', width: 150,render: function(text, record, index){
        return (
          <div className = {record.ID == 0?'statisticSumColumn':''}>{text}</div>
          );
    }},
    {title: '参与的客户数量', dataIndex: 'Relation', key: 'Relation',width: 150,render: function(text, record, index){
        return (
          <div className = {record.ID == 0?'statisticSumColumn':''}>{text}</div>
          );
    }},
    {title: '重点客户数量', dataIndex: 'Focus', key: 'Focus',width: 250,render: function(text, record, index){
        return (
          <div className = {record.ID == 0?'statisticSumColumn':''}>{text}</div>
          );
    }}
];


/*统计页面的请求接口*/
let statisticParams = {
    url: SCRM.url('/scrmweb/accounts/getDeptStatistic'),
    data: {
      keyword:''
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
          const rowData = this.props.$$account_deptstatistic.toJS().rowData
          const loading = this.props.$$account_deptstatistic.toJS().loading
          let dataSource = []
          rowData.map((r,i)=>{
             r["key"] = i;
             dataSource.push(r)
          })  
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
                <div className = "statisticdataTableWrap">
                  <div className = "deptStatiticdataTableCon">
                       <Table ref = "dataTable"
                       columns={deptstatisticColumns} 
                       dataSource={dataSource} 
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
        $$account_deptstatistic: state.business.account_deptstatistic,
    }
}

export default connect(mapStateToProps, {
  searchKeyWord,
  getAccountDeptStatisticData
})(AccountDeptStatistic)