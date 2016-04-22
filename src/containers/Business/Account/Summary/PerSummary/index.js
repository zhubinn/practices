/**
 * Created by janeluck on 4/7/16.
 */


import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import basic from '../css/basic_new_v2.css'
import Summary from '../css/Summary.less'



import DataTable from 'components/Business/DataTable'
import  { initSource,getData}  from 'actions/Component/DataTable'

import {rowsData, columns, searchColumns} from 'components/Business/DataTable/fakeData'

import {searchKeyWord,changePene,changeInputVal} from 'actions/Business/Account/Summary/PerSummary'

//假定角色  0 领导以及部门负责人；1 普通员工 
const role = 0

/*
普通员工的个人汇总表是没有任何穿透的  部门名称 员工名称
*/
let persummaryColumns = [
    {text: '部门名称', datafield: 'name', width: 120,cellsrenderer: function(rowData, column, value){
          return (<div title = {value}>{value}</div>);     
    }},
    {text: '员工名称', datafield: 'name', width: 120,cellsrenderer: function(rowData, column, value){
          return (<div title = {value}>{value}</div>);     
    }},
    {text: '全部客户数量', datafield: 'user', width: 160},
    {text: '全部生意数量', datafield: 'date', width: 160},
    {text: '全部预计销售金额', datafield: 'NpStopTime',width:160},
    {text: '全部成交金额', datafield: 'ID', width: 160},
    {text: '全部汇款金额', datafield: 'IsSys', width: 160},
    {text: '全部输单金额', datafield: 'IsSys', width: 160}
];

let currentText
/*
领导以及部门负责人默认进入是部门名称
*/
let leadersummaryColumns = [
    {text: '部门名称', datafield: 'name', width: 120,cellsrenderer: function(rowData, column, value){
          return (<a title = {value} href = "#" onClick = {e=>currentText.handlePerPene(e)}>{value}</a>);     
    }},
    {text: '全部客户数量', datafield: 'user', width: 160},
    {text: '全部生意数量', datafield: 'date', width: 160},
    {text: '全部预计销售金额', datafield: 'NpStopTime',width:160},
    {text: '全部成交金额', datafield: 'ID', width: 160},
    {text: '全部汇款金额', datafield: 'IsSys', width: 160},
    {text: '全部输单金额', datafield: 'IsSys', width: 160}
];

/*
领导以及部门负责人点击穿透后是部门名称以及员工姓名
*/
let leaderPeneColumns = [
    {text: '部门名称', datafield: 'name', width: 120,cellsrenderer: function(rowData, column, value){
          return (<div title = {value} href = "#">{value}</div>);     
    }},
    {text: '员工名称', datafield: 'name', width: 120,cellsrenderer: function(rowData, column, value){
          return (<div title = {value} href = "#">{value}</div>);     
    }},
    {text: '全部客户数量', datafield: 'user', width: 160},
    {text: '全部生意数量', datafield: 'date', width: 160},
    {text: '全部预计销售金额', datafield: 'NpStopTime',width:160},
    {text: '全部成交金额', datafield: 'ID', width: 160},
    {text: '全部汇款金额', datafield: 'IsSys', width: 160},
    {text: '全部输单金额', datafield: 'IsSys', width: 160}
];




let defaultParams = {
    url: 'http://esn.fuwenfang.com/front/js/scrm/fakeData/tableData.php',
    data: {
        page: 1,
        rowsPerPage: 20
    }
}

let peneParams = {
    url: 'http://esn.fuwenfang.com/front/js/scrm/fakeData/tableData.php',
    data: {
        page: 1,
        rowsPerPage: 20
    }
}

class AccountPerSummaryPage extends React.Component {
    constructor() {
        super()
        currentText = this
    }

    componentDidMount() {
        const id = this.refs.dataTable.identity
        const pene = this.props.$$account_persummary.toJS().pene
        this.props.initSource(id)
        //// 页面初始完,获取数据,触发action: GET_DATA
            console.log('默认进入页面')
            this.props.getData(defaultParams, id)
    }
    handlePerPene(e){
      e.preventDefault()
      const id = this.refs.dataTable.identity
      const {changePene} = this.props
      changePene()
      console.log('点击穿透后')
      this.props.getData(peneParams, id)
    }
    handleOnChange(e){
      const textValue = e.currentTarget.value;
      const {changeInputVal} = this.props
      changeInputVal(textValue)
    }
    handleClickSearch(e){
    const textValue = this.props.$$account_persummary.toJS().value
    const {searchKeyWord} = this.props
    searchKeyWord(textValue)

      
  }


    render() {
        const { showDetail, checkRow, updateRow, toggleSearch} = this.props
        let dataSource = {}

        if (this.refs.dataTable) {
            const { $$dataTable } = this.props

            const $$obj = $$dataTable.get(this.refs.dataTable.identity)

            if ($$obj) {
                dataSource = $$obj.toJS()
            }
        }
        const pene = this.props.$$account_persummary.toJS().pene
        return (


            <div style={{marginLeft: '20px'}}>
                <div className = "col_cktop">
                  <div className="col_cktop-gongneng clearfix">
                     <div className="col_cktop-Hightsearch">
                       <input type="text" className="Hightsearch_input" onChange = {this.handleOnChange.bind(this)}/>
                      <button onClick = {this.handleClickSearch.bind(this)}>搜索</button>
                      </div>
                     <button className="col_cktop-btnFpai">导出EXCEL</button>
                  </div>  
                </div>


               <DataTable ref="dataTable"
                   checkMode={false}
                   hasDetail={false}
                   rows={dataSource.rows}
                   searchColumns={searchColumns}
                   columns={role == 1?persummaryColumns:pene?leaderPeneColumns:leadersummaryColumns}
                   pending={dataSource.pending}
                />
            </div>
        )
    }
}

const mapStateToProps = (state, ownProps) => {
    return {
        $$dataTable: state.components.dataTable,
        $$account_persummary: state.business.account_persummary,
    }
}

export default connect(mapStateToProps, {
    initSource,
    getData,
    changeInputVal,
    searchKeyWord,
    changePene,
})(AccountPerSummaryPage)