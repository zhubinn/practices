/**
 * Created by c on 16/3/11.
 */
import { findDOMNode } from 'react-dom'

import Row from './row'

export default class TableList extends React.Component {

    constructor(props) {
        super(props)

    }

    componentWillMount(){
        const { actions } = this.props
    }

    renderRow(){

    }

    render() {
        const { numberReportViewState ,actions } = this.props

        console.log(actions);
        return (
            <div className="ck-numberReport-bottom">
                <table className="ck-numberReport-tab01">
                    <thead>
                    <tr>
                        <th>所属部门</th>
                        <th>姓名</th>
                        <th>报数项</th>
                        <th>报数</th>
                    </tr>
                    </thead>
                    <Row actions = { actions } numberReportViewState = { numberReportViewState } />
                </table>
            </div>
        )


    }
}
