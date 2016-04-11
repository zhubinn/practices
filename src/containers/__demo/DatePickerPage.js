/**
 * Created by c on 16/3/21.
 */
import { connect } from 'react-redux'
import 'ucjs_modules/jquery-daterangepicker/1.0.0/jquery-daterangepicker.css'
import 'ucjs_modules/jquery-daterangepicker/1.0.0/jquery-daterangepicker.js'

//docs
//https://github.com/longbill/jquery-date-range-picker
class DatePickerPage extends React.Component {
    componentDidMount() {
        dateRangePicker('#date-range0')
            .dateRangePicker({})
            .bind('datepicker-first-date-selected', function(event, obj) {
                /* This event will be triggered when first date is selected */
                console.log('first-date-selected', obj);
                // obj will be something like this:
                // {
                // 		date1: (Date object of the earlier date)
                // }
            })
            .bind('datepicker-change', function(event, obj) {
                /* This event will be triggered when second date is selected */
                console.log('change', obj);
                // obj will be something like this:
                // {
                // 		date1: (Date object of the earlier date),
                // 		date2: (Date object of the later date),
                //	 	value: "2013-06-05 to 2013-06-07"
                // }
            })
            .bind('datepicker-apply', function(event, obj) {
                /* This event will be triggered when user clicks on the apply button */
                console.log('apply', obj);
            })
            .bind('datepicker-close', function() {
                /* This event will be triggered before date range picker close animation */
                console.log('before close');
            })
            .bind('datepicker-closed', function() {
                /* This event will be triggered after date range picker close animation */
                console.log('after close');
            })
            .bind('datepicker-open', function() {
                /* This event will be triggered before date range picker open animation */
                console.log('before open');
            })
            .bind('datepicker-opened', function() {
                /* This event will be triggered after date range picker open animation */
                console.log('after open');
            });
    }

    render() {
        return (
            <div>
                <input id="date-range0" size="40" value=""/>
            </div>
        )
    }
}

export default connect()(DatePickerPage)