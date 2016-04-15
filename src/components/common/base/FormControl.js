/**
 * Created by ytm on 16/4/14.
 */
import { bindActionCreators }from 'redux'
import { connect } from 'react-redux'
import classNames from 'classnames/dedupe'
import Regs from './regs';
import FormInput from './FormInput';
import FormSelect from './FormSelect';
import './FormControl.css';

class FormControl extends React.Component
{
    constructor()
    {
        super()
    }

    render()
    {
        //input表单测试
        // return (
        //     <div className="ck-ui">
        //         <FormInput title ={"名称:"} placeholder = {"2-8位任意字符"} seachType={"text"}  required={true} min={2} max={8} onChange = { (val) => { console.log("用户名：" + val) } }/>
        //         <FormInput title ={"邮箱:"} placeholder = {"必须包括@"} seachType={"email"} onChange = { (val) => { console.log("邮箱：" + val) } }/>
        //         <FormInput title ={"电话:"} placeholder = {"只允许输入数字"} seachType={"tel"} onChange = { (val) => { console.log("邮箱：" + val) } }/>
        //         <FormInput title ={"密码:"} placeholder = {"6-14位任意字符"} seachType={"password"}  required={true} min={6} max={14} tip = {"密码格式错误"} emptyTip = {"密码不能为空"}  onChange = { (val) => { console.log("密码：" + val) } }/>
        //         <FormInput title ={"输入框:"} placeholder = {"至少需要漂亮的15个字！"} seachType={"textarea"} required={false} rows = {3} min={15} onChange = { (val) => { console.log("框：" + val) } }/>
        //     </div>
        // )
        //Select表单表单测试
        return (
            <div className="ck-ui">
                <FormSelect mult={true} filterAble={true} data={["中国", "美国", "俄罗斯", "德国"]}/>
            </div>
        )
    }
}



export default FormControl