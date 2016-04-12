import React ,{ Component, PropTypes ,findDOMNode} from 'react'
let InittextareaPadding = 0;
let itemdata = [];
let iStart=0;
let iTop=0;
let scrollBool=false;
//let ReactDOM.findDOMNode(this.refs.mListUl).scrollTop=0;    //刷新时，还原内容位置，如果不想还原，此处应该修改滚动条的坐标。

export  default class PeopleSearch extends Component{
	constructor(props) {
        super(props)
        this.haddleClick = this.haddleClick.bind(this);
        this.wheel = this.wheel.bind(this);
        this.clickBarDoMove =this.clickBarDoMove.bind(this);
        this.mousedownDar =this.mousedownDar.bind(this);
        this.stopMove = this.stopMove.bind(this);
        this.handleScroll = this.handleScroll.bind(this);

    }	
    componentDidMount(prevProps, prevState) {
        const { getPeopleData } = this.props;
        getPeopleData();
        const BombBoxList = ReactDOM.findDOMNode(this.refs.BombBoxList);
        const dRight = ReactDOM.findDOMNode(this.refs.dRight);
        const scrollBar = ReactDOM.findDOMNode(this.refs.scrollBar);
        const mbox_boxList = ReactDOM.findDOMNode(this.refs.mbox_boxList);

        const mouseWheel=(/firefox/i.test(navigator.userAgent))?'DOMMouseScroll':'mousewheel';

        if(BombBoxList.attachEvent){
            BombBoxList.attachEvent('on'+mouseWheel,this.wheel);

        }
        else if(BombBoxList.addEventListener){
            BombBoxList.addEventListener(mouseWheel,this.wheel,false);

        }
        
       BombBoxList.onmouseover=()=>{
            scrollBar.style.display = 'block';
                        
            if(mbox_boxList.scrollHeight>mbox_boxList.clientHeight)
            {//计算滚动条滑块的长度

                scrollBar.style.height=mbox_boxList.clientHeight*dRight.clientHeight/mbox_boxList.scrollHeight+'px';
                scrollBool=true;
            }
            else
            {//内容小于可视区时，隐藏滚动条

                scrollBar.style.visibility='hidden';
                scrollBool=false;
            }
        };
        BombBoxList.onmouseout=()=>{
            scrollBar.style.display = 'none';
        };
    }
    haddleClick(i){
       const myLiNameText = this.props.mapState.toJS().data[i].Name;
       let itemdata = this.props.mapState.toJS().itemdata;
       let InittextareaPadding = this.props.mapState.toJS().areapadding;

        let itemWidth = 11;
        for(let j = 0; j<myLiNameText.length;j++){
          //汉字
          if(myLiNameText.charCodeAt(j) > 255){
            itemWidth += 12;
          }else{
            itemWidth += 6;
          }
        };
        let namearr = [];
        if(itemdata.length>0){
            for(let i = 0; i<itemdata.length;i++){
                 namearr.push(itemdata[i].itemName);                
            }
            if(namearr.indexOf(myLiNameText)<0){
                itemdata.push({"itemName":myLiNameText,"itemWidth":itemWidth});
                InittextareaPadding +=itemWidth;
            }
        }else{
            itemdata.push({"itemName":myLiNameText,"itemWidth":itemWidth});
            InittextareaPadding +=itemWidth;
        }
       
        const { clickPeopleDate } = this.props;
        clickPeopleDate({"itemdata":itemdata,"areapadding":InittextareaPadding});
        
    }
    mousedownDar(e){
        const scrollBar = ReactDOM.findDOMNode(this.refs.scrollBar);
        scrollBool=true;
        e=e||window.event;
        iStart=e.clientY;
        iTop=scrollBar.offsetTop;
        if(scrollBar.setCapture)
        {
            scrollBar.onmousemove=this.clickBarDoMove;
            scrollBar.onmouseup=this.stopMove;
            scrollBar.setCapture();
        }
        else
        {
            document.addEventListener('mousemove',this.clickBarDoMove,true);
            document.addEventListener('mouseup',this.stopMove,true);
        }

    }
    clickBarDoMove(e){
        const dRight = ReactDOM.findDOMNode(this.refs.dRight);
        const scrollBar = ReactDOM.findDOMNode(this.refs.scrollBar);
        const mbox_boxList = ReactDOM.findDOMNode(this.refs.mbox_boxList);

        if(scrollBool==false) return;
        e=e||window.event;
        let y=e.clientY-iStart+iTop;
        if(y<0)
        {
            y=0;
        }//滚动条的移动区域
        else if(y>dRight.clientHeight-scrollBar.clientHeight)
        {        
            y=dRight.clientHeight-scrollBar.clientHeight;
        }

        let h=dRight.clientHeight-scrollBar.clientHeight;
        let yh=y/h*(mbox_boxList.scrollHeight-mbox_boxList.clientHeight)    //内容随滚动条滚动
        
        scrollBar.style.top=y+'px';
        mbox_boxList.scrollTop=yh;
    }

    stopMove(){
        const scrollBar = ReactDOM.findDOMNode(this.refs.scrollBar);

        if(scrollBar.releaseCapture)
            scrollBar.releaseCapture();
        else
        {
            document.removeEventListener('mousemove',this.clickBarDoMove,true);
            document.removeEventListener('mouseup',this.stopMove,true);
        }
        scrollBar.onmousemove=null;
        scrollBar.onmouseup=null;
        scrollBool=false;
    }
    wheel(e){
        const dRight = ReactDOM.findDOMNode(this.refs.dRight);
        const scrollBar = ReactDOM.findDOMNode(this.refs.scrollBar);
        const mbox_boxList = ReactDOM.findDOMNode(this.refs.mbox_boxList);
        if(scrollBool==false) return;
        e=e||window.event;
        let detail=e.wheelDelta?e.wheelDelta:e.detail*(-120);
        let y=mbox_boxList.scrollTop;
        let h=mbox_boxList.scrollHeight-mbox_boxList.clientHeight;
        y=detail>=120?y-30:y+30;
        if(y<0) y=0;
        else if(y>h) y=h;
        let yh=y/h*(dRight.clientHeight-scrollBar.clientHeight);
        mbox_boxList.scrollTop=y;
        if(yh<0) yh=0;
        scrollBar.style.top=yh+'px';
    }
    handleScroll(){
      const scroll_height = ReactDOM.findDOMNode(this.refs.mbox_boxList).scrollHeight;
      const  win_height = ReactDOM.findDOMNode(this.refs.mbox_boxList).clientHeight;
      const scroll_top = ReactDOM.findDOMNode(this.refs.mbox_boxList).scrollTop;

      if ((scroll_height - win_height - scroll_top) == 0&&scroll_top>0 ) {
        const {loadNextPage} = this.props;
        loadNextPage();

      }
    }

	render(){
    const { mapState }  = this.props;
	
    const peopleListData = mapState.toJS().data;
		return (
	        <div className="mbox_BombBoxList01"  ref = "BombBoxList" >
            <div className = "mbox_boxList02" ref = "mbox_boxList" onScroll ={this.handleScroll}>
              <ul className="clearfix m_list02" ref = "mListUl">
                {
                    peopleListData.map((item, i) => {
                        return (
                            <li key={i} onClick={this.haddleClick.bind(this,i)} >
                               <a href="#" target="_blank"><img src={item.Avatar} width="60" height="60" /></a>
                              <h5 >{item.Name}</h5>
                              <div className="zhiwei"><a href="#" target="_blank">{item.Dept}</a></div>
                            </li>
                        )
                    })
                }
              </ul>
            </div>
              <div id="dRight" ref = "dRight" onClick = {this.clickBarDoMove}>
                    <div id="scrollBar" ref = "scrollBar"  onMouseDown= {this.mousedownDar}>
                    </div>
             </div>
	        </div>
		)
	}
	
}  