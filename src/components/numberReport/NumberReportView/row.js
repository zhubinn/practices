/**
 * Created by c on 16/3/11.
 */
import { findDOMNode } from 'react-dom'


export default class Row extends React.Component {

    constructor(props) {
        super(props)

    }



    render() {
        const { numberReportViewState ,actions } = this.props;
        const nodes = numberReportViewState.toJS().responseJson.map((item,index) => {
            return (
                <tr key = { index }>
                    <td>{ item.department }</td>
                    <td>{ item.reportName }</td>
                    <td>{ item.reportItem }</td>
                    <td>{ item.num }</td>
                </tr>
            )
        })

        return (
            <tbody>
            { nodes }
            </tbody>
        )


    }
}
