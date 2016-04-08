/**
 * Created by janeluck on 4/7/16.
 */
import { findDOMNode } from 'react-dom'
import { isPlainObject, isFunction, isString, isArray } from 'lodash'
export default class BaseTr extends React.Component {
    constructor(props) {
        super(props)

        this.renderDetailBtn = this.renderDetailBtn.bind(this)
    }

    showDetailClicked(i){
        if (!this.props.hasDetail) return

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
    renderCheckBtn(checkMode){
        if (!checkMode) return null
        return (<th><input type="checkbox"/></th>)
    }
    renderDetailBtn(hasDetail){
        if (!hasDetail) return null
        return (<td onClick = {this.showDetailClicked.bind(this, this.props.index)}>+</td>)
    }

    resolveColumnsTitle(columns) {
        //todo: 判断字段hidden是否存在和其的值
        /* 返回表头文本数组
         ['姓名', '年龄']
         */
        return columns.map((col, i) => col['text'])
    }


    render() {

        const {row, columns, index, hasDetail, checkMode } = this.props


        return (

        <tr >
            {this.renderCheckBtn(checkMode)}
            {this.renderDetailBtn(hasDetail)}


            {this.resolveRow(row, columns).map(function (item, i) {
                return (<td key={i}>{item.text}</td>)
            })}
        </tr>



        )
    }
}

BaseTr.propTypes = {
    hasDetail: React.PropTypes.bool,
    checkMode: React.PropTypes.bool
}

BaseTr.defaultProps = {
    hasDetail: false,
    checkMode: false
}