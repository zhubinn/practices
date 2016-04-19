/**
 * Created by c on 16/3/21.
 */
import { connect } from 'react-redux'
import { Link } from 'react-router'

class IndexPage extends React.Component {
    render() {
        return (
            <div>
                <ul>
                    <li>
                        <Link to="/__demo/login">
                            login
                        </Link>
                    </li>
                    <li>
                        <Link to="/__demo/table">
                            table
                        </Link>
                    </li>
<<<<<<< HEAD
                    <li>
                        <Link to="/__demo/datepicker">
                            datepicker
                        </Link>
                    </li>
                    <li>
                        <Link to="/__demo/daterange">
                            daterange
                        </Link>
                    </li>
                    <li>
                        <Link to="/__demo/deptotree">
                            deptotree
                        </Link>
                    </li>
                    <li>
                        <Link to="/__demo/autocomplete">
                            autocomplete
                        </Link>
                    </li>
                    <li>
                        <Link to="/__demo/modal">
                            modal
                        </Link>
                    </li>
                    <li>
                        <Link to="/__demo/Demopagination">
                            Demopagination
                        </Link>
                    </li>
                    <li>
                        <Link to="/__demo/DemoTodoList">
                            DemoTodoList
                        </Link>
                    </li>
=======
>>>>>>> 3971a29cdfdeb7c45151e72ebf6742dcbcd00f0f
                </ul>
                {this.props.children}
            </div>
        )
    }
}

export default connect()(IndexPage)