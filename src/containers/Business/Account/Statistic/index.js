/**
 * Created by fuwenfang on 4/7/16.
 */


import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import basic from './css/basic_new_v2.css'
import Statistic from './css/Statistic.less'

import DataTable from 'components/Business/DataTable'
import  { initSource,getData}  from 'actions/Component/DataTable'
import {rowsData, searchColumns} from 'components/Business/DataTable/fakeData'

import {updateIsPene,searchKeyWord} from 'actions/Business/Account/Statistic'

import { Modal, Button } from 'antd';

let statisticColumns = [

    {text: '部门名称', datafield: 'name', width: 120,cellsrenderer: function(rowData, column, value){
      if(role==0){
        return (
          <a href = "http://esn.fuwenfang.com/scrmweb/accounts/detail/VISITID/1" title = {value}>{value}</a>
          );
      }else{
        return(
          <div title = {value}>{value}</div>
        )
      }
    }},
    {text: '员工姓名', datafield: 'user', width: 70,cellsrenderer: function(rowData, column, value){
      if(role==0){
        return (
          <a href = "http://esn.fuwenfang.com/scrmweb/accounts/detail/VISITID/1" title = {value}>{value}</a>
          );
      }else{
        return(
          <div title = {value}>{value}</div>
        )
      }
    }},
    {text: '创建时间', datafield: 'date', width: 160},
    {text: '停止时间', datafield: 'NpStopTime'},
    {text: 'ID', datafield: 'ID', width: 130, headerrenderer: function(){
        return (<select>
            <option>全部类型</option>
            <option>系统</option>
            <option>自定义</option>
        </select>)
    }},
    {text: '系统', datafield: 'IsSys', width: 50, cellsrenderer: function(rowData, column, value){

        return  value == '1' ? '是' : '否'

    }
    }
];

//假定角色  0 领导以及部门负责人；1 普通员工 
const role = 0


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
        const id = this.refs.dataTable.identity
        this.props.initSource(id)
      // 页面初始完,获取统计数据,触发action: GET_DATA
      this.props.getData(statisticParams, id)
  }
  handleKeyUp(e){
    const textValue = e.currentTarget.value;
      let that = e.target;
      clearTimeout(that.timer);

      that.timer = setTimeout(
          function()
          {
              delete that.timer;
              // why delete? it is about high performance?
            const {searchKeyWord} = this.props
            searchKeyWord(textValue)
          }.bind(this),
          500
      );
      
  }
  exportTable(){
    Modal.confirm({
        title: <span>报表导出</span>,
        content: <button>11111</button>,
        okText: '确认',
        cancelText: '取消',
        iconClassName:'a',
      });
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

        let dataSource = {}

        if (this.refs.dataTable) {
            const { $$dataTable } = this.props

            const $$obj = $$dataTable.get(this.refs.dataTable.identity)

            if ($$obj) {
                dataSource = $$obj.toJS()
            }
        }

          return (
            <div style={{marginLeft: '20px'}}>
                <div className = "col_cktop">
                  <div className="col_cktop-gongneng clearfix">
                     <div className="col_cktop-Hightsearch">
                         <input type="text" className="Hightsearch_input" onChange = {this.handleOnChange.bind(this)}/>
                         <button onClick = {this.handleClickSearch.bind(this)}>搜索</button>
                     </div>
                     <Button className="col_cktop-btnFpai" onClick={this.exportTable.bind(this)}>导出EXCEL</Button>
                  </div>  
                </div>
                <DataTable ref="dataTable"
                   checkMode={false}
                   hasDetail={false}
                   rows={dataSource.rows}
                   searchColumns={searchColumns}
                   columns={statisticColumns}
                   pending={dataSource.pending}
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
  initSource,
  getData,
  searchColumns,
  updateIsPene,
  searchKeyWord,
})(AccountStatistic)