/**
 * Created by janeluck on 4/7/16.
 */

import { findDOMNode } from 'react-dom'
import { isPlainObject, isFunction, isString, isArray } from 'lodash'
import './DataTable.less'

export default class DataTable extends React.Component{
    constructor(props) {
        super(props)
        this.onClick = this.onClick.bind(this)

    }



    onClick(e) {

    }

    resolveColumnsTitle(columns){
        //todo: 判断字段hidden是否存在和其的值
        /* 返回表头文本数组
         ['姓名', '年龄']
         */
        return columns.map((col, i) => col['text'])
    }




    // 解析需要展示的列, 并从row中取出字段对应内容(文本或者虚拟dom)
    resolveRow(row, columns){

        return columns.map((col, i) => col['datafield'])
            .map((keyName, i) =>  ({
                    keyName: keyName,
                    // 判断该列是否为自定义渲染
                    text: isFunction(columns[i]['cellsrenderer']) ?  columns[i]['cellsrenderer'].call(this, row, columns[i], row[keyName]) : row[keyName]
                })
            )

    }
    render() {
        const {rows, columns, searchColumns} = this.props

        const mutiRows = fn(rows, [2,3])  // [{rows: [], columns: []}, {rows: [], columns: []}, {rows: [], columns: []}]

        return (
            mutiRows.map(item => {
                return <table rows = items/>
            })
        )

        return (
            <div className="dataTable">
                <div>
                    <button>高级搜索</button>
                    <button>确定</button>
                </div>
                <div >
                    <div className="dataTable-title">
                        <div className="dataTable-title-row">
                            {this.resolveColumnsTitle(columns).map((colName, i)=>(<div key = {i} className="dataTable-title-cell">{colName}</div>))}

                        </div>
                    </div>
                    <div className="dataTable-searchBar"></div>
                    <div className="dataTable-body">
                        {rows.map((row, i) => (
                            <div className="dataTable-body-row" key = {i}>
                                <div className="dataTable-body-tr">
                                {this.resolveRow(row, columns).map(function (item, i) {
                                    return (<div className="dataTable-body-td"   key={i}>{item.text}</div>)
                                })}
                                </div>

                                <div className="dataTable-body-row-detail"></div>
                            </div>

                        ))}

                        {/*
                        <div className="dataTable-body-row">
                            <div className="dataTable-body-tr">
                                <div className="dataTable-body-td">1</div>
                                <div className="dataTable-body-td">1</div>
                                <div className="dataTable-body-td">1</div>
                                <div className="dataTable-body-td">1</div>
                            </div>
                            <div className="dataTable-body-row-detail"></div>
                        </div>*/}

                    </div>
                </div>
            </div>
        )
    }
}



DataTable.propTypes = {

}