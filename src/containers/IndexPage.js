/**
 * Created by c on 16/3/21.
 */
import { connect } from 'react-redux'
import { Link } from 'react-router'

class IndexPage extends React.Component {
    render() {
        return (
            <div>
                <Link to="/__demo/login">
                    login
                </Link>
                <br/>
                <Link to="/__demo/table">
                    table
                </Link>
                <br/>
                <Link to="/__demo/hello">
                    添加删除过滤字段Hello
                </Link><br/>
                <Link to="/__demo/CustomEditFieldPage">
                    客户自定义字段CustomEditFieldPage
                </Link><br/>
                <Link to="/__demo/pagination">
                    pagination
                </Link>
                {this.props.children}
            </div>
        )
    }
}

export default connect()(IndexPage)