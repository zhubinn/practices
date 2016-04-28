/**
 * Created by c on 16/3/11.
 */
import { findDOMNode } from 'react-dom'
import { Spin } from 'antd';

let lastTimeStamp

export default class Search extends React.Component {

    constructor(props) {
        super(props)
        this.state = {}
    }

    handleMasterChange(e){
        const { numberReportViewState ,actions } = this.props
        const value = e.target.value.trim()
        lastTimeStamp = e.timeStamp
        if(value){

            setTimeout(function(){    //设时延迟0.5s执行
                console.log(lastTimeStamp-e.timeStamp)
                //如果时间差为0（也就是你停止输入0.5s之内都没有其它的keyup事件发生）则做你想要做的事
    			// if(lastTimeStamp-e.timeStamp == 0){
                //
                // }
                $.post(SCRM.url('/deptcomponent/DeptComponent/getUserListForLeadAssign'),{
                    "keyword":value
                },function(data){
                    if(data.rs === true){
                        actions.fetchSuggestData(data.data)
                    }
                },'json')

			},500);

        }else{
            actions.fetchSuggestData([])
        }

    }


    render() {
        const { dispatchCluesState ,actions } = this.props
        console.log(this.props)
        const suggestData = dispatchCluesState.toJS().suggestData
        const nodes = suggestData.map((item,index) => {
            return (
                <li className="suggest-item" key = { index } id ={ item.ID }>
                    <span className="suggest-text">{ item.Name }</span>
                </li>
            )
        })

        return (
            <div className="col-cktop-Hightsearch">
                <input type="text" className="Hightsearch_input" onKeyUp = { this.handleMasterChange.bind(this) } placeholder="输入线索负责人" />
                <button className="Hightsearch-btn">高级搜索</button>

                <div className="suggest suggest-search">
                	<ul className="list-hook">
                        { nodes }

                	</ul>
                </div>
            </div>
        )


    }
}
