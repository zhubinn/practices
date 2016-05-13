/**
 * Created by c on 16/3/11.
 */
import { findDOMNode } from 'react-dom'
import { Spin } from 'antd';
import NoneData from './NoneData'

export default class Row extends React.Component {

    constructor(props) {
        super(props)

    }




    render() {
        
        const { numberReportViewState ,actions } = this.props
        const loading = numberReportViewState.toJS().loading
        const listObj = numberReportViewState.toJS().data.list
        const obj = numberReportViewState.toJS().data.obj

        if(obj){
            listObj.unshift(obj);
        }

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

                { nodes.length > 0 ? nodes : <tr><td colSpan="4">{ !loading ? <Spin /> : <NoneData /> }</td></tr> }
            </tbody>
        )


    }
}
