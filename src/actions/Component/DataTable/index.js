/**
 * Created by janeluck on 4/7/16.
 */

import fetch from 'isomorphic-fetch'
import { routerMiddleware, push } from 'react-router-redux'
import {rowsData, columns, searchColumns,secondRowsData, secondColumns} from 'components/Business/DataTable/fakeData'

<<<<<<< HEAD
=======

>>>>>>> 7f4e613cfd97f4e920a1f9641a2fbc2f26b4bf36
// 获取数据
const GET_DATA = 'GET_DATA'
// 获取数据成功
const GET_DATA_SUCCESS = 'GET_DATA_SUCCESS'
// 获取数据失败
const GET_DATA_FAILURE = 'GET_DATA_FAILURE'



function initSource(source) {
    return {
        type: 'INIT_SOURCE',
        source
    }
}





/**
 * 获取数据
 * @params {url:'', data: {}}
 * @returns {Function}
 */
const getData = (params, source)=> {
    const fetchData = (type, payload, source)=> {

        return {
            type,
            payload,
            source
        }
    }
<<<<<<< HEAD
=======

>>>>>>> 7f4e613cfd97f4e920a1f9641a2fbc2f26b4bf36
    /*    const p = new Promise(function (resolve, reject) {
     setTimeout(function () {
     resolve({
     rows: rowsData,
     pending: false
     })
     }, 1000)
     })*/
    return (dispatch, getState) => {

        dispatch(fetchData(GET_DATA, {pending: true, rows: []}, source))
        // todo: 封装
        fetch(params.url, {

            method: 'post',
            headers: {
                'API': 1,
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(params.data)
        }).then(function(response) {
            if (response.status >= 400) {
                throw new Error("Bad response from server")
            }
            return response.json()
        }).then(function (data) {
<<<<<<< HEAD
=======

>>>>>>> 7f4e613cfd97f4e920a1f9641a2fbc2f26b4bf36
            dispatch(fetchData(GET_DATA_SUCCESS, {rows: data.rowsData, pending: false}, source))

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
    GET_DATA,
    GET_DATA_SUCCESS,
    GET_DATA_FAILURE,
    getData,
    showDetail,
    checkRow,
    updateRow,
    toggleSearch,
    initSource
}