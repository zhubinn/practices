/**
 * Created by c on 16/3/11.
 */
import { findDOMNode } from 'react-dom'

import List from 'components/__demo/hello/list'
import Search from 'components/__demo/hello/search'
let count = 0;

export default class Hello extends React.Component {
    constructor(props) {
        super(props)
        //this.onChange = this.onChange.bind(this)
    }


    onChange() {
        let inputText = findDOMNode(this.refs.inputText).value;
        const { sayHello, mapState } = this.props;
        sayHello({"value":inputText});
    }

    onClick(){
        let inputText = findDOMNode(this.refs.inputText).value;
        const { clickHello, mapState } = this.props;

        clickHello({"msg":inputText});//调action



    }
    addItems(){

        const $input = findDOMNode(this.refs.inputText);
        let inputText = $input.value;
        const { addHello, mapState } = this.props;
        if(!inputText) return;
        addHello({"text":inputText,"id":count++});//调action
        $input.value = null;
    }

    onKeyUp(e){
        if(e.keyCode == 13){
            const $input = findDOMNode(this.refs.inputText);
            let inputText = $input.value;
            const { addHello, mapState } = this.props;

            if(!inputText) return;
            addHello({"text":inputText,"id":count++});//调action
            $input.value = null;
        }
    }
    render() {

        const {mapState,deleteHello,searchHello} = this.props;

        const value = mapState.toJS().value;
        const items = mapState.toJS().items ;


        return (
            <div className="ck_login">
                <input  type="text" onChange={this.onChange.bind(this)} onKeyUp={this.onKeyUp.bind(this)} ref = "inputText"/>
                <button onClick={this.onClick.bind(this)}>点击</button>
                <button onClick={this.addItems.bind(this)} >添加</button>
                <p>正在输入的：{value}</p>
                <h4>显示列表 {items ? items.length : 0}</h4>

                <Search items={items} searchHello = {searchHello} />
                <List items = {items} deleteHello = {deleteHello}
                      mapState = {mapState} />
            </div>
        )
    }
}
