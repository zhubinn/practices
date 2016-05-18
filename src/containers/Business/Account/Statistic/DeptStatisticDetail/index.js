/**
 * Created by fuwenfang on 4/7/16.
 */


import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import {searchKeyWord,getAccountStatisticDetailData} from 'actions/Business/Account/Statistic/DeptStatisticDetail'

import { Table, Icon ,Button,Input, Row, Col} from 'antd';
import SearchInput from 'components/Business/SearchInput'
import QueryDataTable from 'components/Business/QueryDataTable'

let statisticDetailColumns = [

    {title: '部门名称', dataIndex: 'DeptName', key: 'DeptName', width: 150,render: function(text, record, index){
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

      getAccountStatisticDetailData(statisticDetailParams)
  }
  //导出报表
  exportTable(){
    let exportParam = {
      objName:'accountStatisticDetail',
      keyword:statisticDetailParams['data'].keyword,
      deptID:typeof id === 'undefined' ? -1 :id,
      deptName:typeof name === 'undefined' ? '':name
    }
    let exportParamStr = JSON.stringify(exportParam);
    let p = 'param='+exportParamStr;
    const exportUrl = SCRM.url('/common/scrmExport/export')+'?'+p;
    console.log(exportUrl);
    window.open(exportUrl);
  }
  handleClickSearch(value){
    const {getAccountStatisticDetailData} = this.props
    statisticDetailParams['data'].keyword = value
    getAccountStatisticDetailData(statisticDetailParams)
  }

  
  render(){
          const {getAccountStatisticDetailData} = this.props

          const rowData = this.props.$$account_deptstatisticdetail.toJS().rowData
          
          let dataSource = []
          rowData.map((r,i)=>{
             r["key"] = i;
             dataSource.push(r)
          }) 

          let queryDataTable = {}
         queryDataTable.dataSource = dataSource
         queryDataTable.loading = this.props.$$account_deptstatisticdetail.toJS().loading




          return (
            <div style={{marginLeft: '20px'}}>
                <div className = "col_cktop">
                  <div className="col_cktop-gongneng">
                        <Row>
                            <Col span="10"><SearchInput  onSearch = {this.handleClickSearch.bind(this)}/> </Col>
                            <Col span="2" offset="12">
                                <Button type="ghost" onClick = {this.exportTable.bind(this)}>导出</Button>
                            </Col>
                        </Row>                     
                  </div>  
                </div>
                
                <QueryDataTable
                    columns={statisticDetailColumns}
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
                                    getAccountStatisticDetailData({
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
        $$account_deptstatisticdetail: state.business.account_deptstatisticdetail
    }
}

export default connect(mapStateToProps, {
  searchKeyWord,
  getAccountStatisticDetailData
})(AccountStatisticDetail)