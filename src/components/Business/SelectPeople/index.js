/**
 * Created by fuwenfang on 5/5/16.
 */
// 选人组件内部

import React ,{findDOMNode} from 'react'

import { Modal,message, Button,Row,Checkbox } from 'antd';

import { isEmpty } from 'lodash'
import './search.less'

import {domAlign} from 'dom-align';

export default class SelectPeople extends React.Component {


    static propTypes = {
        data: React.PropTypes.array,
        IsMultiselect: React.PropTypes.number,
        selectPeopleModal: React.PropTypes.bool,
        checkedRowsLength: React.PropTypes.number
    }

    static defaultProps = {
        IsMultiselect: 0,
        data: [],
        selectPeopleModal: false,
        checkedRowsLength: 0
    }


    constructor(props) {
        super(props)
        this.state = {
            'itemdata': [],
            'areapadding': 0,
            'value': '',
            'currentPage': 1,
            'isChangeBusiness': false,
            'isChangeContact': false
        }
    }

    componentDidMount() {

    }

    /*搜索框部分方法开始*/


    //点击tag标签删除nameTag

    clickNameTag(i) {

        let ItemData = this.state.itemdata;
        let newareapadding = this.state.areapadding;

        newareapadding = newareapadding - ItemData[i].itemWidth;
        ItemData.splice(i, 1);

        setTimeout(()=> {
            this.setState({
                "itemdata": ItemData,
                "areapadding": newareapadding
            })
        }, 0)

    }

    //按下退格删除键删除
    handleKeyDown(e) {
        e = e || window.event
        let ItemData = this.state.itemdata;
        let newareapadding = this.state.areapadding;
        let textValue = e.currentTarget.value;
        //屏蔽回车键的换行
        if (e.keyCode == 13) {
            window.event.returnValue = false
            return false
        }

        if (e.keyCode == 8 && textValue.length == 0 && ItemData.length > 0) {

            newareapadding = newareapadding - ItemData[ItemData.length - 1].itemWidth;
            ItemData.splice(ItemData.length - 1, 1);

            setTimeout(()=> {
                this.setState({
                    "itemdata": ItemData,
                    "areapadding": newareapadding
                })
            }, 0)

        }
        // if(ItemData.length == 0 && e.keyCode == 8){
        //     //TODO
        //     let page = 1
        //     console.log("当删除最后一个tag时重新拿到全部数据")

        //     this.props.requestData(page,'')
        // }
    }

    //keyUp 搜索
    handleKeyUp(e) {
        e = e || window.event
        const textValue = e.currentTarget.value;
        const nameItemData = this.state.itemdata;

        let self = e.target;
        clearTimeout(self.timer);

        if (e.keyCode != 13) {
            self.timer = setTimeout(
                function () {
                    delete self.timer;
                    //当textValue为关键词进行搜索请求数据
                    let page = 1

                    setTimeout(()=> {
                        this.setState({
                            "currentPage": page,
                        })
                    }, 0)

                    let rowsPerPage = textValue == '' ? 20 : 60


                    if (textValue == '') {
                        if (nameItemData.length == 0) {
                            console.log('按kong关键词进行搜索')
                            this.props.requestData(page, textValue, rowsPerPage)
                        }

                    } else {
                        console.log('按关键词进行搜索')
                        //debugger
                        this.props.requestData(page, textValue, rowsPerPage)
                    }


                }.bind(this),
                500
            );
        }

    }

    //改变输入框关键词
    changeInput(e) {
        e = e || window.event
        const value = e.target.value
        this.setState({
            'value': value
        })
    }

    /*搜索框部分方法结束*/


    //搜索框部分
    searchTextarea = ()=> {
        const nameItemData = this.state.itemdata;
        const arreapadding = this.state.areapadding;

        return (
            <div className="mbox784_textwrap">
                <input id="textarea" rows="1" className="M01text"
                       ref="textarea"
                       style={{paddingLeft: (10+arreapadding) + 'px'}}
                       onKeyDown={this.handleKeyDown.bind(this)}
                       onKeyUp={this.handleKeyUp.bind(this)}
                       value={this.state.value}
                       onChange={this.changeInput.bind(this)}
                />
                <p className="dev-tags">
                    {
                        nameItemData.map((item, i)=> {
                            return (
                                <span className="nameSpan" key={i}
                                      onClick={this.clickNameTag.bind(this,i)}>{item.itemName}
                                    <a className="tagClose"></a>
                                    </span>
                            )
                        })
                    }
                </p>
            </div>
        )

    }


    /*人员展示列表方法开始*/
    clickListItem(i) {
        const clickData = this.props.data[i]
        const IsMultiselect = this.props.IsMultiselect
        let itemdata = this.state.itemdata;
        let InittextareaPadding = this.state.areapadding;
        let itemWidth = 20;
        for (let j = 0; j < clickData.Name.length; j++) {
            //汉字
            if (clickData.Name.charCodeAt(j) > 255) {
                itemWidth += 12;
            } else {
                itemWidth += 7;
            }
        }
        ;
        let namearr = [];
        /* *
         *0 单选  ；1 可多选
         */
        if (IsMultiselect == 0) {
            itemdata.splice(0, itemdata.length)
            itemdata.push({"ownerId": clickData.ID, "itemName": clickData.Name, "itemWidth": itemWidth});
            InittextareaPadding = itemWidth;
        } else {
            if (itemdata.length > 0) {
                for (let i = 0; i < itemdata.length; i++) {
                    namearr.push(itemdata[i].itemName);
                }
                if (namearr.indexOf(clickData.Name) < 0) {
                    itemdata.push({"ownerId": clickData.ID, "itemName": clickData.Name, "itemWidth": itemWidth});
                    InittextareaPadding += itemWidth;
                }
            } else {
                itemdata.push({"ownerId": clickData.ID, "itemName": clickData.Name, "itemWidth": itemWidth});
                InittextareaPadding += itemWidth;
            }
        }

        setTimeout(()=> {
            this.setState({
                "itemdata": itemdata,
                "areapadding": InittextareaPadding,
                "value": ''
            })
        }, 0)
    }

    //滚动底部加载下一页

    handleScroll() {
        const scroll_height = ReactDOM.findDOMNode(this.refs.BombBoxList).scrollHeight;
        const win_height = ReactDOM.findDOMNode(this.refs.BombBoxList).clientHeight;
        const scroll_top = ReactDOM.findDOMNode(this.refs.BombBoxList).scrollTop;
        const searchValue = this.state.value
        if (searchValue == '' && (scroll_height - win_height - scroll_top) == 0) {
            console.log(scroll_height)
            console.log(win_height)
            console.log(scroll_top)

            let currentpage = this.state.currentPage
            currentpage++
            setTimeout(()=> {
                this.setState({
                    "currentPage": currentpage,
                })
            }, 0)


            this.props.requestNextData(currentpage, '')

        }
    }

    componentDidMount() {
    }

    /*人员展示列表方法结束*/

    //人员列表展示部分

    peopleList = ()=> {
        const peopleListData = this.props.data;

        return (
            <div className="mbox_BombBoxList01" ref="mbox_boxList">
                <div className="mbox_boxList02" ref="BombBoxList"
                     onScroll={this.handleScroll.bind(this)}>
                    <ul className="clearfix m_list02" ref="mListUl">
                        {
                            peopleListData.map((item, i) => {
                                return (
                                    <li key={i} onClick={this.clickListItem.bind(this,i)}>
                                        <a href="#" target="_blank"><img src={item.Avatar} width="60" height="60"/></a>
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


    // 确认 取消
    confirmBtn = ()=> {
        const that = this
        const choseData = this.state.itemdata;
        const ConfirmForm = React.createClass({
            clickCancleBtn(){
                //回调父组件的方法，改变容器的state
                setTimeout(()=> {
                    //关闭模态层时状态恢复初始
                    that.setState({
                        "currentPage": 1,
                        "value": '',
                        'itemdata': [],
                        'areapadding': 0,
                        'isChangeBusiness': false,
                        'isChangeContact': false
                    })
                }, 0)

                this.props.clickCancle()
            },
            clickConfirmBtn(){
                //回调父组件的方法，改变容器的state 
                let choseNameData = [];
                for (let i = 0; i < choseData.length; i++) {
                    choseNameData.push({
                        'name': choseData[i].itemName,
                        'ownerId': choseData[i].ownerId
                    });
                }
                if (choseNameData.length == 0) {
                    message.config({
                        top: 250
                    });
                    message.warn('请您先选择人员');
                } else {
                    //关闭模态层时状态恢复初始
                    setTimeout(()=> {
                        that.setState({
                            "currentPage": 1,
                            "value": '',
                            'itemdata': [],
                            'areapadding': 0,
                            'isChangeBusiness': false,
                            'isChangeContact': false
                        })
                    }, 0)
                    let filterData = {}
                    filterData.choseNameData = choseNameData
                    filterData.isChangeBusiness = that.state.isChangeBusiness
                    filterData.isChangeContact = that.state.isChangeContact
                    this.props.clickOK(filterData)
                }


            },
            render (){
                return (
                    <div className="m_btn01 clearfix">
                        <Row>
                            <Button type='primary' onClick={this.clickConfirmBtn}>确定</Button>
                            <Button onClick={this.clickCancleBtn}>取消</Button>
                        </Row>
                    </div>
                )
            }
        })

        return (<ConfirmForm
            clickCancle={this.props.handleClickCancle}
            clickOK={this.props.handleClickConfirm}
        />)

    }

    //点击模态层以及关闭X按钮
    clickCancleBtn() {
        //关闭模态层时状态恢复初始
        setTimeout(()=> {
            this.setState({
                "currentPage": 1,
                "value": '',
                'itemdata': [],
                'areapadding': 0,
                'isChangeBusiness': false,
                'isChangeContact': false
            })
        }, 0)
        this.props.handleClickCancle()
    }
//是否勾选改变生意
    handleChangeBusiness(e){
        const isChangeBusiness =  this.state.isChangeBusiness
        setTimeout(()=>{
            this.setState({
                "isChangeBusiness":!isChangeBusiness
            })
        },0)
    }

    //是否勾选改变联系人
    handleChangeContact(e){
        const isChangeContact = this.state.isChangeContact
        setTimeout(()=>{
            this.setState({
                "isChangeContact":!isChangeContact
            })
        },0)
    }

    render() {
        const selectPeopleModal = this.props.selectPeopleModal
        const checkedRowsLength = this.props.checkedRowsLength

        return (

            <Modal ref="modal"
                   className="peopelModalWrap"
                   visible={selectPeopleModal}
                   title="按负责人筛选"
                   width='840'
                   onCancel={this.clickCancleBtn.bind(this)}
                   footer={this.confirmBtn()}
            >
                <div>{this.searchTextarea()}</div>
                <div>{this.peopleList()}</div>
                <div style={{marginTop: '10px'}}>
                    <span style={{marginRight: '10px'}}>已选{checkedRowsLength}个客户</span>
                              <span>同时变更相关业务的负责人：                            
                               <label>
                                   <Checkbox ref="checkboxInput" checked={this.state.isChangeBusiness}
                                             onChange={this.handleChangeBusiness.bind(this)}/>
                                   生意
                               </label>
                               <label>
                                   <Checkbox ref="checkboxInput" checked={this.state.isChangeContact}

                                             onChange={this.handleChangeContact.bind(this)}/>
                                   联系人
                               </label>
                                </span>
                </div>
            </Modal>

        )
    }


}