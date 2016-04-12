/**
 * Created by janeluck on 4/12/16.
 */



import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import DataTable from 'components/DataTable'
import  { initSource,getData, showDetail, checkRow, updateRow, toggleSearch}  from 'actions/table'

import {rowsData, columns, searchColumns} from 'components/DataTable/fakeData'
import 'ucjs_modules/layer/2.2.0/skin/layer.css'

const DATA_TABLE_SOURCE0 = 'two_dataTable_0'
const DATA_TABLE_SOURCE1 = 'two_dataTable_1'




class TwoTablePage extends React.Component {
    componentDidMount() {

        this.props.initSource(DATA_TABLE_SOURCE0)

        // 页面初始完,获取数据,触发action: GET_DATA
        this.props.getData(DATA_TABLE_SOURCE0)

        this.props.initSource(DATA_TABLE_SOURCE1)
        this.props.getData(DATA_TABLE_SOURCE1)

        
        //console.log(this.refs.dataTable)
    }

    render() {
        const { showDetail, checkRow, updateRow, toggleSearch} = this.props
        
        
       
        let mapState0 = this.props.mapState.get(DATA_TABLE_SOURCE0)

        console.log(mapState0)
        //console.log($$rows.toJS())
        const $$rows0 = mapState0 && mapState0.get('rows')


        const rows0 = ($$rows0 && $$rows0.toJS()) || []
        //const $$selectedRowDetailObj = $$rows['selectedRowDetailObj']
        const $$selectedRowDetailObj0 = mapState0 && mapState0.get('selectedRowDetailObj')

        const selectedRowDetailObj0 = ($$selectedRowDetailObj0 && $$selectedRowDetailObj0.toJS()) || {}

        const checkedRows0 = mapState0 &&  mapState0.get('checkedRows').toJS() || []


        const searchBarShow0 = mapState0 && mapState0.get('searchBarShow') || false
        //      const searchBarShow = $$rows['searchBarShow']

        const pending0 =mapState0 &&  mapState0.get('pending') || false
        // const pending = $$rows['pending']









        let mapState1 = this.props.mapState.get(DATA_TABLE_SOURCE1)

        console.log(mapState1)
        //console.log($$rows.toJS())
        const $$rows1 = mapState1 && mapState1.get('rows')


        const rows1 = ($$rows1 && $$rows1.toJS()) || []
        //const $$selectedRowDetailObj = $$rows['selectedRowDetailObj']
        const $$selectedRowDetailObj1 = mapState1 && mapState1.get('selectedRowDetailObj')

        const selectedRowDetailObj1 = ($$selectedRowDetailObj1 && $$selectedRowDetailObj1.toJS()) || {}

        const checkedRows1 = mapState1 &&  mapState1.get('checkedRows').toJS() || []


        const searchBarShow1 = mapState1 && mapState1.get('searchBarShow') || false
        //      const searchBarShow = $$rows['searchBarShow']

        const pending1 =mapState1 &&  mapState1.get('pending') || false
        // const pending = $$rows['pending']
        
        
        
        

        return (
            
            <div>
            <div style={{margin: '20px'}}>
                <div>
                    <button onClick={(e)=>{console.log(this.refs.dataTable.getCheckedRows())}}>获取已经选择的行</button>
                </div>
                <div>
                    <button onClick={function(){toggleSearch(true, DATA_TABLE_SOURCE0)}}>高级搜索</button>
                    <button onClick={function(){toggleSearch(false, DATA_TABLE_SOURCE0)}}>确定</button>
                </div>

                <div className='w820'>
                    <DataTable ref="dataTable"
                               source={DATA_TABLE_SOURCE0}
                               checkMode={true}
                               onCheckRow={checkRow}
                               hasDetail={true}
                               checkedRows={checkedRows0}
                               rows={rows0}
                               selectedRowDetailObj={selectedRowDetailObj0}
                               searchColumns={searchColumns}
                               columns={columns}
                               searchBarStatus={searchBarShow0}
                               onUpdateRow={updateRow}
                               onShowDetail={showDetail}
                               pending={pending0}

                    />

                </div>
            </div>
                


            <p>--------------------------------------华丽丽的分割线-------------------------------------</p>
                <div style={{margin: '20px'}}>
                <div>
                    <button onClick={(e)=>{console.log(this.refs.dataTable1.getCheckedRows())}}>获取已经选择的行</button>
                </div>
                <div>
                    <button onClick={function(){toggleSearch(true, DATA_TABLE_SOURCE1)}}>高级搜索</button>
                    <button onClick={function(){toggleSearch(false, DATA_TABLE_SOURCE1)}}>确定</button>
                </div>

                <div className='w820'>
                    <DataTable ref="dataTable1"
                               source={DATA_TABLE_SOURCE1}
                               checkMode={true}
                               onCheckRow={checkRow}
                               hasDetail={true}
                               checkedRows={checkedRows1}
                               rows={rows1}
                               selectedRowDetailObj={selectedRowDetailObj1}
                               searchColumns={searchColumns}
                               columns={columns}
                               searchBarStatus={searchBarShow1}
                               onUpdateRow={updateRow}
                               onShowDetail={showDetail}
                               pending={pending1}

                    />

                </div>
            </div>

            </div>
        )
    }
}

const mapStateToProps = (state, ownProps) => {
    return {
        mapState: state.dataTable,
        twoTable: state.twoTable
    }
}

export default connect(mapStateToProps, {
    initSource,
    getData,
    showDetail,
    checkRow,
    updateRow,
    toggleSearch
})(TwoTablePage)