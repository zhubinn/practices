/**
 * Created by ytm on 16/4/13.
 */
import { bindActionCreators }from 'redux'
import { connect } from 'react-redux'
import classNames from 'classnames/dedupe'
import { requireCss } from './themes'


class FormControl extends React.Component
{
    constructor()
    {
        super()
    }
    render()
    {
        return (
            <div className="ck-ui">
                <Input seachType={"text"} required={true} min={2} max={10} readOnly={false} />
            </div>
        )
    }
}


class Input extends
React.Component
{
    constructor()
    {
        super()
        this.onChange = this.onChange.bind(this);
        this.stata = {
            txt:"不能为空"
        }
    }
    onChange(e)
    {
        debugger
       let valueLength =  e.target.value.length;
        if(valueLength < 2){
            this.setState({
                txt:"太短"
            })
        }else if(valueLength > 6){
            this.setState({
                txt:"太长"
            })
        }else {
            this.setState({
                txt:"验证通过"
            })
        }
    }
    render()
    {
        return (
            <div className="ck-control-group">
                <input type='text' readOnly={this.props.readOnly} onChange = {this.onChange}/>
                <span className = "error" ref = 'errorbox'>{this.stata.txt}</span>
            </div>
        )
    }
}
export default FormControl