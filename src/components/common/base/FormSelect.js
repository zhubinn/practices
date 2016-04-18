/**
 * Created by ytm on 16/4/15.
 */
import { bindActionCreators }from 'redux'
import { connect } from 'react-redux'
import classNames from 'classnames/dedupe'

/**
 * FormSelect 控件 
 * data(列表数据:array|func), 
 * mult(是否支持多选：boolean)
 * filterAble(是否支持搜索：boolean)
 */


class FormSelect extends React.Component
{
    constructor()
    {
        super()
        this.handleOptionClick = this.handleOptionClick.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleResultClick = this.handleResultClick.bind(this);
        this.close = this.close.bind(this);
        this.state = {
            val:"简单数组",
            multVal:[],
            isShowoptions: false,
            filterVal: [],
        }
    }

    onChange()
    {
        let val;
        if(this.props.mult){
            val = this.state.multVal;
        }else{
            val = this.state.val;
        }
        this.props.onChange(val);
    }

    handleOptionClick (i)
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
            this.close();
            this.setState({
                val
            });
        }

        this.onChange()
    }

    handleChange (e)
    {
        let value =  e.target.value;
        let arr = this.props.data.filter(function(item){
            return item.indexOf(value) > -1;
        });
        this.setState({
            filterVal: arr,
        });
    }

    open () 
    {
        this.setState({
            isShowoptions: true,
        });
    }

    close ()
    {
        this.setState({
            isShowoptions: false,
        });
    }

    handleResultClick ()
    {
        this.open();
    }

    componentWillMount () 
    {
        this.setState({
            filterVal: this.props.data,
        });
    }

    handleItemDel (i, e)
    {
        e.stopPropagation()
        let multVal = this.state.multVal;
        multVal.splice(i, 1);
        this.setState({
            multVal
        });
        this.onChange()
    }

    componentClickAway () 
    {
        this.setState({
            isShowoptions: false,
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
                            <i className="search"  onClick = {this.close}>关闭</i>
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

export default FormSelect