/**
 * Created by yangtm
 */
import { bindActionCreators }from 'redux'
import { connect } from 'react-redux'
import classNames from 'classnames/dedupe'


class CalendarHeader extends React.Component {
  constructor() {
    super();
  }
  render() {
      return ( 
      <div className = "CalendarHeader" > 
        <div className = "fc-left" >
          <div className = "fc-button-group" >
            <button type = "button" >《</button>
            <button type = "button" >》</button>
          </div>
          <button type = "button" className = "fc-today-button">今天</button>
        </div>
        <div className = "fc-center" >
          <h3>2016年10月 </h3>
        </div>
        <div className = "fc-right" >
          <div className="fc-button-group">
            <button type="button" className="fc-month-button">month</button>
            <button type="button" className="fc-Week-button">week</button>
            <button type="button" className="fc-Day-button">day</button>
          </div>
        </div>
        <div className = "fc-clear" ></div>
      </div>
      )
  }
}

export default CalendarHeader