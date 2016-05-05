/**
 * Created by fuwenfang on 5/5/16.
 */
// 选人组件内部

import React ,{findDOMNode} from 'react'

import {Button} from 'antd'
import { isEmpty } from 'lodash'
import './search.less'

export default class SelectPeople extends React.Component {


    static propTypes = {
        data: React.PropTypes.array,
        //IsMultiselect: React.PropTypes.bool,
        selectPeopleModal: React.PropTypes.bool,

    }

    static defaultProps = {
        IsMultiselect: 0,
        data: [],
        selectPeopleModal:false
    }


    constructor(props) {
        super(props)
        this.state={
            'itemdata':[],
            'areapadding':0,
            'textValue':'',
            'currentPage':1
        }
    }
    componentDidMount(){

    }

    //搜索框部分
    searchTextarea=()=>{
        const nameItemData = this.state.itemdata;
        const arreapadding = this.state.areapadding;
        const value = this.state.textValue;
        const that = this
        const SearchTextArea = React.createClass({
            //点击tag标签删除
            clickNameTag(i){

                let ItemData = that.state.itemdata;
                let newareapadding = that.state.areapadding;
                
                newareapadding = newareapadding -ItemData[i].itemWidth;
                ItemData.splice(i,1);

                setTimeout(()=>{
                    that.setState({
                        "itemdata":ItemData,
                        "areapadding":newareapadding
                    })
                },0)

            },
            //按下退格删除键删除
            handleKeyDown(e){
                let ItemData = that.state.itemdata;
                let newareapadding = that.state.areapadding;
                const textValue = e.currentTarget.value;

                if(e.keyCode == 8&&textValue.length == 0){

                    newareapadding = newareapadding -ItemData[ItemData.length-1].itemWidth;
                    ItemData.splice(ItemData.length-1,1);
                    
                    setTimeout(()=>{
                        that.setState({
                            "itemdata":ItemData,
                            "areapadding":newareapadding
                        })
                    },0)

                }
                // if(ItemData.length == 0 && e.keyCode == 8){
                //     //TODO 
                //     let page = 1
                //     console.log("当删除最后一个tag时重新拿到全部数据")

                //     this.props.requestData(page,'')
                // }
            },

            //keyUp 搜索
            handleKeyUp(e){
                const textValue = e.currentTarget.value;
                const nameItemData = that.state.itemdata;

                let self = e.target;
                clearTimeout(self.timer);

                self.timer = setTimeout(
                    function()
                    {
                        delete self.timer;
                            //当textValue为关键词进行搜索请求数据
                            let page = 1
                            if(textValue == ''){
                                if(nameItemData.length==0){
                                    console.log('按关键词进行搜索')
                                    this.props.requestData(page,textValue)
                                }

                            }else{
                                console.log('按关键词进行搜索')
                                this.props.requestData(page,textValue)                           
                            }


                    }.bind(this),
                    500
                );
                    
            },

            componentDidMount(){
                React.findDOMNode(this.refs.textarea).focus()
            },


            render(){


                return (
                    <div className="mbox784_textwrap">
                      <textarea id="textarea" rows="1" className="M01text"
                      ref = "textarea"
                      style={{paddingLeft: (10+arreapadding) + 'px'}} 
                      onKeyDown = {this.handleKeyDown.bind(this)}
                       onKeyUp = {this.handleKeyUp.bind(this)}
                      ></textarea>
                      <p className = "dev-tags">
                           {
                            nameItemData.map((item,i)=>{
                                return (
                                    <span className ="nameSpan"  key = {i} onClick = {this.clickNameTag.bind(this,i)}>{item.itemName}
                                        <a className = "tagClose"></a>
                                    </span>
                                    )
                            })
                          }   
                      </p>
                    </div>
                )
            }
        })
        return <SearchTextArea   requestData =  {this.props.requestPoepleData}/>

    }

    //人员列表展示部分

    peopleList = ()=>{
       const peopleListData = this.props.data;
       const that = this
       const PeopleList = React.createClass({
            clickListItem(i){
                const clickData = that.props.data[i]
                const IsMultiselect = that.props.IsMultiselect
                let itemdata = that.state.itemdata;
                let InittextareaPadding = that.state.areapadding;
                let itemWidth = 20;
                for(let j = 0; j<clickData.Name.length;j++){
                  //汉字
                  if(clickData.Name.charCodeAt(j) > 255){
                    itemWidth += 12;
                  }else{
                    itemWidth += 7;
                  }
                };
                let namearr = [];
                /* *
                *0 单选  ；1 可多选
                */
                if(IsMultiselect==0){
                    itemdata.splice(0,itemdata.length)
                    itemdata.push({"ownerId":clickData.ID,"itemName":clickData.Name,"itemWidth":itemWidth});
                    InittextareaPadding =itemWidth;
                }else {
                    if(itemdata.length>0){
                        for(let i = 0; i<itemdata.length;i++){
                             namearr.push(itemdata[i].itemName);                
                        }
                        if(namearr.indexOf(clickData.Name)<0){
                            itemdata.push({"ownerId":clickData.ID,"itemName":clickData.Name,"itemWidth":itemWidth});
                            InittextareaPadding +=itemWidth;
                        }
                    }else{
                        itemdata.push({"ownerId":clickData.ID,"itemName":clickData.Name,"itemWidth":itemWidth});
                        InittextareaPadding +=itemWidth;
                    }
                }

                setTimeout(()=>{
                    that.setState({
                        "itemdata":itemdata,
                        "areapadding":InittextareaPadding
                    })
                },0)
            },

            //滚动底部加载下一页

            handleScroll(){

              const scroll_height = ReactDOM.findDOMNode(this.refs.BombBoxList).scrollHeight;
              const  win_height = ReactDOM.findDOMNode(this.refs.BombBoxList).clientHeight;
              const scroll_top = ReactDOM.findDOMNode(this.refs.BombBoxList).scrollTop;

              if ((scroll_height - win_height - scroll_top) == 0&&scroll_top>0 ) {
                let currentpage = that.state.currentPage
                currentpage++
                setTimeout(()=>{
                    that.setState({
                        "currentPage":currentpage,
                    })
                },0)


                this.props.requestNextData(currentpage,'')                           

            }
        },

            render (){
                return (
                    <div className="mbox_BombBoxList01"  ref = "BombBoxList" onScroll ={this.handleScroll}>
                        <div className = "mbox_boxList02" ref = "mbox_boxList" >
                          <ul className="clearfix m_list02" ref = "mListUl">
                            {
                                peopleListData.map((item, i) => {
                                    return (
                                        <li key={i} onClick ={this.clickListItem.bind(this,i)}>
                                           <a href="#" target="_blank"><img src={item.Avatar} width="60" height="60" /></a>
                                          <h5 >{item.Name}</h5>
                                          <div className="zhiwei"><a href="#" target="_blank">{item.Dept}</a></div>
                                        </li>
                                    )
                                })
                            }
                          </ul>
                        </div>
                    </div>
                )                
            }
       })

        return <PeopleList   requestNextData =  {this.props.requestPoepleData}></PeopleList>

    }


    // 确认 取消
    confirmBtn=()=>{
      const  ConfirmForm = React.createClass({
            clickCancleBtn(){
                //回调父组件的方法，改变容器的state          
                this.props.handleClick()
            },
            render (){
                return (
                    <div className = "m_btn01 clearfix">
                        <Button className="m_btn01L" type = 'ghost'>确认</Button>
                        <Button className="m_btn01R" type = 'ghost' onClick = {this.clickCancleBtn.bind(this)}>取消</Button>
                    </div>
                )        
            }
        })

        return (<ConfirmForm  handleClick = {this.props.handleClickCancle} />)

    }

    render (){
        const selectPeopleModal = this.props.selectPeopleModal 
        console.log(this.state) 

            if(selectPeopleModal){
                return (
                    <div className = "mbox_BombBoxBg">
                              <div className="mbox_BombBox">
                                 <div className = "mbox784" >
                                   <div className="mbox_filter clearfix">
                                      <h6>按负责人筛选</h6>
                                      <div className="mbox_filter_close01"></div>
                                    </div> 
                                    {this.searchTextarea()}
                                    {this.peopleList()}
                                    {this.confirmBtn()}
                                  </div>
                              </div>
                    </div>
                )
            }else{
                return <div></div>
            }

    }


}