/**
 * Created by c on 16/3/11.
 * 报数
 * 日历输入
 */
import { findDOMNode } from 'react-dom'

import 'ucjs_modules/jquery-daterangepicker/1.0.0/jquery-daterangepicker.css'
import 'ucjs_modules/jquery-daterangepicker/1.0.0/jquery-daterangepicker.js'

export default class InputDater extends React.Component {

    constructor(props) {
        super(props)



    }

    getValue(){
        const { numberReportViewState ,actions } = this.props;

        switch (numberReportViewState.npType){
            case 'day':
                this.daterValue = numberReportViewState.day;
                break;
            case 'month':
                this.daterValue = numberReportViewState.month;
                break;
            case 'week':
                this.daterValue = numberReportViewState.week;
                break;
        }

        return this.daterValue;
    }

    componentWillMount(){
        const { actions } = this.props
    }

    handlePrevBtn(){
        const inputValue = findDOMNode(this.refs.inputDater).value.trim()
        const { actions } = this.props

        actions.prevClick(inputValue)
        console.log(actions)
    }

    handleNextBtn(){
        const inputValue = findDOMNode(this.refs.inputDater).value.trim()
        const { actions } = this.props
        actions.nextClick(inputValue)
    }

    render() {



        return (
                <div className="ck-Calendar clearfix">
                    <button className="ck-Calendar-pre" onClick = { this.handlePrevBtn.bind(this) }>

                    </button>
                    <div className="ck-Calendar-date">
                        <input style = {{"textAlign":"center"}} id="inputDater" ref = "inputDater" type="text" defaultValue={ this.getValue() }  className="ck-Calendar-stime"/>
                    </div>
                    <button className="ck-Calendar-next" onClick = { this.handleNextBtn.bind(this) }>

                    </button>
                </div>
        )


    }
}
