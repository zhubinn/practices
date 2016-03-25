/**
 * Created by chenhf on 16-3-24.
 */
import fetch from 'isomorphic-fetch'
import { routerMiddleware, push } from 'react-router-redux'

// 获取报表数据
const CK_REPORT_GETDATA = 'CK_REPORT_GETDATA'
const CK_REPORT_GETDATA_SUCCESS = 'CK_REPORT_GETDATA_SUCCESS'
const CK_REPORT_GETDATA_FAILURE = 'CK_REPORT_GETDATA_FAILURE'
const CK_REPORT_GETDATA_ERROR_NETWORK = 'CK_REPORT_GETDATA_ERROR_NETWORK'
// 修改一行数据
const CK_REPORT_UPDATE = 'CK_REPORT_UPDATE'
const CK_REPORT_DELETE = 'CK_REPORT_DELETE'
// 启动停止操作
const CK_REPORT_GENERATE_TOGGLE = 'CK_REPORT_GENERATE_TOGGLE'
const CK_REPORT_GENERATE_TOGGLE_SUCCESS = 'CK_REPORT_GENERATE_TOGGLE_SUCCESS'
const CK_REPORT_GENERATE_TOGGLE_FAILURE = 'CK_REPORT_GENERATE_TOGGLE_FAILURE'
const CK_REPORT_GENERATE_TOGGLE_ERROR_NETWORK = 'CK_REPORT_GENERATE_TOGGLE_ERROR_NETWORK'

/**
 * 启动停止操作
 */
const toggleGenerateReport = () => {
    const _toggleGenerateReport = (type, data)=> {
        return {
            type,
            payload: data
        }
    }
    const url = 'http://esn.chenhuangfang.com/scrmnumreport/index/tplStop/VISITID/1/ID/899/status/0'

    return (dispatch, getState) => {
        dispatch(_toggleGenerateReport(CK_REPORT_GENERATE_TOGGLE))
        fetch(url, {
            method: 'post',
            headers: {
                'API': 1,
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        }).then(response=> {
            if (response.status >= 400) {
                dispatch(_toggleGenerateReport(CK_REPORT_GENERATE_TOGGLE_ERROR_NETWORK))
            }
            return response.json()
        }).then(json=> {
            if (json.rs) {
                dispatch(_toggleGenerateReport(CK_REPORT_GENERATE_TOGGLE_SUCCESS, json.data))
            } else {
                dispatch(_toggleGenerateReport(CK_REPORT_GENERATE_TOGGLE_FAILURE, json.data))
            }
        })
    }
}

/**
 * 获取报表数据
 * @param columns
 * @param rows
 * @returns {Function}
 */
const getReportData = (columns, rows) => {
    const _getReportData = (type, data)=> {
        return {
            type,
            payload: data
        }
    }

    return (dispatch, getState) => {
        //const url = 'http://esn.chenhuangfang.com/scrmnumreport/index/tpllist/VISITID/1?filterscount=0&groupscount=0&pagenum=1&pagesize=20&recordstartindex=0&recordendindex=13&_=1458806730117'
        const url = 'http://localhost:8081/data.json'

        dispatch(_getReportData(CK_REPORT_GETDATA))

        return fetch(url, {
            method: 'get',
            headers: {
                'API': 1,
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        }).then(response=> {
            dispatch(_getReportData(CK_REPORT_GETDATA_SUCCESS, {
                columns,
                rows
            }))
            if (response.status >= 400) {
                //dispatch(_getReportData(CK_REPORT_GETDATA_ERROR_NETWORK))
                return {};
            }
            return response.json()
        }).then(json=> {
            if (json.rs) {
                dispatch(_getReportData(CK_REPORT_GETDATA_SUCCESS, json.data))
            } else {
                dispatch(_getReportData(CK_REPORT_GETDATA_FAILURE))
            }
        })
    }
}

const updateRow = (row, index) => {
    return {
        type: CK_REPORT_UPDATE,
        payload: {
            row,
            index
        }
    }
}

const deleteRow = (index) => {
    return {
        type: CK_REPORT_DELETE,
        payload: {
            index
        }
    }
}

export {
    CK_REPORT_GETDATA,
    CK_REPORT_GETDATA_SUCCESS,
    CK_REPORT_GETDATA_FAILURE,
    CK_REPORT_GETDATA_ERROR_NETWORK,
    CK_REPORT_UPDATE,
    CK_REPORT_DELETE,
    CK_REPORT_GENERATE_TOGGLE,
    CK_REPORT_GENERATE_TOGGLE_SUCCESS,
    CK_REPORT_GENERATE_TOGGLE_FAILURE,
    CK_REPORT_GENERATE_TOGGLE_ERROR_NETWORK,
    toggleGenerateReport,
    getReportData,
    updateRow,
    deleteRow,
}