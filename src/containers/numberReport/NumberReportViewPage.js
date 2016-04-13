import React, { Component, PropTypes } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import NumberReportView from 'components/numberReport/NumberReportView'

import * as NumberReportViewActions from 'actions/numberReport/NumberReportViewActions'


class NumberReportViewPage extends Component {


    render() {
        const { numberReportViewState, actions } = this.props
        console.log(this.props)
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
        numberReportViewState: state.numberReportViewState
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