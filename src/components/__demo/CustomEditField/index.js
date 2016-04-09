import { findDOMNode } from 'react-dom'
import List from './list'

export default class CustomEditField extends React.Component {
    constructor(props) {
        super(props)

    }

    handleApply(){
        const { customEditField  } = this.props

        for(let i = 0,len = customEditField.length;i<len;i++){
            if(!customEditField[i].text){
                alert('字段不能为空');
                return false;
            }
        }

        this.setState({'flag':true})
        console.log(customEditField);

    }

    render() {
        const { customEditField ,actions } = this.props

        const nodes = customEditField.map((item) => {
            return (
                <li>item.text</li>
            )
        })

        const element =  this.flag ? nodes : null
        return (
            <div>
                <h4>客户自定义字段</h4>

                <List customEditField = { customEditField } actions = {actions} />
                <button onClick = { this.handleApply.bind(this) }>应用</button>

            </div>
        )
    }
}
