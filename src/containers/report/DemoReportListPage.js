/**
 * Created by chenhf on 16-3-11.
 */
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import ReportList from 'components/report/ReportList'
import { update } from 'actions/report/index'

class DemoReportListPage extends React.Component {
    constructor(){
        super()

        this.onClickFn = this.onClickFn.bind(this)
    }
    onClickFn (){
        const { update } = this.props

        update(9)
    }
    render () {
        const { onClickFn } = this
        const { reportOther } =this.props

        const pending = reportOther.get ('pending')
debugger
        return (
            <div>
            {
                reportOther && <div>{pending}</div>
            }
                <ReportList update={onClickFn}/>
            </div>
            )
    }
}


const mapStateToProps = (state, ownProps) => {
    return {
        reportOther: state.reportOther
    }
}


export default connect(mapStateToProps, {
    update
})(DemoReportListPage)
