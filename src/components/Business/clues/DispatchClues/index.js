import fetch from 'isomorphic-fetch'
import { findDOMNode } from 'react-dom'

//日历组件
//弹框组件



export default class DispatchClues extends React.Component {
    constructor(props, context) {
        super(props, context)

    }





    render() {

        return (
            <div>
                <div className="col-right">


                    <div className="col-cktop">
                        <div className="col-cktop-topTitle">
                            <a>线索</a>&gt;
                            <a>线索分派</a>
                        </div>
                        <div className="col-cktop-gongneng clearfix">
                            <div className="col-cktop-Hightsearch">
                                <input type="text" className="Hightsearch_input" placeholder="输入线索负责人" />
                                <button className="Hightsearch-btn">高级搜索</button>
                            </div>
                            <button className="col-cktop-btndaoru">导入</button>
                            <button className="col-cktop-btndaochu">导出</button>

                        </div>


                    </div>
                </div>
            </div>
        )
    }
}
