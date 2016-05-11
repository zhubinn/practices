/**
 * Created by c on 16/3/11.
 * 报数
 * 面包屑路径组件
 */
import { findDOMNode } from 'react-dom'



export default class InfoPath extends React.Component {

    constructor(props) {
        super(props)

    }

    componentWillMount(){
        const { actions } = this.props
    }


    render() {
        const { customEditField ,actions } = this.props;


        return (
            <div className="ck-numberReport-topTitle"><a>报数</a>><a>报数管理</a>><a>查看报数</a></div>
        )


    }
}
