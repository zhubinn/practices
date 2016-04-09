/**
 * Created by c on 16/3/11.
 */
import { findDOMNode } from 'react-dom'



export default class List extends React.Component {

    constructor(props) {
        super(props)
    }

    componentWillMount(){
        const { actions } = this.props
    }

    handleInputChange(index){

        const value = [...document.querySelectorAll('.fieldInput')][index].value.trim()
        const { customEditField ,actions } = this.props

        if(value.length === 20){
            alert('不能超过20个字')
            return false;
        }

        actions.inputChange(value,index);
    }

    addClick(text){
        const { customEditField ,actions } = this.props;

        if(customEditField.length === 10){
            alert('最多不能超过10个')
            return false;
        }

        actions.addField(text)
    }

    deleteClick(index){
        const { customEditField ,actions } = this.props;

        if(customEditField.length === 1){
            alert('不能少于1个')
            return false;
        }

        actions.deleteField(index);
    }

    render() {
        const { customEditField ,actions } = this.props;



        const nodes = customEditField.map((item,index) => {
            console.log('++++',item);
            return (
                <li key = {index} >

                    <input className="fieldInput" placeholder={ '请输入'+(index+1) } ref = "inputText" onChange = { this.handleInputChange.bind(this,index) } type="text" />
                    <button onClick = { this.addClick.bind(this,'') }>+</button>
                    <button onClick = { this.deleteClick.bind(this,index) } className= { index === 0 ? 'hidden' : ''}>-</button>
                    <button onClick = {() => actions.setFieldStatus(index)}>{ item.status ? '开启' : '停用' }</button>
                </li>
            )
        })

        return (
            <ul>
                { nodes }
            </ul>
        )


    }
}
