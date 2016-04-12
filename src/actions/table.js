/**
 * Created by janeluck on 4/7/16.
 */

import fetch from 'isomorphic-fetch'
import { routerMiddleware, push } from 'react-router-redux'
import {rowsData, columns, searchColumns,secondRowsData, secondColumns} from 'components/DataTable/fakeData'


import layer from 'ucjs_modules/layer/2.2.0/layer.js'
// 获取数据
const GET_DATA = 'GET_DATA'
// 获取数据成功
const GET_DATA_SUCCESS = 'GET_DATA_SUCCESS'
// 获取数据失败
const GET_DATA_FAILURE = 'GET_DATA_FAILURE'


/**
 * 获取数据
 * @param
 * @returns {Function}
 */
const getData = (source)=> {
    const fetchData = (type, payload)=> {

        return {
            type,
            payload
        }
    }
    const index = layer.load(0, {shade: false})
    const p = new Promise(function (resolve, reject) {
        setTimeout(function () {
            resolve({
                rows: rowsData,
                pending: false
            })
        }, 1000)
    })
    return (dispatch, getState) => {

        dispatch(fetchData(GET_DATA, {pending: true, rows: []}))

        p.then(function (data) {
            layer.close(index)
            dispatch(fetchData(GET_DATA_SUCCESS, data))


        })

    }
}

function showDetail(index, rowdata) {


    const fetchData = (type, payload)=> {

        return {
            type,
            payload
        }
    }

    const p = new Promise(function (resolve, reject) {
        setTimeout(function () {
            resolve({
                rows: secondRowsData,

                pending: false,
                index: index
            })
        }, 1000)
    })
    return (dispatch, getState) => {

        // todo: 改放到action里处理
        if (getState()['dataTable'].get('selectedRowDetailObj').toJS().hasOwnProperty(index)) {
            dispatch(fetchData('GET_DETAIL_DATA_SUCCESS', {index: index}))
            return
        }


        const layerindex = layer.load(0, {shade: false})
        dispatch(fetchData('GET_DETAIL_DATA', {pending: true, rows: [], index: index}))


        p.then(function (data) {
            layer.close(layerindex)
            dispatch(fetchData('GET_DETAIL_DATA_SUCCESS', data))


        })

    }
}

function checkRow(index, isChecked) {
    return {
        type: 'CHECK_ROW',
        index,
        isChecked
    }
}

function updateRow(rowData, index) {
    return {
        type: 'UPDATE_ROW',
        index,
        rowData
    }
}
function toggleSearch(isShow) {
    return {
        type: 'TOGGLE_SEARCHBAR',
        isShow
    }
}


/**/
function refreshData(){

}

export {
    GET_DATA,
    GET_DATA_SUCCESS,
    GET_DATA_FAILURE,
    getData,
    showDetail,
    checkRow,
    updateRow,
    toggleSearch
}