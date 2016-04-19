/*
* 线索
* 分派线索
* */

import React, { Component, PropTypes } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import DispatchClues from 'components/Business/clues/DispatchClues'

import * as DispatchCluesActions from 'actions/clues/DispatchCluesActions'


class DispatchCluesPage extends Component {


    render() {

        return (
            <div>
               分派
            </div>
        )
    }
}





DispatchCluesPage.propTypes = {
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
)(DispatchCluesPage)