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
                        <Link to="/__demo/todos">
                            todos
                        </Link>
                    </li>
                    <li>
                        <Link to="/dataTable">
                            dataTable
                        </Link>
                    </li>
                    <li>
                        <Link to="/contact">
                            contact
                        </Link>
                    </li>
                </ul>
                {this.props.children}
            </div>
        )
    }
}

export default connect()(IndexPage)