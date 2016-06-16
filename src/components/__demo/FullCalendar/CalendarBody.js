/**
 * Created by yangtm
 */
import { bindActionCreators }from 'redux'
import { connect } from 'react-redux'
import classNames from 'classnames/dedupe'


class CalendarBody extends React.Component {
  constructor() {
    super();
  }
  render() {
      return ( 
      <div className = "CalendarBody"> 
        <div className = "weekday" >
          <span>周日</span>
          <span>周一</span>
          <span>周二</span>
          <span>周三</span>
          <span>周四</span>
          <span>周五</span>
          <span>周六</span>
        </div>
        <div className = "fc-day-content" >
          
        </div>
      </div>
      )
  }
}

export default CalendarBody