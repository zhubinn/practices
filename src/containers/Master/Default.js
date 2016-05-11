/**
 * Created by c on 16/3/21.
 */
import { connect } from 'react-redux'
import { Link } from 'react-router'

class IndexPage extends React.Component {
    render() {
        return (
            <div>

                /*leesx React-Redux demo*/
                <div>
                    <ul>
                        <li>
                            <Link to="/__demo/hello">
                                添加删除过滤字段Hello
                            </Link>
                        </li>
                        <li>
                            <Link to="/__demo/CustomEditFieldPage">
                                客户自定义字段CustomEditFieldPage
                            </Link>
                        </li>
                        <li>
                            <Link to="/numberReport/NumberReportViewPage">
                                报数---查看报数
                            </Link>
                        </li>
                    </ul>
                </div>

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
                        <Link to="/__demo/nested_table">
                            查询嵌套表格
                        </Link>
                    </li>                    
                    <li>
                        <Link to="/__demo/selectPeople">
                            选人组件
                        </Link>
                    </li>
                </ul>
                {this.props.children}
            </div>
        )
    }
}

export default connect()(IndexPage)