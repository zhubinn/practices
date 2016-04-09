import React, { Component, PropTypes } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import CustomEditField from 'components/__demo/CustomEditField'

import * as FieldActions from 'actions/__demo/customEditField'


class CustomEditFieldPage extends Component {


    render() {
        const { customEditField, actions } = this.props
        console.log(this.props)
        return (
            <div>
                <CustomEditField customEditField={ customEditField }  actions={actions} />
            </div>
        )
    }
}





CustomEditFieldPage.propTypes = {
    customEditField: PropTypes.array.isRequired,
    actions: PropTypes.object.isRequired
}

function mapStateToProps(state) {
    return {
        customEditField: state.customEditField
    }
}



function mapDispatchToProps(dispatch) {

    return {
        actions: bindActionCreators(FieldActions, dispatch)
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(CustomEditFieldPage)