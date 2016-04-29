/**
 * Created by fuwenfang on 4/7/16.
 */


import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import basic from '../css/basic_new_v2.css'
import Statistic from '../css/Statistic.less'

import {searchKeyWord,getAccountStatisticDetailData} from 'actions/Business/Account/Statistic/DeptStatisticDetail'

import { Table, Icon ,Button,Input, Row, Col} from 'antd';
import SearchInput from 'components/Business/SearchInput'

let statisticDetailColumns = [

    {title: '部门名称', dataIndex: 'DeptName', key: 'DeptName', width: 150,render: function(text, record, index){
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
let statisticDetailParams = {
    url: SCRM.url('/scrmweb/accounts/getDeptStatisticDetail'),
    data: {
      deptID: typeof id === 'undefined' ? -1 :id,
      deptName:typeof name === 'undefined' ? '':name,
      keyword:''
    }
}


class AccountStatisticDetail extends React.Component{
  constructor(props) {
        super(props)
    }
  componentDidMount() {
      // 页面初始完,获取统计数据,触发action: GET_DATA
      const {getAccountStatisticDetailData} = this.props

      this.props.getAccountStatisticDetailData(statisticDetailParams)
  }
  exportTable(e){
    //alert('导出报表接口')

  }
  handleClickSearch(value){
    const {getAccountStatisticDetailData} = this.props
    statisticDetailParams['data'].keyword = value
    getAccountStatisticDetailData(statisticDetailParams)
  }

  
  render(){
          const rowData = this.props.$$account_deptstatisticdetail.toJS().rowData
          const loading = this.props.$$account_deptstatisticdetail.toJS().loading
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
                    <div className = "statisticDetaidataTableCon">
                      <Table ref = "dataTable"
                       columns={statisticDetailColumns} 
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
        $$account_deptstatisticdetail: state.business.account_deptstatisticdetail
    }
}

export default connect(mapStateToProps, {
  searchKeyWord,
  getAccountStatisticDetailData
})(AccountStatisticDetail)