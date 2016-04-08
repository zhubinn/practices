import React, { Component, PropTypes } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import CustomEditField from 'components/__demo/CustomEditField'

import * as FieldActions from 'actions/__demo/customEditField'


class CustomEditFieldPage extends Component {


    render() {
        const { fields, actions } = this.props
        console.log(this.props)
        return (
            <div>
                <CustomEditField fields={fields} addTodo={actions.addField} actions={actions} />
            </div>
        )
    }
}





//CustomEditFieldPage.propTypes = {
//    fields: PropTypes.array.isRequired,
//    actions: PropTypes.object.isRequired
//}

function mapStateToProps(state) {
    return {
        fields: state.fields
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