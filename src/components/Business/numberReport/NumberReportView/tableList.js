/**
 * Created by c on 16/3/11.
 */
import { findDOMNode } from 'react-dom'
import { Spin } from 'antd';
import Row from './row'

export default class TableList extends React.Component {

    constructor(props) {
        super(props)

    }

    componentWillMount(){
        const { actions } = this.props
    }

    renderRow(){
        const { numberReportViewState ,actions } = this.props
        const loading = numberReportViewState.toJS().loading

        if(loading){
            return <Row actions = { actions } numberReportViewState = { numberReportViewState } />
        }else{
            return <tbody><tr colSpan="4"><Spin /></tr></tbody>
        }
    }

    render() {
        const { numberReportViewState ,actions } = this.props


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
