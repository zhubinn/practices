
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import DataTable from 'components/Business/DataTable'
import  { initSource,getData, showDetail, checkRow, updateRow, toggleSearch}  from 'actions/Component/DataTable'


import { Pagination } from 'antd';

//less
import './less/clues.less'

let columns = [

    {text: '公司名称', datafield: 'firmname', width: 120},
    {text: '姓名', datafield: 'username', width: 70},
    {text: '导入来源', datafield: 'infoSource', width: 160},
    {text: '创建时间', datafield: 'createTime', width: 80},

    {text: '线索负责人', datafield: 'importPle', width: 100},
    {text: '线索录入人', datafield: 'ID', width: 100},
    {text: '微信', datafield: 'weixin', width: 100}
];


/*$.post(SCRM.url('/scrmlead/index/getAssignList'),{
    assigned:0,
    page:1,
    rowsPerPage:20,
    ownerID:12,
    canAssign:1,

    searchData1: {

    },
    searchData2: {

    }
},function(data){
    console.log(data)
},'json')*/

fetch(SCRM.url('/scrmlead/index/getAssignList'), {

    method: 'post',
    headers: {
        'API': 1,
        'Accept': 'application/json',
        'Content-Type': 'application/json'
    },
    body: {
        assigned:0,
        page:1,
        rowsPerPage:20,
        ownerID:12,
        canAssign:1,

        searchData1: {

        },
        searchData2: {

        }
    }
}).then(function(response) {
    if (response.status >= 400) {
        throw new Error("Bad response from server")
    }
    //return response.json()
}).then(function (data) {

    console.log(data)
})

let params = {
    url: SCRM.url('/scrmlead/index/getAssignList'),
    //url: 'http://esn.lishangxi.com/front/js/scrm/fakeData/tableData.php',
    data:{
        assigned:0,
        page:1,
        rowsPerPage:20,
        ownerID:12,
        canAssign:1,

        searchData1: {

        },
        searchData2: {

        }
    }

}

//const searchUrl = 'http://esn.lishangxi.com/front/js/scrm/fakeData/tableData.php'
class DispatchClues extends React.Component {
    constructor() {
        super()

    }

    componentDidMount() {
        const id = this.refs.dataTable.identity
        this.props.initSource(id)
        //// 页面初始完,获取数据,触发action: GET_DATA
        this.props.getData(params, id)



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
        console.log(dataSource)
        return (


            <div className="col-right">

                <div className="col-cktop">

                    <div className="col-cktop-gongneng clearfix">
                        <div className="col-cktop-Hightsearch">
                            <input type="text" className="Hightsearch_input" placeholder="输入线索负责人" />
                            <button className="Hightsearch-btn" onClick={(e) => {toggleSearch(true, this.refs.dataTable.identity )}}>高级搜索</button>
                        </div>
                        <button className="col-cktop-btn">导入</button>
                        <button className="col-cktop-btn" style= {{"marginLeft":"20px"}}>导出</button>

                    </div>


                </div>


                <DataTable ref="dataTable"
                           checkMode={true}
                           onCheckRow={checkRow}
                           hasDetail={true}
                           checkedRows={dataSource.checkedRows}
                           rows={dataSource.rows}
                           selectedRowDetailObj={dataSource.selectedRowDetailObj}

                           columns={columns}
                           searchBarStatus={dataSource.searchBarShow}
                           onUpdateRow={updateRow}
                           hasDetail = {false}
                           toggleSearch={toggleSearch}
                           pending={dataSource.pending}
                />

                <Pagination size="small" total={50}  showSizeChanger  showQuickJumper/>
            </div>
        )
    }
}

const mapStateToProps = (state, ownProps) => {
    return {
        $$dataTable: state.components.dataTable,
        account_list: state.business.account_list
    }
}

export default connect(mapStateToProps, {
    initSource,
    getData,
    showDetail,
    checkRow,
    updateRow,
    toggleSearch
})(DispatchClues)