/**
 * Created by c on 16/3/11.
 */
import { findDOMNode } from 'react-dom'
import { Spin } from 'antd';

export default class Row extends React.Component {

    constructor(props) {
        super(props)

    }




    render() {
        const { numberReportViewState ,actions } = this.props
        const loading = numberReportViewState.toJS().loading

        console.log('loading',loading)
        const listObj = numberReportViewState.toJS().data.list
        let nodes = [];

        listObj.forEach((item,index) => {

            item.reportItems.forEach((item2,index2) => {

                nodes.push(
                    item.reportItems.map(() =>{
                        return (
                            <tr key = { index }>
                                <td> { index2 ===0 ? item.dept : null } </td>
                                <td> { index2 ===0 ? item.name : null} </td>
                                <td> { item2.Name } </td>
                                <td> { item2.Value } </td>
                            </tr>
                        )
                    })
                )
            })
        })

        return (
            <tbody >

                { nodes.length > 0 ? nodes : <tr><td colSpan="4">{ !loading ? <Spin /> : '没有数据' }</td></tr> }
            </tbody>
        )


    }
}
