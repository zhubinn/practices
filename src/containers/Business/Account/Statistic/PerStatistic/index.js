/**
 * Created by fuwenfang on 4/7/16.
 */


import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import {searchKeyWord,getAccountPerStatisticData} from 'actions/Business/Account/Statistic/PerStatistic'

import { Table, Icon ,Button,Input, Row, Col} from 'antd';
import SearchInput from 'components/Business/SearchInput'
import QueryDataTable from 'components/Business/QueryDataTable'
import 'containers/Business/index.less'

let statisticColumns = [

    {title: '部门名称', dataIndex: 'Dept', key: 'Dept', width: 150,render: function(text, record, index){
        return (
          <div>{text}</div>
          );
    }},
    {title: '员工姓名', dataIndex: 'Name', key: 'Name', width: 130,render: function(text, record, index){
        const  peneUrl = SCRM.url('/scrmweb/accounts/list?id=' + record.ID);
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
    {title: '全部客户数量', dataIndex: 'All', key: 'All',width: 130,render: function(text, record, index){
        return (
          <div>{text}</div>
          );
    }},
    {title: '负责的客户数量', dataIndex: 'Owner',key: 'Owner', width: 130,render: function(text, record, index){
        return (
          <div>{text}</div>
          );
    }},
    {title: '参与的客户数量', dataIndex: 'Relation', key: 'Relation',width: 130,render: function(text, record, index){
        return (
          <div>{text}</div>
          );
    }},
    {title: '重点客户数量', dataIndex: 'Focus', key: 'Focus',width:130,render: function(text, record, index){
        return (
          <div>{text}</div>
          );
    }}
];


/*统计页面的请求接口*/
let statisticParams = {
    url: SCRM.url('/scrmweb/accounts/getPerStatistic'),
    data: {
      keyword:''
    }
}


class AccountPerStatistic extends React.Component{
  constructor(props) {
        super(props)
    }
  componentDidMount() {
      // 页面初始完,获取统计数据,触发action: GET_DATA
      const {getAccountPerStatisticData} = this.props
      getAccountPerStatisticData(statisticParams)
  }
  //导出报表
  exportTable(){
    let exportParam = {
      objName:'accountPerStatistic',
      keyword:statisticParams['data'].keyword
    }
    let exportParamStr = JSON.stringify(exportParam);
    let p = 'param='+exportParamStr;
    const exportUrl = SCRM.url('/common/scrmExport/export')+'?'+p;
    console.log(exportUrl);
    window.open(exportUrl);
  }
  handleClickSearch(value){
    const {getAccountPerStatisticData} = this.props
    statisticParams['data'].keyword = value
    getAccountPerStatisticData(statisticParams)
  }
  
  render(){
          const {getAccountDeptStatisticData,$$account_perstatistic} = this.props

          const rowData = $$account_perstatistic.toJS().rowData
          let dataSource = []
          rowData.map((r,i)=>{
             r["key"] = i;
             dataSource.push(r)
          })          

          let queryDataTable = {}
         queryDataTable.dataSource = dataSource
         queryDataTable.loading = $$account_perstatistic.toJS().loading


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
                    columns={statisticColumns}
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
                                    getAccountPerStatisticData({
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
        $$account_perstatistic: state.business.account_perstatistic
    }
}

export default connect(mapStateToProps, {
  searchKeyWord,
  getAccountPerStatisticData
})(AccountPerStatistic)