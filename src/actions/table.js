/**
 * Created by janeluck on 4/7/16.
 */

import fetch from 'isomorphic-fetch'
import { routerMiddleware, push } from 'react-router-redux'
import {rowsData, columns, searchColumns} from 'components/DataTable/fakeData'

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
        }, 3000)
    })
    return (dispatch, getState) => {

        dispatch(fetchData(GET_DATA, {pending: true, rows: []}))

        p.then(function (data) {
            layer.close(index)
            dispatch(fetchData(GET_DATA_SUCCESS, data))


        })

    }
}

function showDetail(index) {
    return {
        type: 'SHOW_DETAIL',
        payload: {
            index: index,
            rows: [],
            columns: []
        }
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