/**
 * Created by janeluck on 4/7/16.
 */

import fetch from 'isomorphic-fetch'
import { routerMiddleware, push } from 'react-router-redux'
import {rowsData, columns, searchColumns,secondRowsData, secondColumns} from 'components/Business/DataTable/fakeData'
let FormData = require('form-data');


// 获取数据
const GET_TABLE_DATA = 'GET_TABLE_DATA'
// 获取数据成功
const GET_TABLE_DATA_SUCCESS = 'GET_TABLE_DATA_SUCCESS'
// 获取数据失败
const GET_TABLE_DATA_FAILURE = 'GET_TABLE_DATA_FAILURE'



function initSource(source) {
    return {
        type: 'INIT_SOURCE',
        source
    }
}


let table_params = {
    url: '',
    data: {
        page: 1,
        rowsPerPage: 0,
        searchData1: {},
        searchData2: {}
    }
}

/*
 * getData
 * @params url{string}
 * @params data{object}
 *
 * */
const getTableData = (params, source)=> {
    const fetchData = (type, payload, source)=> {

        return {
            type,
            payload,
            source
        }
    }


    return (dispatch, getState) => {

        dispatch(fetchData(GET_TABLE_DATA, {pending: true, rows: []}, source))

        fetch( table_params.url = params.url || table_params.url, {

            method: 'post',
            headers: {
                'API': 1,
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(
                Object.assign(table_params.data, params.data)
            )
        }).then(function (response) {
            if (response.status >= 400) {
                throw new Error("Bad response from server")
            }
            return response.json()
        }).then(function (data) {

            dispatch(fetchData(GET_TABLE_DATA_SUCCESS, {rows: data.rowsData, pending: false}, source))

        })

    }
}

function showDetail(index, rowdata, source) {
    // todo: 换成fetch

    const fetchData = (type, payload, source)=> {

        return {
            type,
            payload,
            source
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



        if (getState()['components']['dataTable'].toJS()[source]['selectedRowDetailObj'].hasOwnProperty(index)) {
            dispatch(fetchData('GET_DETAIL_DATA_SUCCESS', {index: index}, source))
            return
        }


        dispatch(fetchData('GET_DETAIL_DATA', {pending: true, rows: [], index: index}, source))


        p.then(function (data) {
            dispatch(fetchData('GET_DETAIL_DATA_SUCCESS', data, source))


        })

    }
}

function checkRow(index, isChecked, source) {
    return {
        type: 'CHECK_ROW',
        index,
        isChecked,
        source
    }
}

function updateRow(rowData, index, source) {
    return {
        type: 'UPDATE_ROW',
        index,
        rowData,
        source
    }
}
function toggleSearch(isShow, source) {
    return {
        type: 'TOGGLE_SEARCHBAR',
        isShow,
        source
    }
}




/**/
function refreshData() {

}

export {
    GET_TABLE_DATA,
    GET_TABLE_DATA_SUCCESS,
    GET_TABLE_DATA_FAILURE,
    getTableData,
    showDetail,
    checkRow,
    updateRow,
    toggleSearch,
    initSource
}