/*
* 线索
* 分派线索
* */

import React, { Component, PropTypes } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import DispatchClues from './DispatchClues'

import * as DispatchCluesActions from 'actions/business/DispatchClues/DispatchCluesActions'


class DispatchCluesPage extends Component {


    render() {
        const { dispatchCluesState, actions } = this.props
        return (
            <div>
                <DispatchClues dispatchCluesState={ dispatchCluesState }  actions={actions} />
            </div>
        )
    }
}





DispatchCluesPage.propTypes = {
    dispatchCluesState: PropTypes.object.isRequired,
    actions: PropTypes.object.isRequired
}

function mapStateToProps(state) {
    return {
        dispatchCluesState: state.business.dispatchCluesState //所有的业务页面state，都在state.business下
    }
}



function mapDispatchToProps(dispatch) {

    return {
        actions: bindActionCreators(DispatchCluesActions, dispatch)
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(DispatchCluesPage)