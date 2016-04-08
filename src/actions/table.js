/**
 * Created by janeluck on 4/7/16.
 */

import fetch from 'isomorphic-fetch'
import { routerMiddleware, push } from 'react-router-redux'
import {rowsData, columns, searchColumns} from 'components/DataTable/fakeData'
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
    const fetchData = (type, data)=> {
        return {
            type,
            data
        }
    }
    const p = new Promise(function(resolve, reject){
        setTimeout(function(){
            resolve(rowsData)
        }, 100)
    })
    return (dispatch, getState) => {

        dispatch(fetchData(GET_DATA))

        p.then(function(data) {
            dispatch(fetchData(GET_DATA_SUCCESS, data))

        })

    }
}

function showDetail(index){
    return {
        type: 'SHOW_DETAIL',
        index
    }
}

function checkRow(index, isChecked){
    return {
        type: 'CHECK_ROW',
        index,
        isChecked
    }
}

export {
    GET_DATA,
    GET_DATA_SUCCESS,
    GET_DATA_FAILURE,
    getData,
    showDetail,
    checkRow
}