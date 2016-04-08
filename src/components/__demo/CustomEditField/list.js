/**
 * Created by c on 16/3/11.
 */
import { findDOMNode } from 'react-dom'



export default class List extends React.Component {

    constructor(props) {
        super(props)
    }

    render() {
        const { fields,actions } = this.props;
        console.log('---',this.props);

        return (
            <li>
                <input placeholder="请输入" />
                <button onClick = {() => actions.addField()}>+</button>
                <button onClick = {() => actions.deleteField()}>-</button>
                <button onClick = {() => actions.setFieldStatus()}>开启</button>
            </li>
        )

    }
}
