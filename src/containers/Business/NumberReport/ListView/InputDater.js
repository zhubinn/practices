/**
 * Created by c on 16/3/11.
 * 报数
 * 日历输入
 */
import { findDOMNode } from 'react-dom'
import reqwest from 'reqwest'
import { DatePicker,message, notification  } from 'antd';
import ChaocerWeekCalendar from 'chaocer-weekCalendar';
const MonthPicker = DatePicker.MonthPicker;
// const RangePicker = DatePicker.RangePicker;


let COUNT = 0
let daterValue
let WEEK_END_DATER
let WEEK_DATER
const TEMP_DATA = {
        nptype:document.querySelector('npType') ? document.querySelector('npType').value : null,
        templateid:document.querySelector('templateId') ? document.querySelector('templateId').value : null,
    }



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

    fillZero(v) {
        return v < 10 ? '0' + v : v;
    }

    getInputDate(i, type) {
        const { $$numberReportViewState ,actions } = this.props;
        const dater = $$numberReportViewState.toJS().dater

        const myDate = daterValue ? new Date(daterValue) : new Date()

        switch (type) {
            case 'day':
                myDate.setDate(myDate.getDate() + i);
                return myDate.getFullYear() + '-' + this.fillZero(myDate.getMonth() + 1) + '-' + this.fillZero(myDate.getDate());
                break;
            case 'month':
                myDate.setMonth(myDate.getMonth() + i);
                return myDate.getFullYear() + '-' + this.fillZero(myDate.getMonth() + 1) + '-01';
                break;

        }


    }

    componentDidMount() {

        /*if (TEMP_DATA.nptype == 'week') {
            document.querySelector('.ck-Calendar-date').style.width = '256px';
            document.querySelector('.ck-Calendar').style.width = '316px';
        }*/
    }

    handlePrevNextBtn(dir) {

        const { actions } = this.props
        //当类型是月或者天的时候，dater类型是 { String } 当是周的时候，dater类型是 { Object }
        let dater

        if (TEMP_DATA.nptype === 'day' || TEMP_DATA.nptype === 'month') {
            if (dir == 'left') {
                COUNT--;
            } else if (dir == 'right') {
                COUNT++;

            }

            dater = this.getInputDate(COUNT, TEMP_DATA.nptype)
            actions.prevNextClick(dater)

        } else if (TEMP_DATA.nptype === 'week') {
            if (dir == 'left') {
                dater = this.prevWeekDater().join('~')
            } else if (dir == 'right') {

                dater = this.nextWeekDater().join('~')
            }

            actions.prevNextClick(dater)
        }


        //TODO 异步請求
        //console.log(TEMP_DATA.nptype === 'week',dater)
        /*this.fetchData({
            templateID: TEMP_DATA.templateid,
            date: TEMP_DATA.nptype === 'week' ? dater.split('~')[0] : dater,
            dateType: TEMP_DATA.nptype
        })*/

        actions.getTableData({
            url: SCRM.url('/scrmweb/numreport/listAjaxOfAdmin'),
            data:{
                templateID: TEMP_DATA.templateid,
                date: TEMP_DATA.nptype === 'week' ? dater.split('~')[0] : dater,
                dateType: TEMP_DATA.nptype
            }

        })



    }

    fetchData(param = {}){
        const { actions } = this.props

        reqwest({
            url:SCRM.url('/scrmweb/numreport/listAjaxOfAdmin'),
            method:'post',
            data:param,
            type:'json',
            error: function (result) {
                message.error('服务器错误,请联系客服！')
            },
            success:(result) => {
                if (result.rs === true) {
                    actions.fetchData(true, result.data)
                } else {
                    message.error(result.error)
                }
            }
        })
    }

    handleChange(value) {
        const { actions } = this.props

        if(TEMP_DATA.nptype === 'week' && value instanceof Array){
            value = value[0]
        }

        const date = value ? new Date(value) : null


        switch (TEMP_DATA.nptype) {
            case 'day':
                daterValue = date.getFullYear() + '-' + this.fillZero(date.getMonth() + 1) + '-' + this.fillZero(date.getDate())
                break;
            case 'month':
                daterValue = date.getFullYear() + '-' + this.fillZero(date.getMonth() + 1) + '-01'
                break;
            case 'week':
                //TODO 待处理

                daterValue = this.weekDater(value)[0] + '~' + this.weekDater(value)[1]
                break;
        }


        actions.prevNextClick(daterValue)
        //初始化COUNT为0
        COUNT = 0;
        //TODO 异步請求

        /*this.fetchData({
            templateID: TEMP_DATA.templateid,//TODO 18为测试数据
            date: TEMP_DATA.nptype === 'week'? daterValue.split('~')[0] : daterValue,
            dateType: TEMP_DATA.nptype
        })*/

        actions.getTableData({
            url: SCRM.url('/scrmweb/numreport/listAjaxOfAdmin'),
            data:{
                templateID: TEMP_DATA.templateid,//TODO 18为测试数据
                date: TEMP_DATA.nptype === 'week'? daterValue.split('~')[0] : daterValue,
                dateType: TEMP_DATA.nptype
            }

        })

    }

    weekDater(value) {
        /*周日历*/
        let startDate = value ? new Date(value) : new Date()
        const curWeek1 = startDate.getDay()

        startDate.setDate(startDate.getDate() - curWeek1 + 1);
        const start = startDate.getFullYear() + '-' + this.fillZero(startDate.getMonth() + 1) + '-' + this.fillZero(startDate.getDate());

        let endDate = value ? new Date(value) : new Date()
        const curWeek2 = endDate.getDay()
        endDate.setDate(endDate.getDate() + (7 - curWeek2));
        const end = endDate.getFullYear() + '-' + this.fillZero(endDate.getMonth() + 1) + '-' + this.fillZero(endDate.getDate());



        WEEK_END_DATER = end;
        WEEK_DATER = new Date(WEEK_END_DATER)

        return [start, end]
    }

    prevWeekDater() {

        WEEK_DATER.setDate(WEEK_DATER.getDate() - 13);
        const start = WEEK_DATER.getFullYear() + '-' + this.fillZero(WEEK_DATER.getMonth() + 1) + '-' + this.fillZero(WEEK_DATER.getDate());

        WEEK_DATER.setDate(WEEK_DATER.getDate() + 6);
        const end = WEEK_DATER.getFullYear() + '-' + this.fillZero(WEEK_DATER.getMonth() + 1) + '-' + this.fillZero(WEEK_DATER.getDate());

        return [start, end];
    }

    nextWeekDater() {

        const curWeek1 = WEEK_DATER.getDay()

        WEEK_DATER.setDate(WEEK_DATER.getDate() - curWeek1 + 1);
        const start = WEEK_DATER.getFullYear() + '-' + this.fillZero(WEEK_DATER.getMonth() + 1) + '-' + this.fillZero(WEEK_DATER.getDate());


        const curWeek2 = WEEK_DATER.getDay()
        WEEK_DATER.setDate(WEEK_DATER.getDate() + (7 - curWeek2));
        const end = WEEK_DATER.getFullYear() + '-' + this.fillZero(WEEK_DATER.getMonth() + 1) + '-' + this.fillZero(WEEK_DATER.getDate());

        //console.log('1:',[start,end]);
        return [start, end];
    }

    renderDatePicker() {
        const { $$numberReportViewState ,actions } = this.props;
        const date = new Date()
        const npType = document.querySelector('npType').value
        //debugger;
        switch (npType) {
            case 'day':
                const curDay = date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate()
                return (
                    <DatePicker
                        style={{width:160}}
                        value={ $$numberReportViewState.toJS().dater ? $$numberReportViewState.toJS().dater : curDay }
                        format="yyyy-MM-dd"
                        onChange={ this.handleChange.bind(this) }
                    />
                );
                break;
            case 'month':
                const curMonth = date.getFullYear() + '-' + (date.getMonth() + 1)

                return (
                    <MonthPicker
                        style={{width:160}}
                        value={ $$numberReportViewState.toJS().dater ? $$numberReportViewState.toJS().dater : curMonth }
                        onChange={this.handleChange.bind(this)}
                    />
                );
                break;
            case 'week':

                return (

                    <ChaocerWeekCalendar
                        ref="rangePicker"
                        style={{width:250}}
                        value={ $$numberReportViewState.toJS().dater ? $$numberReportViewState.toJS().dater.split('~') : [this.weekDater()[0],this.weekDater()[1]]}
                        onChange={ this.handleChange.bind(this) }
                    />
                );
                break;
        }
    }


    render() {

        const { $$numberReportViewState ,actions } = this.props;

        return (
            <div className="ck-Calendar clearfix" style = { TEMP_DATA.nptype === 'week' ? {width:316} : null } >
                <button className="ck-Calendar-pre" onClick={ this.handlePrevNextBtn.bind(this,'left') }>

                </button>
                <div className="ck-Calendar-date" style = { TEMP_DATA.nptype === 'week' ? {width:256} : null }>
                    { this.renderDatePicker() }
                </div>
                <button className="ck-Calendar-next" onClick={ this.handlePrevNextBtn.bind(this,'right') }>

                </button>
            </div>
        )




    }
}

//初始化 Dater
new InputDater().weekDater()
