/**
 * Created by c on 16/3/21.
 */
import { connect } from 'react-redux'
import { Link } from 'react-router'

class IndexPage extends React.Component {
    render() {
        return (
            <div>
<<<<<<< HEAD
                <Link to="/__demo/login">
                    login
                </Link>
                <br/>
                <Link to="/__demo/table">
                    table
                </Link>
                <br/>
                <Link to="/userlist">
                    userlist
                </Link>
=======
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
                </ul>
>>>>>>> 608c29fec5583a5b7a152b779d628e5d6c208b77
                {this.props.children}
            </div>
        )
    }
}

export default connect()(IndexPage)