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
<<<<<<< HEAD
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
                        <Link to="/__demo/dataTable">
                            dataTable
                        </Link>
                    </li>

>>>>>>> origin/develop_jane_v2.2.3
                </ul>
                {this.props.children}
            </div>
        )
    }
}

export default connect()(IndexPage)