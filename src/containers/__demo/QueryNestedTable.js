/**
 * Created by c on 4/21/16.
 */
import { connect } from 'react-redux'
import { Breadcrumb } from 'antd'
import QueryNestedTable from 'components/QueryNestedTable'
import INPUTTYPE from 'components/QueryNestedTable/inputType'
import { updateDataSource, updateChildDataSource } from 'actions/__demo/queryNestedTable'
import 'antd/style/index.less'


class QueryNestedTablePage extends React.Component {
    constructor() {
        super()

    }

    render() {


        return (
            <div>

            </div>
        )
    }
}

const mapStateToProps = (state, ownProps) => {
    return {
        $$QueryNestedTable: state.components.QueryNestedTable
    }
}

export default connect(mapStateToProps, {
    updateDataSource,
    updateChildDataSource,
})(QueryNestedTablePage)