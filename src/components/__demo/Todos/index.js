/**
 * Created by janeluck on 4/5/16.
 */

import { findDOMNode } from 'react-dom'



export default class Todos extends React.Component {
    constructor(props) {
        super(props)

        this.onAdd = this.onAdd.bind(this)
    }
    onAdd(e) {
        let { todo_text} = this.refs
        let ele = findDOMNode(todo_text)
        const value = ele.value.trim()

        if (value.length === 0) {
            ele.style.border = '1px solid red'
        } else {
            ele.style.border = ''
        }
        const { add } = this.props
        add(value)
    }


    render() {
        const { items } = this.props

        return (
            <div className="todos">
                <input type="text" ref="todo_text"/>
                <button onClick = {this.onAdd}>add</button>
                <ul>

                    {this.props.items.map((item,i)=>(<li key={i}>{item}</li>))}
                </ul>
            </div>
        )
    }
}

Todos.propTypes = {
    add: React.PropTypes.func.isRequired
}