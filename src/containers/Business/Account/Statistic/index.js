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

import {updateIsPene} from 'actions/Business/Account/Statistic'
let that;

let statisticColumns = [

    {text: '部门名称', datafield: 'name', width: 120,cellsrenderer: function(rowData, column, value){
      const IsPenee = that.props.$$account_statistic.toJS().IsPene
      if(!IsPenee){
        return (
          <a  title = {value} onClick = {(e) => {that.handleIsPene()}}>{value}</a>
          );
      }else{
        return(
          <div title = {value}>{value}</div>
        )
      }
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

/*需要根据权限判断是否角色 不同角色一级穿透明细统计表不同columns
普通员工不变，领导以及负责人与上一级不同
*/
//假定角色  0 领导部门负责人；1 普通员工 
const role = 0

let detailColumns = [

    {text: '部门名称', datafield: 'name', width: 120,cellsrenderer: function(rowData, column, value){
       return(
            <div  title = {value}>{value}</div>
        )

        

    }},
    {text: '员工姓名', datafield: 'name', width: 120,cellsrenderer: function(rowData, column, value){
        return (
          <a href = "http://esn.fuwenfang.com/scrmweb/accounts/index/VISITID/1" title = {value} >{value}</a>
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


/*统计页面的请求接口*/
let statisticParams = {
    url: 'http://esn.fuwenfang.com/front/js/scrm/fakeData/tableData.php',
    data: {
        page: 1,
        rowsPerPage: 20
    }
}

/*一级穿透页面的请求接口*/
let detailParams = {
    url: 'http://esn.fuwenfang.com/front/js/scrm/fakeData/tableData.php',
    data: {
        page: 1,
        rowsPerPage: 20
    }
}



class AccountStatistic extends React.Component{
  constructor(props) {
        super(props)
        that = this
    }
  componentDidMount() {
        const id = this.refs.dataTable.identity
        this.props.initSource(id)
      // 页面初始完,获取统计数据,触发action: GET_DATA
      this.props.getData(statisticParams, id)
  }
  handleIsPene(){
      const refid = this.refs.dataTable.identity
      const {updateIsPene} = this.props
      updateIsPene()
      this.props.getData(detailParams, refid)
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


        const IsPene = this.props.$$account_statistic.toJS().IsPene

          return (
            <div >
                <div className = "col_cktop">
                  <div className="col_cktop-gongneng clearfix">
                     <div className="col_cktop-Hightsearch"><input type="text" className="Hightsearch_input"placeholder=""/><button className="Hightsearch-btn">高级搜索</button></div>
                     <button className="col_cktop-btnFpai">导出EXCEL</button>
                  </div>  
                </div>
                <DataTable ref="dataTable"
                           checkMode={false}
                           hasDetail={false}
                           rows={dataSource.rows}
                           searchColumns={searchColumns}
                           columns={!IsPene?statisticColumns:role==0?detailColumns:statisticColumns}
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
})(AccountStatistic)