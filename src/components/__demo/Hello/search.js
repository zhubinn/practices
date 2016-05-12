/**
 * Created by leesx on 16/3/11.
 * 搜索组件
 */
import { findDOMNode } from 'react-dom'



export default class Search extends React.Component {
    constructor(props,context) {
        super(props,context)
        //this.onChange = this.onChange.bind(this)
    }

    inputChange(){
        const { items,searchHello, mapState } = this.props;
        const text = findDOMNode(this.refs.searchInput).value.trim()

        searchHello(text);//触发action
    }
    render() {
        const { items } =this.props
        if(items && items.length){
            return (
                <div>
                    <input type="search" placeholder="快速搜索" ref="searchInput" onChange={this.inputChange.bind(this)}/>
                </div>
            )
        } else  {
            return (
                <div>

                </div>
            )
        }

    }

}
