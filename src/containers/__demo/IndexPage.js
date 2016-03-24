/**
 * Created by c on 16/3/21.
 */
import { connect } from 'react-redux'
import { Table, Tr, Th, Td } from 'components/__demo/Table'

import 'components/styles/bootstrap_v336/__demo/table.less'

class DemoIndexPage extends React.Component {
    constructor() {
        super()
    }

    render() {
        const columns = [
            {
                key: 'id',
                text: 'ID',
                className: 'col',
                onClick: e => alert(e)
            },
            <Th key="name">名字</Th>,
            {
                key: <Td>
                    <button>修改</button>
                    <button>删除</button>
                </Td>,
                text: '操作',
            }]

        const rows = [{
            id: 1,
            name: '春暖花开'
        }, {
            id: 2
        }, {
            id: 3,
            name: '踏春'
        }, {
            id: 4
        }]

        return (
            <div>
                <h1>demo</h1>
                <Table className="table table-hover" columns={columns} rows={rows}>
                    <caption>ddd</caption>
                </Table>
            </div>
        )
    }
}

export default connect()(DemoIndexPage)