/**
 * Created by c on 16/3/11.
 */
import { findDOMNode } from 'react-dom'
import { Spin , message } from 'antd';

let count = 0
export default class Search extends React.Component {

    constructor(props) {
        super(props)
        this.state = {}
    }

    componentDidMount(){
        const { dispatchCluesState ,actions } = this.props
        const $List = $(findDOMNode(this.refs.suggestList))

        $.post(SCRM.url('/deptcomponent/DeptComponent/getUserListForLeadAssign'),function(data){
            if(data.rs === true){
                actions.fetchSuggestData(data.data)
            }
        },'json')


    }

    searchFetchData(id){
        const { dispatchCluesState ,actions } = this.props
        const dispatchState = dispatchCluesState.toJS().dispatchState
        $.post(SCRM.url('/scrmlead/index/getAssignList'),{
            assigned:dispatchState,//0未分派,1已分派未处理 不传默认0
            page:1,
            rowsPerPage:20,
            canAssign:1,
            ownerID:id
        },function(data){
            if(data.rs === true){
                const rowData = data.data.rowData;
                actions.fetchData(true,rowData)
            }else{
                message.error('服务器错误，请联系客服！')
            }
        },'json')
    }

    clickSearchOwer(){
        const { dispatchCluesState ,actions } = this.props
        const suggestData = dispatchCluesState.toJS().suggestData
        const $list = $(findDOMNode(this.refs.suggestListWrap))
        const val = findDOMNode(this.refs.searchInput).value.trim()

        if(!val){
            message.error('线索负责人不能为空')
            $list.hide()
            return false;
        }

        const fliterData = suggestData.filter(function(item){
             let reg = new RegExp(`^${val}$`);
             return reg.test(item.Name)
        })

        if(fliterData.length){
            const id = fliterData[0].ID
            this.searchFetchData(id)

        }else{
            message.error('此人不存在,请正确输入')
        }


    }

    clickGuggest(value){
        //alert(value)
    }

    searchKeyUp(e){
        const $list = $(findDOMNode(this.refs.suggestList))
        const len = $list.children().length

        if(e.which === 40 || e.which === 38){
            $list.children().eq(count).addClass('active').siblings().removeClass('active')
            const text = $list.children().eq(count).html()
            findDOMNode(this.refs.searchInput).value = text;

        }
        if(e.which === 40){
            count++;
            if(count === len) count = 0

        }else if(e.which === 38){
            count--;
            if(count < 0) count = len-1
        }

        if(e.which === 13){
            this.clickSearchOwer()
        }
    }

    handleMasterChange(e){
        const value = e.target.value.trim()
        this.setState({"searchVal":value})

    }


    render() {
        const { dispatchCluesState ,actions } = this.props
        const suggestData = dispatchCluesState.toJS().suggestData
        const { searchVal } = this.state

        const fliterData = suggestData.filter(function(item){
             let reg = new RegExp(`^${searchVal}`);
             return searchVal && reg.test(item.Name)
        })


        const nodes = fliterData.map((item,index) => {
            return (
                <li className="suggest-item" key = { index } data-id ={ item.ID } onClick = { this.clickGuggest.bind(this,item.Name) }>
                    { item.Name }
                </li>
            )
        })

        return (
            <div className="col-cktop-Hightsearch">
                <div className = "searchWrap">
                    <input ref="searchInput" type="text" autocomplete="off" className="Hightsearch_input" onKeyUp = { this.searchKeyUp.bind(this) } onChange = { this.handleMasterChange.bind(this) } placeholder="输入线索负责人" />
                    <button  className ="searchBtn" onClick = { this.clickSearchOwer.bind(this) }>搜索</button>
                </div>
                <button className="Hightsearch-btn">高级搜索</button>

                <div className="suggest suggest-search" ref="suggestListWrap" style = { nodes.length ? {"display":"block"} : {"display":"none"} }>
                	<ul className="list-hook" ref="suggestList">
                        { nodes }
                	</ul>
                </div>
            </div>
        )


    }
}
