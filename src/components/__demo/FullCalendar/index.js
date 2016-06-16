/**
 * Created by yangtm
 */
import { bindActionCreators }from 'redux'
import { connect } from 'react-redux'
import classNames from 'classnames/dedupe'

import CalendarHeader from './CalendarHeader'
import CalendarBody from './CalendarBody'
import './FullCalendar.less'


class FullCalender extends React.Component {
  constructor() {
    super();
  }
  render() {
      return ( 
      <div className="FullCalender"> 
        <CalendarHeader />
        <CalendarBody />
      </div>
      )
  }
}

export default FullCalender