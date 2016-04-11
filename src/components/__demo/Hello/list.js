/**
 * Created by c on 16/3/11.
 */
import { findDOMNode } from 'react-dom'



export default class List extends React.Component {
    constructor(props) {
        super(props)
        //this.onChange = this.onChange.bind(this)
    }

    handleClick(index){
        const { items,deleteHello, mapState } = this.props;
        /*console.log(mapState.toJS().items);
        mapState.toJS().items.filter(item=>{ return item.id != index})*/
        deleteHello(index);//触发action
    }
    render() {
        const { items } = this.props;

        if(items){
            const node = items.map((item,index)=>(
                item.isFilter === true ? <li key={index}>{index+1}  {item.text} <button onClick={this.handleClick.bind(this,index)}>x</button></li> : []
            ))

            return (
                <ul>
                    { node }
                </ul>
            )
        }else{
            return (
                <ul>
                    没有东西了
                </ul>
            )
        }

    }
}
