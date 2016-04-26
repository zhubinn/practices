/**
 * Created by fuwenfang on 4/7/16.
 */


import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import basic from './css/basic_new_v2.css'
import Statistic from './css/Statistic.less'

import {searchKeyWord,getAccountStatisticData} from 'actions/Business/Account/Statistic'

import { Table, Icon } from 'antd';

let statisticColumns = [

    {title: '部门名称', dataIndex: 'Name', key: 'Name', width: 150,render: function(text, record, index){
        return (
          <div>
            <a href = "#" title = {text}>{text}</a>
          </div>
          );
    }},
    {title: '全部客户数量', dataIndex: 'All', key: 'All',width: 150,render: function(text, record, index){
        return (
          <div>{text}</div>
          );
    }},
    {title: '负责的客户数量', dataIndex: 'Owner',key: 'Owner', width: 150,render: function(text, record, index){
        return (
          <div>{text}</div>
          );
    }},
    {title: '参与的客户数量', dataIndex: 'Relation', key: 'Relation',width: 150,render: function(text, record, index){
        return (
          <div>{text}</div>
          );
    }},
    {title: '重点客户数量', dataIndex: 'Focus', key: 'Focus',render: function(text, record, index){
        return (
          <div>{text}</div>
          );
    }}
];


/*统计页面的请求接口*/
let statisticParams = {
    url: 'http://esn.fuwenfang.com/front/js/scrm/fakeData/tableData.php',
    data: {
        page: 1,
        rowsPerPage: 20
    }
}


class AccountStatistic extends React.Component{
  constructor(props) {
        super(props)
    }
  componentDidMount() {
      // 页面初始完,获取统计数据,触发action: GET_DATA
      this.props.getAccountStatisticData(statisticParams)
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
    const textValue = this.props.$$account_statistic.toJS().value
    const {searchKeyWord} = this.props
    searchKeyWord(textValue)
  }
  
  render(){
          const rowData = this.props.$$account_statistic.toJS().rowData
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
                <Table ref = "dataTable"
                 columns={statisticColumns} 
                 dataSource={rowData} 
                 useFixedHeader 
                 pagination = {false}
                />
            </div>
          )
        }
  
}

const mapStateToProps = (state, ownProps) => {

    return {
        $$account_statistic: state.business.account_statistic,
        $$dataTable: state.components.dataTable,
    }
}

export default connect(mapStateToProps, {
  searchKeyWord,
  getAccountStatisticData
})(AccountStatistic)