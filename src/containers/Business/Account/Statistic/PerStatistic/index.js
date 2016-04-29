/**
 * Created by fuwenfang on 4/7/16.
 */


import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import basic from '../css/basic_new_v2.css'
import Statistic from '../css/Statistic.less'

import {searchKeyWord,getAccountPerStatisticData} from 'actions/Business/Account/Statistic/PerStatistic'

import { Table, Icon } from 'antd';

let statisticColumns = [

    {title: '部门名称', dataIndex: 'Dept', key: 'Dept', width: 150,render: function(text, record, index){
        return (
          <div className = {record.ID == 0?'statisticSumColumn':''}>{text}</div>
          );
    }},
    {title: '员工姓名', dataIndex: 'Name', key: 'Name', width: 130,render: function(text, record, index){
        const  peneUrl = SCRM.url('/scrmweb/accounts/list?id=' + record.ID);
        return (
          <div className = {record.ID == 0?'statisticSumColumn':''}>
            <a href = {peneUrl} title = {text}>{text}</a>
          </div>
          );
    }},
    {title: '全部客户数量', dataIndex: 'All', key: 'All',width: 130,render: function(text, record, index){
        return (
          <div className = {record.ID == 0?'statisticSumColumn':''}>{text}</div>
          );
    }},
    {title: '负责的客户数量', dataIndex: 'Owner',key: 'Owner', width: 130,render: function(text, record, index){
        return (
          <div className = {record.ID == 0?'statisticSumColumn':''}>{text}</div>
          );
    }},
    {title: '参与的客户数量', dataIndex: 'Relation', key: 'Relation',width: 130,render: function(text, record, index){
        return (
          <div className = {record.ID == 0?'statisticSumColumn':''}>{text}</div>
          );
    }},
    {title: '重点客户数量', dataIndex: 'Focus', key: 'Focus',width:130,render: function(text, record, index){
        return (
          <div className = {record.ID == 0?'statisticSumColumn':''}>{text}</div>
          );
    }}
];


/*统计页面的请求接口*/
let statisticParams = {
    url: SCRM.url('/scrmweb/accounts/getPerStatistic'),
    data: {
    }
}


class AccountPerStatistic extends React.Component{
  constructor(props) {
        super(props)
    }
  componentDidMount() {
      // 页面初始完,获取统计数据,触发action: GET_DATA
      this.props.getAccountPerStatisticData(statisticParams)
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
    const textValue = this.props.$$account_perstatistic.toJS().value
    const {searchKeyWord} = this.props
    searchKeyWord(textValue)
  }
  
  render(){
          const rowData = this.props.$$account_perstatistic.toJS().rowData
          const loading = this.props.$$account_perstatistic.toJS().loading
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
                
                <div className = "statisticdataTableWrap">
                    <div className = "perStatiticdataTableCon">
                      <Table ref = "dataTable"
                       columns={statisticColumns} 
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
        $$account_perstatistic: state.business.account_perstatistic
    }
}

export default connect(mapStateToProps, {
  searchKeyWord,
  getAccountPerStatisticData
})(AccountPerStatistic)