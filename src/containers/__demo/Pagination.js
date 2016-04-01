/**
 * Created by c on 16/3/21.
 */
import { connect } from 'react-redux'

class  Pagecon extends React.Component{
  getInitialState: function(){
    var pageCount = this.props.total;
    var current = this.props.index;
    var size = this.props.size;
    return {
      items:[], 
      pageCount: pageCount, 
      current: current, 
      preDisabled :true, 
      nextDisabled: true, 
      size:20,
      cacheCurrent: 1
    };
  },
  fillList:  function(cacheCurrent){
    var current = cacheCurrent || this.state.current;
    var pageCount = this.state.pageCount;
    var items = [];
    var obj = {};
    //列表页码
    if(current != 1 && current >= 4 && pageCount != 4){
      obj.text = 1;
      items.push(obj);
      obj = {};
    };
    if(current-2 > 2 && current <= pageCount && pageCount > 5){
      obj.text = "...";
      obj.className = "ellipsis";
      items.push(obj);
      obj = {};
    };
    var start = current - 2, end = current + 2;
    if((start > 1 && current < 4) || current == 1){
      end++;
    };
    if(current > pageCount-4 && current >= pageCount){
      start--;
    };
    for (;start <= end; start++) {
      if(start <= pageCount && start >= 1){
        if(start != current){
          obj.text = start;
          items.push(obj);
          obj = {};
        }else{
          obj.text = start;
          obj.className = "current";
          items.push(obj);
          obj = {};
        }
      }
    };
    if(current + 2 < pageCount - 1 && current >= 1 && pageCount > 5){
      obj.text = "...";
      obj.className = "ellipsis";
      items.push(obj);
      obj = {};
    };
    if(current != pageCount && current < pageCount -2  && pageCount != 4){
      obj.text = pageCount;
      items.push(obj);
      obj = {};
    };
    return items;
  },
  componentWillMount: function(){
    var items = this.fillList();
    var pageCount = this.state.pageCount;
    var nextDisabled = this.state.nextDisabled;
    if(pageCount != 1){
      nextDisabled = false;
    };
    this.setState({items: items, nextDisabled: nextDisabled})
  },
  preClick: function(){
    var cacheCurrent = this.state.current;
    var preDisabled, nextDisabled, items;
    if(cacheCurrent > 1){
      cacheCurrent -= 1;
    }else{
      return;
    };
    items = this.fillList(cacheCurrent);
    if(cacheCurrent == 1 && cacheCurrent != this.state.pageCount){
      preDisabled = true;
      nextDisabled = false;
    };
    this.setState({
      current: cacheCurrent, 
      items: items, 
      preDisabled : preDisabled, 
      nextDisabled :nextDisabled
    });
  },
  listClick: function(cacheCurrent){
    var items, preDisabled, nextDisabled;
    items = this.fillList(cacheCurrent);
    if(cacheCurrent == 1){
      preDisabled = true;
    };
    if(cacheCurrent == this.state.pageCount){
      nextDisabled = true;
    };
    this.setState({current: cacheCurrent, items: items, preDisabled :preDisabled, nextDisabled :nextDisabled});
  },
  nextClick: function(){
    var cacheCurrent = this.state.current;
    var pageCount = this.state.pageCount;
    var preDisabled, nextDisabled, items;
    if(cacheCurrent < pageCount){
      cacheCurrent += 1;
    }else{
      return;
    };
    items = this.fillList(cacheCurrent);
    if(cacheCurrent == pageCount){
      preDisabled = false;
      nextDisabled = true;
    }
    this.setState({
      current: cacheCurrent, 
      items: items, 
      preDisabled : preDisabled, 
      nextDisabled :nextDisabled
    });
  },
  goPage: function(){
    var items, preDisabled, nextDisabled;
    var pageCount = this.state.pageCount;
    var cacheCurrent = parseInt(this.state.cacheCurrent);
    if(cacheCurrent > 1 && cacheCurrent < pageCount){   
      items = this.fillList(cacheCurrent);
      preDisabled = false;
      nextDisabled = false;
    }else if(cacheCurrent == 1){
      items = this.fillList(cacheCurrent);
      preDisabled = true;
      nextDisabled = false;
    }else if(cacheCurrent == pageCount){
      items = this.fillList(cacheCurrent);
      preDisabled = false;
      nextDisabled = true;
    }else{
      alert("页码超出范围！检查输入值");
      return;
    }
    this.setState({current: cacheCurrent, items: items, preDisabled : preDisabled, nextDisabled :nextDisabled});
  },
  changeVal: function(e){
     this.setState({cacheCurrent: e.target.value});
  },
  componentDidUpdate: function(){
      console.log(this.state);
  },
  changeSize: function(size){
    var size = parseInt(size);
    if(isNaN(size)){
      return
    }
    this.setState({size: size});
  },
  render: function() {
    return (
      <div className="react-Page">
        <PageListLen size = {this.state.size} changeSize = {this.changeSize}/>
        <PagePre text="上一页" preClick = {this.preClick} preDisabled = {this.state.preDisabled}/>
        <PageList List = {this.state.items} listClick = {this.listClick} />
        <PageNext text="下一页" nextClick = {this.nextClick} nextDisabled = {this.state.nextDisabled}/>
        <PageGo text="跳转" goPage = {this.goPage} changeVal = {this.changeVal}/>
      </div>
    );
  }
};
//列表长度
var PageListLen = React.createClass({
  changeSize: function(e){
      this.props.changeSize(e.target.value)
  },
  render: function(){
    var that = this;
    return (
      <div className="go-page-box">
        列数：
        <input className="PageListLen" type="text" ref = "PageListLen" value = {this.props.size} onChange = {this.changeSize} />
      </div>
    )
  }
});
//上一页
var PagePre = React.createClass({
  preClick: function(){
    this.props.preClick();
  },
  render: function(){
    var that = this;
    var cx = React.addons.classSet;
    var classes = cx({
      'prePage': true,
      'disabled': this.props.preDisabled
    });
    return (
      <a className={classes} onClick={that.preClick}>{that.props.text}</a>
    )
  }
});

//页码列表
var PageList = React.createClass({
  listClick: function(cacheCurrent){
    this.props.listClick(cacheCurrent);
  },
  render: function(){
        var that = this;
        var createItem = function(itemText, i) {
            if(itemText.className == "ellipsis" || itemText.className == "current"){
              return <span key={i} className = {itemText.className}>{itemText.text}</span>;
            }else{
              return <a key={i} className = {itemText.className} onClick={that.listClick.bind(that, itemText.text)} >{itemText.text}</a>;
            };
        };
        return <span>{this.props.List.map(createItem)}</span>;
  }
});

//下一页
var PageNext = React.createClass({
  nextClick: function(){
    this.props.nextClick();
  },
  render: function(){
    var that = this;
    var cx = React.addons.classSet;
    var classes = cx({
      "nextPage": true,
      'disabled': this.props.nextDisabled
    });
    return (
      <a className={classes} onClick={that.nextClick}>{that.props.text}</a>
    )
  }
});

//跳转
var PageGo = React.createClass({
  goPage: function(){
    var input = this.refs.iptPage;
    var cacheCurrent = input.value;
    this.props.goPage(cacheCurrent);
  },
  render: function(){
    var that = this;
    return (
      <div className="go-page-box">
        到<input className="inputPage" type="input" ref="iptPage" onChange = {this.props.changeVal} />页 
        {" "} 
        <button className="goPage" onClick={that.goPage}>{this.props.text}</button> 
      </div>
    )
  }
});


// React.render(
//   <Pagecon index = {1} size={40} total={20} onChange={function(){}} />,  document.getElementById("pageBox")
// );
