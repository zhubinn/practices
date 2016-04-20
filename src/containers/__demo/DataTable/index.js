
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import DataTable from 'components/Business/DataTable'
import  { initSource,getData, showDetail, checkRow, updateRow, toggleSearch}  from 'actions/Component/DataTable'

import {rowsData, columns, searchColumns} from 'components/Business/DataTable/fakeData'
import { Pagination } from 'antd';

function showTotal(total) {
    return `共 ${total} 条`;
}



let params = {
    
    url: 'http://esn.yangtianming.com/front/js/scrm/fakeData/tableData.php',
    data: {
        page: 1,
        rowsPerPage: 20
    }
}


class DataTablePage extends React.Component {
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

        return (


            <div style={{marginLeft: '20px'}}>

                <div>
                    <span>已处理客户</span>
                    <span>已处理客户</span>
                    <span>已处理客户</span>
                    <span>已处理客户</span>
                    <span>已处理客户</span>
                    <span>已处理客户</span>
                </div>


                <DataTable ref="dataTable"
                           checkMode={true}
                           onCheckRow={checkRow}
                           hasDetail={true}
                           checkedRows={dataSource.checkedRows}
                           rows={dataSource.rows}
                           selectedRowDetailObj={dataSource.selectedRowDetailObj}
                           searchColumns={searchColumns}
                           columns={columns}
                           searchBarStatus={dataSource.searchBarShow}
                           onUpdateRow={updateRow}
                           onShowDetail={showDetail}
                           pending={dataSource.pending}
                />
                <ul>
                    <li>1</li>
                    <li onClick={(e)=>{params.data.page = 2;this.props.getData(params

                        , this.refs.dataTable.identity)}}>2
                    </li>
                </ul>
                <Pagination size="small" total={50}  showSizeChanger  showQuickJumper/>
            </div>
        )
    }
}

const mapStateToProps = (state, ownProps) => {

    return {
        $$dataTable: state.components.dataTable
    }
}

export default connect(mapStateToProps, {
    initSource,
    getData,
    showDetail,
    checkRow,
    updateRow,
    toggleSearch
})(DataTablePage)