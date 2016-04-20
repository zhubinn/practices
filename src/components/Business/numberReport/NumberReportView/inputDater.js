/**
 * Created by c on 16/3/11.
 * 报数
 * 日历输入
 */
import { findDOMNode } from 'react-dom'
import { DatePicker,message, notification  } from 'antd';
const MonthPicker = DatePicker.MonthPicker;
const RangePicker = DatePicker.RangePicker;

// mock data
import { data,data2 } from './data/response'

let COUNT = 0
let daterValue
const TEMP_DATA = $('#viewNumList').data()

$(function(){
    if(TEMP_DATA.nptype == 'week'){
        $('.ck-Calendar-date').width('256px')
        $('.ck-Calendar').width('316px')
    }
})

const openNotification = function () {
    const args = {
        message: '错误信息',
        description: '服务器错误，请联系客服',
        duration: 0
    };
    notification.open(args);
};



export default class InputDater extends React.Component {

    constructor(props) {
        super(props)

    }

    fillZero(v){
        return v < 10 ? '0'+v : v;
    }

    getInputDate(i,type){
        const { numberReportViewState ,actions } = this.props;
        const dater = numberReportViewState.toJS().dater

        const myDate = daterValue ? new Date(daterValue) : new Date()
        console.log('日期',myDate)
        switch (type){
            case 'day':
                myDate.setDate(myDate.getDate()+i);
                return myDate.getFullYear() +'-'+ this.fillZero(myDate.getMonth()+1) +'-'+ this.fillZero(myDate.getDate());
                break;
            case 'month':
                myDate.setMonth(myDate.getMonth()+i);
                return myDate.getFullYear() +'-'+ this.fillZero(myDate.getMonth()+1)+'-01';
                break;
            case 'week':

                this.daterValue = numberReportViewState.toJS().week;
                break;
        }


    }

    componentDidMount(){

    }

    handlePrevNextBtn(dir){

        const { actions } = this.props

        if(dir == 'left'){
            COUNT--;
        } else if(dir == 'right') {
            COUNT++;
        }
        const dater = this.getInputDate(COUNT,TEMP_DATA.nptype)
        actions.prevNextClick(dater)
        //TODO 异步請求
        $.post(SCRM.url('/scrmnumreport/index/listAjax'), {
            templateID:TEMP_DATA.templateid || 18,
            date:dater,
            dateType:TEMP_DATA.nptype
        },function(data){
            if(data.rs === true){
                actions.fetchData(true,data.data)
            }else{
                openNotification()
            }
        },'json');

    }

    handleChange(value){
        const { actions } = this.props
        const date = value ? new Date(value) : null



        switch (TEMP_DATA.nptype){
            case 'day':
                daterValue = date.getFullYear() + '-' + this.fillZero(date.getMonth()+1)+ '-' + this.fillZero(date.getDate())
                break;
            case 'month':
                daterValue = date.getFullYear() + '-' + this.fillZero(date.getMonth()+1)+'-01'
                break;
            case 'week':
                //TODO 待处理
                daterValue = date.getFullYear() + '-' + this.fillZero(date.getMonth()+1)
                break;
        }
        actions.prevNextClick(daterValue)
        //初始化为0
        COUNT = 0;
        //TODO 异步請求
        $.post(SCRM.url('/scrmnumreport/index/listAjax'), {
            templateID:TEMP_DATA.templateid || 18,
            date:daterValue,
            dateType:TEMP_DATA.nptype
        },function(data){
            if(data.rs === true){
                actions.fetchData(true,data.data)
            }else{
                openNotification()
            }
        },'json');

    }

    renderDatePicker(){
        const { numberReportViewState ,actions } = this.props;
        const date = new Date()
        const npType = $('#viewNumList').data().nptype
        //debugger;
        switch (npType){
            case 'day':
                const curDay = date.getFullYear() + '-' + (date.getMonth()+1) + '-' + date.getDate()
                return (
                    <DatePicker
                        style = {{"width":"160px"}}
                        value={ numberReportViewState.toJS().dater ? numberReportViewState.toJS().dater : curDay }
                        format="yyyy-MM-dd"
                        onChange = { this.handleChange.bind(this) }
                    />
                );
                break;
            case 'month':
                const curMonth = date.getFullYear() + '-' + (date.getMonth()+1)

                return (
                    <MonthPicker
                        style = {{"width":"160px"}}
                        value= { numberReportViewState.toJS().dater ? numberReportViewState.toJS().dater : curMonth }
                        onChange = {this.handleChange.bind(this)}
                    />
                );
                break;
            case 'week':
                return (
                    <RangePicker
                        style = {{"width":"250px"}}
                        value= { ["2015-12-09","2015-12-18"]}
                        onChange = { this.handleChange.bind(this) }
                    />
                );
                break;
        }
    }


    render() {

        const { numberReportViewState ,actions } = this.props;

        return (
                <div className="ck-Calendar clearfix">
                    <button className="ck-Calendar-pre" onClick = { this.handlePrevNextBtn.bind(this,'left') }>

                    </button>
                    <div className="ck-Calendar-date">
                        { this.renderDatePicker() }
                    </div>
                    <button className="ck-Calendar-next" onClick = { this.handlePrevNextBtn.bind(this,'right') }>

                    </button>
                </div>
        )


    }
}
