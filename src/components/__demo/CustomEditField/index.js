/**
 * Created by c on 16/3/11.
 */
import { findDOMNode } from 'react-dom'

import List from './list'

let count = 0;

export default class Hello extends React.Component {
    constructor(props) {
        super(props)

    }



    render() {
        const { fields,actions } = this.props

        return (
            <div>
                <h4>客户自定义字段</h4>
                <li>
                    <input placeholder="请输入" />
                    <button onClick = {() => actions.addField('')}>+</button>
                    <button disabled>-</button>
                    <button onClick = {() => actions.setFieldStatus()}>开启</button>
                </li>
                <List fields = { fields } actions = {actions} />
            </div>
        )
    }
}
