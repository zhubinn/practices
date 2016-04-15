/**
 * Created by janeluck on 4/7/16.
 */


import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import DataTable from 'components/DataTable'
import  { initSource,getData, showDetail, checkRow, updateRow, toggleSearch}  from 'actions/table'

import {rowsData, columns, searchColumns} from 'components/DataTable/fakeData'
import 'ucjs_modules/layer/2.2.0/skin/layer.css'

const DATA_TABLE_SOURCE = 'default'


class DataTablePage extends React.Component {
    componentDidMount() {

        this.props.initSource(DATA_TABLE_SOURCE)
        // 页面初始完,获取数据,触发action: GET_DATA
        this.props.getData({
            url: 'http://esn.jianyu.com/front/js/scrm/fakeData/tableData.php',
            data: {
                page: 1,
                rowsPerPage: 20
            }

        }, DATA_TABLE_SOURCE)


        //console.log(this.refs.dataTable)
    }

    render() {
        const { showDetail, checkRow, updateRow, toggleSearch} = this.props
        let mapState = this.props.mapState.get(DATA_TABLE_SOURCE)

        console.log(mapState)
        //console.log($$rows.toJS())
        const $$rows = mapState && mapState.get('rows')


        const rows = ($$rows && $$rows.toJS()) || []
        //const $$selectedRowDetailObj = $$rows['selectedRowDetailObj']
        const $$selectedRowDetailObj = mapState && mapState.get('selectedRowDetailObj')

        const selectedRowDetailObj = ($$selectedRowDetailObj && $$selectedRowDetailObj.toJS()) || {}

        const checkedRows = mapState && mapState.get('checkedRows').toJS() || []


        const searchBarShow = mapState && mapState.get('searchBarShow') || false
        //      const searchBarShow = $$rows['searchBarShow']

        const pending = mapState && mapState.get('pending') || false
        // const pending = $$rows['pending']

        return (
            <div style={{margin: '20px'}}>
                <div>
                    <button onClick={(e)=>{console.log(this.refs.dataTable.getCheckedRows())}}>获取已经选择的行</button>
                </div>
                <div>
                    <button onClick={function(){toggleSearch(true, DATA_TABLE_SOURCE)}}>高级搜索</button>
                    <button onClick={function(){toggleSearch(false, DATA_TABLE_SOURCE)}}>确定</button>
                </div>


                <DataTable ref="dataTable"
                           source={DATA_TABLE_SOURCE}
                           checkMode={true}
                           onCheckRow={checkRow}
                           hasDetail={true}
                           checkedRows={checkedRows}
                           rows={rows}
                           selectedRowDetailObj={selectedRowDetailObj}
                           searchColumns={searchColumns}
                           columns={columns}
                           searchBarStatus={searchBarShow}
                           onUpdateRow={updateRow}
                           onShowDetail={showDetail}
                           pending={pending}

                />
                <ul>
                    <li>1</li>
                    <li onClick={(e)=>{this.props.getData({
                        url: 'http://esn.jianyu.com/front/js/scrm/fakeData/tableData.php',
                        data: {
                            page: 2,
                            rowsPerPage: 20
                        }

                        }, DATA_TABLE_SOURCE)}}>2
                    </li>
                </ul>

            </div>
        )
    }
}

const mapStateToProps = (state, ownProps) => {
    return {
        mapState: state.dataTable
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