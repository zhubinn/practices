/**
 * Created by c on 16/3/21.
 */
import { connect } from 'react-redux'
import 'ucjs_modules/jquery-deptotree/1.0.0/jquery-deptotree.css'
import 'ucjs_modules/jquery-deptotree/1.0.0/jquery-deptotree.js'

class DepToTreePage extends React.Component {
    componentDidMount() {
    }
    handleclickDept(){
        deptotree('#date-range0')
        .DeptoTree({type:2})
    }
    handleclickPeople(){
        deptotree('#date-range0')
        .DeptoTree({type:1})
    }
    render() {
        return (
            <div>
                <input id="date-range0" size="40" value="" onClick={this.handleclickDept.bind(this)}/>选择部门
                <input id="date-range0" size="40" value="" onClick={this.handleclickPeople.bind(this)}/>选择人员

            </div>
        )
    }
}

export default connect()(DepToTreePage)