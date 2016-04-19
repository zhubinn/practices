/*
 * 线索
 * 管理线索
 * */

import React, { Component, PropTypes } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'


import * as NumberReportViewActions from 'actions/numberReport/NumberReportViewActions'


class ManageCluesPage extends Component {


    render() {

        return (
            <div>
                管理
            </div>
        )
    }
}





ManageCluesPage.propTypes = {
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
)(ManageCluesPage)