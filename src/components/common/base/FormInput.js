/**
 * Created by ytm on 16/4/14.
 */
import { bindActionCreators }from 'redux'
import { connect } from 'react-redux'
import classNames from 'classnames/dedupe'
import Regs from './regs';

/**
 * FormInput 控件 
 * seachType(表单类型:string), 
 * title（标题:string）, 
 * placeholder（预提示文本:string）, 
 * required（是否必填:boolean）, 
 * min（最小长度:number）, 
 * max（最大长度:number）, 
 * tip（错误提示自定义:string), 
 * emptyTip（不能为空提示自定义:string）, 
 * onChange(val)（数值改变函数，val是改变的值:func）,
 */

class FormInput extends React.Component
{
    constructor()
    {
        super()

        this.handleChange = this.handleChange.bind(this);

        this.state = {
            tip:"",
            value:"",
            isShowError: false,
            hidePlaceholder: false,
        }
    }

    componentWillReceiveProps (nextProps) {
        if (nextProps.value !== this.props.value) {
          this.setValue(nextProps.value);
        }
    }

    getValue () {
        return this.refs.input.value;
    }

    setValue (value) {
        this.setState({ value });
    }

    getType () {
        var seachType = this.props.seachType || "text";

        switch (seachType)
        {
            case "text":
                return "text";

            case "password":
                return "password";

            case "textarea":
                return "textarea";

            default:
                return "text";
        }
    }

    handleChange(e)
    {
        let tip = '';
        let emptyTip = this.props.emptyTip || "不能为空";
        let required = this.props.required || false;
        let min = this.props.min || 2;
        let max = this.props.max || 300;
        let value =  e.target.value;
        let valueLength =  e.target.value.length;
        let isShowError = true;
        let hidePlaceholder;
        
        if( valueLength < min || valueLength > max ){
            tip = this.props.tip || "格式错误";
            if(required && valueLength == 0){
                tip = emptyTip;
            }else if(!required && valueLength == 0){
                tip = "";
                isShowError = false;
            }else{
                tip = this.props.tip || "格式错误";
            }
        } else {
            let newRegs = Regs[this.props.seachType] || Regs['text'] 
            if (!newRegs.test(value)) {
                tip = this.props.tip || "格式错误";
            }else{
                tip = "验证通过";
                isShowError = false;
            }
        }
        if(valueLength == 0){
            hidePlaceholder = false;
        }else{
            hidePlaceholder = true;
        };

        this.setState({
            tip,
            isShowError,
            hidePlaceholder,
        });

        let getValue = this.getValue();

        this.props.onChange(getValue);
        this.setValue (getValue);
    }

    render()
    {

        let ckControl = classNames({
          'ck-control-group': true,
          'isShow': this.state.isShowError,
        });

        let placeholder = classNames({
            'placeholder': true,
            'show-placeholder': this.state.hidePlaceholder,
        });

        if(this.getType() == "textarea"){
            return (
                <div className={ckControl}>
                    {this.props.title}
                    <div className="ck-control-box">
                        <textarea ref="input" rows={this.props.rows}  onChange = {this.handleChange} />
                        <span className={placeholder}>{this.props.placeholder}</span>
                        <span className="error" ref='errorbox'>{this.state.tip}</span>
                    </div>
                    {this.state.value}
                </div>
            )
        }else{
            return (
                <div className={ckControl}>
                    {this.props.title}
                    <div className="ck-control-box">
                        <input value = {this.state.value} type={this.getType()} readOnly={this.props.readOnly} onChange = {this.handleChange}  ref = "input" />
                        <span className={placeholder}>{this.props.placeholder}</span>
                        <span className="error" ref='errorbox'>{this.state.tip}</span>
                    </div>
                    {this.state.value}
                </div>
            )
        }

    }
}


export default FormInput