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

let COUNT = 0

export default class InputDater extends React.Component {

    constructor(props) {
        super(props)



    }

    getInputDate(i,type){
        const { numberReportViewState ,actions } = this.props;
        const myDate = new Date()
        switch (numberReportViewState.toJS().npType){
            case 'day':
                myDate.setDate(myDate.getDate()+i);
                return myDate.getFullYear() +'-'+ (myDate.getMonth()+1) +'-'+ myDate.getDate();
                break;
            case 'month':
                myDate.setMonth(myDate.getMonth()+i);
                return myDate.getFullYear() +'-'+ (myDate.getMonth()+1);
                break;
            case 'week':
                this.daterValue = numberReportViewState.toJS().week;
                break;
        }


    }

    componentDidMount(){

    }

    handlePrevNextBtn(dir){
        const $inputDater = findDOMNode(this.refs.inputDater)
        const inputValue = $inputDater.value.trim()
        const { actions } = this.props

        if(dir == 'left'){
            //TODO 异步請求
            COUNT--;
            console.log(this.getInputDate(COUNT,'day'))
            actions.prevClick(this.getInputDate(COUNT,'day'), data)
        } else if(dir == 'right') {
            COUNT++;
            $inputDater.value = this.getInputDate(COUNT,'day')
            //TODO 异步請求
            actions.nextClick(this.getInputDate(COUNT,'day'),data2)
        }

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
                    <button className="ck-Calendar-pre" onClick = { this.handlePrevNextBtn.bind(this,'left') }>

                    </button>
                    <div className="ck-Calendar-date">
                        <input autoComplete="off" style = {{"textAlign":"center"}} id="inputDater" ref = "inputDater" type="text" readOnly="readonly" value={ daterValue }  className="ck-Calendar-stime"/>
                    </div>
                    <button className="ck-Calendar-next" onClick = { this.handlePrevNextBtn.bind(this,'right') }>

                    </button>
                </div>
        )


    }
}
