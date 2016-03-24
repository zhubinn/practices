/**
 * Created by c on 16/3/11.
 */
import { findDOMNode } from 'react-dom'
import Input from 'components/common/base/Input'
import './Login.less'

export default class Login extends React.Component {
    constructor(props) {
        super(props)
        this.onLogin = this.onLogin.bind(this)
    }

    onBlur(e) {
        const ele = e.currentTarget
        const value = ele.value.trim()

        if (value.length === 0) {
            ele.style.border = '1px solid red'
        } else {
            ele.style.border = ''
        }
    }

    onLogin(e) {
        let { ck_username, ck_password, ck_remember } = this.refs

        ck_username = findDOMNode(ck_username)
        ck_password = findDOMNode(ck_password)
        ck_remember = findDOMNode(ck_remember)

        const username = ck_username.value
        const password = ck_password.value
        const remember = ck_remember.value

        const { login } = this.props

        if (username.length === 0) {
            ck_username.focus()
        } else if (password.length === 0) {
            ck_password.focus()
        } else {
            login(username, password, remember)
        }
    }

    render() {
        const { pending } = this.props

        return (
            <div className="ck_login">
                <div className="ck_login_logo"><img src="http://front.upesn.com/esn/images/account/logo2.png" alt=""/>
                </div>
                <div className="ck_login_form">
                    <div className="ck_login_form_item">
                        <label>用户名</label>
                        <Input ref="ck_username"
                               type="text"
                               placeholder="请输入手机/邮箱"
                               onBlur={ this.onBlur }
                        />
                    </div>
                    <div className="ck_login_form_item">
                        <label>密码</label>
                        <Input
                            ref="ck_password"
                            type="text"
                            placeholder="密码"
                            onBlur={ this.onBlur }
                        />
                    </div>
                    <div className="ck_login_form_item">
                        <div className="ck_login_form_item_r">
                            <label>
                                <Input
                                    ref="ck_remember"
                                    type="checkbox"/>自动登陆
                            </label>
                            <a href="http://upesn.com/account/lostpasswd/index">忘记密码</a>
                        </div>
                    </div>
                    <div className="ck_login_form_item">
                        <div className="ck_login_form_item_r">
                            <button
                                ref="ck_submit"
                                onClick={ this.onLogin }>
                                { pending ? '正在登陆' : '登 陆' }
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

Login.propTypes = {
    login: React.PropTypes.func.isRequired
}