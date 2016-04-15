/**
 * Created by c on 16/3/11.
 */
import { findDOMNode } from 'react-dom'

import 'ucjs_modules/jquery-daterangepicker/1.0.0/jquery-daterangepicker.css'
import 'ucjs_modules/jquery-daterangepicker/1.0.0/jquery-daterangepicker.js'

/*import '../../../../ucjs_modules/bootstrap-datetimepicker/css/bootstrap-datetimepicker.css'
import '../../../../ucjs_modules/bootstrap-datetimepicker/js/bootstrap-datetimepicker'*/

/*import  '../../../../ucjs_modules/ReactUI/themes'
import Datetime from '../../../../ucjs_modules/ReactUI/Datetime'*/

export default class DaterButton extends React.Component {

    constructor(props) {
        super(props)

    }

    componentDidMount(){
        const { numberReportViewState ,actions } = this.props;
        console.log(numberReportViewState.toJS().npType)
        let npType = 'month'

        if(npType == 'day'){
            dateRangePicker('#daterButton')
                .dateRangePicker({
                    __uncustom__: false,//这个参数为了支持显示12个月份
                    separator:'-',
                    singleMonth: true,
                    showShortcuts: false,
                    showTopbar: true
                })

        }else if(npType == 'month'){
            dateRangePicker('#daterButton')
                .dateRangePicker({
                    __uncustom__: true,//这个参数为了支持显示12个月份
                    separator:'-',
                    singleMonth: true,
                    showShortcuts: false,
                    showTopbar: true
                })
            $('.date-picker-wrapper').find('.month-wrapper').width('160px').html(this.renderMonth())

            const $selfMonthWrap = $('.selfMonthWrap')
            let year = $selfMonthWrap.find('span.year').text()*1

            $selfMonthWrap.on('click','.prev',function(){
                year--;
                $selfMonthWrap.find('span.year').text(year)
            }).on('click','.next',function(){
                year++;
                $selfMonthWrap.find('span.year').text(year)
            }).on('click','li',function(){
                $(this).addClass('active').siblings().removeClass('active')
            })

            $('.apply-btn').click(function(){
                //TODO 返回选中的月份
                console.log(year+$selfMonthWrap.find('li.active').text())
            })

        }else if(npType == 'week'){
            dateRangePicker('#daterButton')
                .dateRangePicker({
                    __uncustom__: false,//这个参数为了支持显示12个月份
                    separator:'-',
                    singleMonth: true,
                    showShortcuts: false,
                    showTopbar: true,
                    batchMode: 'week'
                })
        }
        /*dateRangePicker('#daterButton')
            .dateRangePicker({
                __uncustom__: true,//这个参数为了支持显示12个月份
                separator:'-',
                singleMonth: true,
                showShortcuts: false,
                showTopbar: true,
                batchMode: ntType
            })
            .bind('datepicker-first-date-selected', function(event, obj) {
                /!* This event will be triggered when first date is selected *!/
                console.log('first-date-selected', obj);
                // obj will be something like this:
                // {
                // 		date1: (Date object of the earlier date)
                // }
            })
            .bind('datepicker-change', function(event, obj) {
                /!* This event will be triggered when second date is selected *!/
                console.log('change', obj);
                // obj will be something like this:
                // {
                // 		date1: (Date object of the earlier date),
                // 		date2: (Date object of the later date),
                //	 	value: "2013-06-05 to 2013-06-07"
                // }
            })
            .bind('datepicker-apply', function(event, obj) {
                /!* This event will be triggered when user clicks on the apply button *!/
                console.log('apply', obj);
            })
            .bind('datepicker-close', function() {
                /!* This event will be triggered before date range picker close animation *!/
                console.log('before close');
            })
            .bind('datepicker-closed', function() {
                /!* This event will be triggered after date range picker close animation *!/
                console.log('after close');
            })
            .bind('datepicker-open', function() {
                /!* This event will be triggered before date range picker open animation *!/
                console.log('before open');
            })
            .bind('datepicker-opened', function() {
                /!* This event will be triggered after date range picker open animation *!/
                console.log('after open');
            });*/




    }

    renderMonth(yy){
        const year = yy || new Date().getFullYear()
        let temp = '<div class="selfMonthWrap">' +
            '<div class="monthHeader"><span class="prev"><</span><span class="year">'+ year +'</span><span class="next">></span></div' +
            '><ul class="clearfix">'

        for(let i =0 ;i<12;i++){
            temp +='<li>'+ (i+1) +'</li>';
        }

        temp +='</ul></div>'

        return temp
    }

    render() {
        const { numberReportViewState ,actions } = this.props;


        return (
            <button className="ck-Function-datecontrol" id="daterButton">日期控件</button>
        )


    }
}
