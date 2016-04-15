/**
 * Created by ytm on 16/4/13.
 */
import { bindActionCreators }from 'redux'
import { connect } from 'react-redux'
import classNames from 'classnames/dedupe'
import Regs from './regs';
import FormInput from './FormInput';
import './FormControl.css';

class FormControl extends React.Component
{
    constructor()
    {
        super()
    }

    render()
    {
        // return (
        //     <div className="ck-ui">
        //         <FormInput title ={"名称:"} placeholder = {"2-8位任意字符"} seachType={"text"}  required={true} min={2} max={8} onChange = { (val) => { console.log("用户名：" + val) } }/>
        //         <FormInput title ={"邮箱:"} placeholder = {"必须包括@"} seachType={"email"} onChange = { (val) => { console.log("邮箱：" + val) } }/>
        //         <FormInput title ={"电话:"} placeholder = {"只允许输入数字"} seachType={"tel"} onChange = { (val) => { console.log("邮箱：" + val) } }/>
        //         <FormInput title ={"密码:"} placeholder = {"6-14位任意字符"} seachType={"password"}  required={true} min={6} max={14} tip = {"密码格式错误"} emptyTip = {"密码不能为空"}  onChange = { (val) => { console.log("密码：" + val) } }/>
        //         <FormInput title ={"输入框:"} placeholder = {"至少需要漂亮的15个字！"} seachType={"textarea"} required={false} rows = {3} min={15} onChange = { (val) => { console.log("框：" + val) } }/>
        //     </div>
        // )
        
        return (
            <div className="ck-ui">
                <FormSelect mult={false} filterAble={true} data={["中国", "美国", "俄罗斯", "德国"]}/>
            </div>
        )
    }
}


/**
 * FormSelect 控件 
 * data(列表数据:array|func), 
 */


class FormSelect extends React.Component
{
    constructor()
    {
        super()
        this.handleOptionClick = this.handleOptionClick.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleResultClick = this.handleResultClick.bind(this);

        this.state = {
            val:"简单数组",
            multVal:[],
            isShowoptions: false,
            filterVal: [],
        }
    }

    handleOptionClick(i)
    {   

        let val = this.state.filterVal[i];
        if(this.props.mult){
            let multVal = this.state.multVal;
            if(multVal.indexOf(val) > -1){
                return;
            }
            multVal.push(val)
            this.setState({
                multVal
            });
        }else{
            let isShowoptions = !this.state.isShowoptions;
            this.setState({
                isShowoptions: isShowoptions,
                val
            });
        }

    }

    handleChange(e){
        let value =  e.target.value;
        let arr = this.props.data.filter(function(item){
            return item.indexOf(value) > -1;
        });
        this.setState({
            filterVal: arr,
        });
    }

    handleResultClick(){
        let isShowoptions = !this.state.isShowoptions
        this.setState({
            isShowoptions: isShowoptions,
        });
    }
    componentWillMount () {
        this.setState({
            filterVal: this.props.data,
        });
    }
    handleItemDel(i, e){
        e.stopPropagation()
        let multVal = this.state.multVal;
        multVal.splice(i, 1);
        this.setState({
            multVal
        });
    }
    render()
    {
        const createOptions = (item, i) => {
            return (
              <li key ={i} onClick = {this.handleOptionClick.bind(this, i)}>
              {item}
              </li>
            )
        }

        
        const createItems = (item, i) => {
            return (
              <span className = 'select-result-item' key ={i} onClick = {this.handleItemDel.bind(this, i)}>
              {item}
              </span>
            )
        }

        let isShowoptions = classNames({
            'select-options-wrap': true,
            'show-options-wrap': this.state.isShowoptions,
        });

        let options = this.state.filterVal;
        let items = this.state.multVal;

        return (
            <div className="ck-control-group">
                <div className="ck-control-select">
                    <div className="select-result" onClick = {this.handleResultClick}>
                    { this.props.mult ? items.map(createItems) : this.state.val }
                    </div>
                    <div className={isShowoptions}>
                    { this.props.filterAble ? 
                        <div className="filter">
                            <input type="text" onChange = {this.handleChange}/>
                            <i className="search">搜索</i>
                        </div>
                        : ""}
                        <ul>
                            {options.map(createOptions)}
                        </ul>
                    </div>
                </div>
                <span className="error"></span>
            </div>
        )
    }
}


export default FormControl