/**
 * Created by c on 16/3/21.
 */
import { connect } from 'react-redux'
import Table from 'components/__demo/Table'
import { getReportData, updateRow, deleteRow } from 'actions/__demo/report'

import 'components/styles/bootstrap_v336/__demo/table.less'

const nameStyle = {
    backgroundColor: 'red',
    color: '#FFF'
}
const format = cellData => {
    const r = Number(cellData)
    return !Number.isNaN(r) ? r.toFixed(2) : cellData
}
const columns = [
    {
        key: 'id',
        text: 'ID',
        className: 'col',
        format: format
    },
    <th key="name" style={nameStyle}>
        <span>名字</span>
        <img width="20" height="20" src="http://reactjs.cn/react/img/logo.svg"/>
    </th>,
    <th key="type" format={format}>类型</th>,
    <th key="status" onClick={()=>{alert('我点击了状态')}}>状态</th>,
    {
        key: Table.thunk((row, index, context) => {
            return (
                <td>
                    <button onClick={ e=> {
                        row.status = 1
                        context.dispatch(updateRow(row, index))
                    }}>启动
                    </button>
                    <button onClick={ e=> {
                        row.name = '成功啦'
                        row.type = 1
                        row.status = 0
                        context.dispatch(updateRow(row, index))
                    }}>修改
                    </button>
                    <button onClick={ e=> {
                        context.dispatch(deleteRow(index))
                    }}>删除
                    </button>
                </td>
            )
        }),
        text: '操作',
    }]
const rows = [
    {
        id: 1,
        name: '春暖花开',
        type: 1,
        status: 0,
    }, {
        id: 2
    }, {
        id: 3,
        name: '踏春'
    }, {
        id: 4,
        name: '我是一只小蜜蜂'
    }
]

class TablePage extends React.Component {
    componentDidMount(prevProps, prevState) {
        const { getReportData } = this.props

        getReportData(columns, rows)
    }

    render() {
        const { columns, rows } = this.props.$$mapState.toJS()
        const { tableDispatch } = this.props

        return (
            <div>
                <h1>demo</h1>
                <Table className="table table-hover"
                       columns={columns}
                       rows={rows}
                       dispatch={tableDispatch}>
                    <caption>社会主义</caption>
                </Table>
            </div>
        )
    }
}

const mapStateToProps = (state, ownProps) => {
    return {
        $$mapState: state.report
    }
}

export default connect(mapStateToProps, {
    tableDispatch: Table.dispatch,
    getReportData,
    updateRow,
    deleteRow
})(TablePage)