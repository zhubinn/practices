/**
 * Created by fuwenfang on 4/7/16.
 */


import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import basic from './css/basic_new_v2.css'
import Statistic from './css/Statistic.less'

import DataTable from 'components/Business/DataTable'
import  { initSource,getData, showDetail, checkRow, updateRow, toggleSearch}  from 'actions/Component/DataTable'
import {rowsData, searchColumns} from 'components/Business/DataTable/fakeData'
const DATA_TABLE_SOURCE = 'Account_List'

let that;

/*需要根据权限判断是否角色 不同角色不同columns*/
let statisticColumns = [

    {text: '部门名称', datafield: 'name', width: 120,cellsrenderer: function(rowData, column, value){
        return (
          <a  title = {value} onClick = {(e) => {console.log(that)}}>{value}</a>
          );

    }},
    {text: '创建人', datafield: 'user', width: 70},
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
        this.updateIsPene = this.updateIsPene.bind(this)
        that = this


    }
    componentDidMount() {
      this.props.initSource(DATA_TABLE_SOURCE)
      // 页面初始完,获取统计数据,触发action: GET_DATA
      this.props.getData(statisticParams, DATA_TABLE_SOURCE)
  }
  updateIsPene(){
    alert(0)
  }
  render(){

        const $$dataTable = this.props.dataTable.get(DATA_TABLE_SOURCE)

        const $$rows = $$dataTable && $$dataTable.get('rows')
        const rows = ($$rows && $$rows.toJS()) || []

        const $$selectedRowDetailObj = $$dataTable && $$dataTable.get('selectedRowDetailObj')
        const selectedRowDetailObj = ($$selectedRowDetailObj && $$selectedRowDetailObj.toJS()) || {}

        const checkedRows = $$dataTable && $$dataTable.get('checkedRows').toJS() || []

        const searchBarShow = $$dataTable && $$dataTable.get('searchBarShow') || false

        const pending = $$dataTable && $$dataTable.get('pending') || false

        const IsPene = this.props.$$account_statistic.toJS.IsPene


        if(!IsPene){
          return (
            <div >
                <div className = "col_cktop">
                  <div className="col_cktop-topTitle"><a>客户</a>><a>客户统计表</a></div>
                  <div className="col_cktop-gongneng clearfix">
                     <div className="col_cktop-Hightsearch"><input type="text" className="Hightsearch_input"placeholder=""/><button className="Hightsearch-btn">高级搜索</button></div>
                     <button className="col_cktop-btnFpai">导出EXCEL</button>
                  </div>  
                </div>
                <DataTable 
                           source={DATA_TABLE_SOURCE}
                           checkMode={false}
                           hasDetail={false}
                           rows={rows}
                           searchColumns={searchColumns}
                           columns={statisticColumns}
                           pending={pending}
                />
            </div>
          )
        }
  }
}

const mapStateToProps = (state, ownProps) => {

    return {
        $$account_statistic: state.business.account_statistic,
        dataTable: state.components.dataTable,
    }
}

export default connect(mapStateToProps, {
  initSource,
  getData,
  searchColumns,
})(AccountStatistic)