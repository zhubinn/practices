/**
 * Created by c on 16/3/11.
 * 报数
 * 日历输入
 */
import { findDOMNode } from 'react-dom'

import 'ucjs_modules/jquery-daterangepicker/1.0.0/jquery-daterangepicker.css'
import 'ucjs_modules/jquery-daterangepicker/1.0.0/jquery-daterangepicker.js'
// mock data
import { data,data2 } from './data/response'

export default class InputDater extends React.Component {

    constructor(props) {
        super(props)



    }

    getValue(){

    }

    componentDidMount(){
        const { numberReportViewState ,actions } = this.props;
        console.log('++++++++++++',numberReportViewState);
    }

    handlePrevBtn(){
        const inputValue = findDOMNode(this.refs.inputDater).value.trim()
        const { actions } = this.props
        //TODO 异步請求

        actions.prevClick(inputValue, data)

    }

    handleNextBtn(){
        const inputValue = findDOMNode(this.refs.inputDater).value.trim()
        const { actions } = this.props

        //TODO 异步請求
        actions.nextClick(inputValue,data2)
    }

    render() {

        const { numberReportViewState ,actions } = this.props;

        const daterValue =(() =>{
            switch (numberReportViewState.toJS().npType){
                case 'day':
                    this.daterValue = numberReportViewState.toJS().day;
                    break;
                case 'month':
                    this.daterValue = numberReportViewState.toJS().month;
                    break;
                case 'week':
                    this.daterValue = numberReportViewState.toJS().week;
                    break;
            }

            return this.daterValue;
        })()

        console.log('----',numberReportViewState.toJS().day)
        return (
                <div className="ck-Calendar clearfix">
                    <button className="ck-Calendar-pre" onClick = { this.handlePrevBtn.bind(this) }>

                    </button>
                    <div className="ck-Calendar-date">
                        <input autoComplete="off" style = {{"textAlign":"center"}} id="inputDater" ref = "inputDater" type="text" readOnly="readonly" value={ daterValue }  className="ck-Calendar-stime"/>
                    </div>
                    <button className="ck-Calendar-next" onClick = { this.handleNextBtn.bind(this) }>

                    </button>
                </div>
        )


    }
}
