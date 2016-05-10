/**
 * Created by c on 16/3/11.
 */
import { findDOMNode } from 'react-dom'
import { DatePicker } from 'antd';
const MonthPicker = DatePicker.MonthPicker;



export default class DaterButton extends React.Component {

    constructor(props) {
        super(props)

    }

    componentDidMount(){
        const { numberReportViewState ,actions } = this.props;
        console.log(numberReportViewState.toJS().npType)
        let npType = 'month'

        /*if(npType == 'day'){
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
        }*/


    }

    /*renderMonth(yy){
        const year = yy || new Date().getFullYear()
        let temp = '<div class="selfMonthWrap">' +
            '<div class="monthHeader"><span class="prev"><</span><span class="year">'+ year +'</span><span class="next">></span></div' +
            '><ul class="clearfix">'

        for(let i =0 ;i<12;i++){
            temp +='<li>'+ (i+1) +'</li>';
        }

        temp +='</ul></div>'

        return temp
    }*/

    render() {
        const { numberReportViewState ,actions } = this.props;


        return (
            <button className="ck-Function-datecontrol" id="daterButton">日期控件</button>

        )


    }
}
