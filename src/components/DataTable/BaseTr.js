/**
 * Created by janeluck on 4/7/16.
 */
import { findDOMNode } from 'react-dom'
import { isPlainObject, isFunction, isString, isArray } from 'lodash'
export default class BaseTr extends React.Component {
    constructor(props) {
        super(props)

        this.renderDetailBtn = this.renderDetailBtn.bind(this)
        this.renderCheckBtn = this.renderCheckBtn.bind(this)
        this.checkRow = this.checkRow.bind(this)
        this.updateRow = this.updateRow.bind(this)

    }


    updateRow(rowData){
        this.props.onUpdateRow(rowData, this.props.index)
    }
    showDetailClicked(i) {
        if (!this.props.hasDetail) return

        this.props.onShowDetail(i)
    }

    // 解析需要展示的列, 并从row中取出字段对应内容(文本或者虚拟dom)
    /*
    * params
    * @row: 当前行数据
    * @index: 当前行索引
    * */
    resolveRow(row, columns, index) {

        return columns.map((col, i) => col['datafield'])
            .map((keyName, i) => ({
                    keyName: keyName,
                    // 判断该列是否为自定义渲染
                    text: isFunction(columns[i]['cellsrenderer']) ? columns[i]['cellsrenderer'].call(this, row, columns[i], row[keyName], index) : row[keyName]
                })
            )

    }

    checkRow() {

        this.props.onCheckRow(this.props.index, !this.props.isOnChecked)


    }

    renderCheckBtn(checkMode, isOnchecked) {
        if (!checkMode) return null
        return (<td className="small-cell"><input type="checkbox" onChange={this.checkRow} checked={isOnchecked}/></td>)
    }

    renderDetailBtn(hasDetail) {
        if (!hasDetail) return null
        return (<td className="small-cell" ><div onClick={this.showDetailClicked.bind(this, this.props.index)} className={this.props.isOnShowDetail ? "date-Sltround-cut" : "date-Sltround-add"}></div></td>)
    }

    resolveColumnsTitle(columns) {
        //todo: 判断字段hidden是否存在和其的值
        /* 返回表头文本数组
         ['姓名', '年龄']
         */
        return columns.map((col, i) => col['text'])
    }


    render() {

        const {row, columns, index, hasDetail, checkMode, isOnChecked } = this.props


        return (

            <tr >
                {this.renderCheckBtn(checkMode, isOnChecked)}
                {this.renderDetailBtn(hasDetail)}


                {this.resolveRow(row, columns, index).map(function (item, i) {
                    return (<td key={i}>{item.text}</td>)
                })}
            </tr>



        )
    }
}

BaseTr.propTypes = {
    // 该行是否可展示详情
    hasDetail: React.PropTypes.bool,
    // 该行是否为可check
    checkMode: React.PropTypes.bool,
    // 该行是否在已check状态
    isOnChecked: React.PropTypes.bool
}

BaseTr.defaultProps = {
    hasDetail: false,
    checkMode: false,
    isOnChecked: false
}