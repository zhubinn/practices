import React, { Component, PropTypes } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import NumberReportView from './NumberReportView'

import * as NumberReportViewActions from 'actions/business/numberReport/ListView'


class NumberReportViewPage extends Component {


    render() {
        const { numberReportViewState, actions } = this.props
        return (
            <div>
                <NumberReportView numberReportViewState={ numberReportViewState }  actions={actions} />
            </div>
        )
    }
}





NumberReportViewPage.propTypes = {
    numberReportViewState: PropTypes.object.isRequired,
    actions: PropTypes.object.isRequired
}

function mapStateToProps(state) {
    return {
        numberReportViewState: state.business.numberReportViewState //所有的业务页面state，都在state.business下
    }
}



function mapDispatchToProps(dispatch) {

    return {
        actions: bindActionCreators(NumberReportViewActions, dispatch)
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(NumberReportViewPage)