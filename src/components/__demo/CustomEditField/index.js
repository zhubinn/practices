import { findDOMNode } from 'react-dom'
import List from './list'
import './customField.less'

export default class CustomEditField extends React.Component {
    constructor(props, context) {
        super(props, context)

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


    renderListTpl(){
        const { customEditField  } = this.props

        if(customEditField.length){
            return (
                <div>
                    <h4>应用中</h4>
                    <ul>
                        {
                            customEditField.map((item ,index) => {
                                return <li key = { index }>{ item.text }
                                        <span className = { item.status ? 'green' : 'gray' }>{ item.status ? '启用' : '停用' }</span>
                                    </li>
                            })
                        }
                    </ul>

                </div>

            )
        }
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
                { this.renderListTpl() }
            </div>
        )
    }
}
