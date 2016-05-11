/**
 * Created by c on 16/3/11.
 * 报数
 * 面包屑路径组件
 */
import { findDOMNode } from 'react-dom'



export default class NoneData extends React.Component {

    constructor(props) {
        super(props)

    }

    componentWillMount(){

    }


    render() {

        //借用ant的样式
        return (
            <div className="none-data-placeholder">
                <i className=" anticon anticon-frown"></i>
                <span>暂无数据</span>
            </div>
        )


    }
}
