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
                        <Link to="/__demo/Demopagination">
                            Demopagination
                        </Link>
                    </li>
                    <li>
                        <Link to="/__demo/DemoTodoList">
                            DemoTodoList
                        </Link>
                    </li>
                </ul>
                {this.props.children}
            </div>
        )
    }
}

export default connect()(IndexPage)