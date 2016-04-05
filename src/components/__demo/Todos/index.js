/**
 * Created by janeluck on 4/5/16.
 */

import { findDOMNode } from 'react-dom'

class Todo extends React.Component{
    constructor(props) {
        super(props)
        this.onClick = this.onClick.bind(this)

    }
    onClick(e) {

    }

    render() {
        const { item, onclick } = this.props

        return (
            <li
                onClick={function(e){onclick(item.completed)}}

            >{item}</li>
        )
    }
}

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
            return
        } else {
            ele.style.border = ''
        }
        const { add } = this.props
        add(value)
        ele.value=''
    }


    render() {
        const { items, onclick, showCompleted, showAll } = this.props

        return (
            <div className="todos">
                <input type="text" ref="todo_text"/>
                <button onClick = {this.onAdd}>add</button>
                <ul>

                    {
                        this.props.items.map((item,i)=>(<li
                        style={{
                            textDecoration: item.completed ? 'line-through' : 'none'
                        }}

                        key={i}
                        onClick = {function (e) {
                            onclick(i)
                        }}
                        >
                            {item.text}
                        </li>))
                    }
                </ul>
                <div>
                    <button onClick={showCompleted}>completed</button>
                    <button onClick={showAll}>all</button>
                </div>
            </div>
        )
    }
}

Todos.propTypes = {
    add: React.PropTypes.func.isRequired
}