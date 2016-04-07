/**
 * Created by janeluck on 4/7/16.
 */
import { findDOMNode } from 'react-dom'
import { isPlainObject, isFunction, isString, isArray } from 'lodash'
export default class BaseTable extends React.Component {
    constructor(props) {
        super(props)


    }

    showDetailClicked(i){

        if (!this.props.hasDetail) return


        console.log(1231313)
        this.props.onShowDetail(i)
    }

    // 解析需要展示的列, 并从row中取出字段对应内容(文本或者虚拟dom)
    resolveRow(row, columns) {

        return columns.map((col, i) => col['datafield'])
            .map((keyName, i) => ({
                    keyName: keyName,
                    // 判断该列是否为自定义渲染
                    text: isFunction(columns[i]['cellsrenderer']) ? columns[i]['cellsrenderer'].call(this, row, columns[i], row[keyName]) : row[keyName]
                })
            )

    }

    resolveColumnsTitle(columns) {
        //todo: 判断字段hidden是否存在和其的值
        /* 返回表头文本数组
         ['姓名', '年龄']
         */
        return columns.map((col, i) => col['text'])
    }


    render() {

        const {rows, columns } = this.props


        return (



            <table>
                <tbody>

                {
                    rows.map((row, i) => {
                        return (<tr onClick = {this.showDetailClicked.bind(this, i)}  key={i}>{this.resolveRow(row, columns).map(function (item, i) {
                            return (<td key={i}>{item.text}</td>)
                        })} </tr>)
                    })

                }


                </tbody>
            </table>

        )
    }
}

BaseTable.propTypes = {
    hasDetail: React.PropTypes.bool
}

BaseTable.defaultProps = {
    hasDetail: false
}