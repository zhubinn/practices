import fetch from 'isomorphic-fetch'
import reqwest from 'components/Business/Reqwest'
import { routerMiddleware, push } from 'react-router-redux'
import {Modal } from 'antd'

const COMPONENTS_CHANGE_ISMUTISELECT = 'COMPONENTS_CHANGE_ISMUTISELECT'
const COMPONENTS_CHANGE_ISSHOWMODAL = 'COMPONENTS_CHANGE_ISSHOWMODAL'
const COMPONENTS_GETPEOPLEDATA = 'COMPONENTS_GETPEOPLEDATA'
const COMPONENTS_GETPEOPLEDATA_SUCCESS = 'COMPONENTS_GETPEOPLEDATA_SUCCESS'

const COMPONENTS_GETNEXTPEOPLEDATA = 'COMPONENTS_GETNEXTPEOPLEDATA'
const COMPONENTS_GETNEXTPEOPLEDATA_SUCCESS = 'COMPONENTS_GETNEXTPEOPLEDATA_SUCCESS'


//设置筛选或变更状态
export const changeIsMultiselect = (IsMultiselect)=> {
    return {
        type: COMPONENTS_CHANGE_ISMUTISELECT,
        payload: IsMultiselect,
    }
}


// 改变模态层的显示状态

export const changeIsShowStatus = ()=> {
    return {
        type: COMPONENTS_CHANGE_ISSHOWMODAL,
        payload: ''
    }
}

/**
 * 获取列表数据
 * @param
 * @param
 * @returns {Function}
 */
export const getPeopleData = (params) => {
    const _getPeopleData = (type, data)=> {
        return {
            type,
            payload: data,
        }
    }


    return (dispatch, getState) => {
        const url = params.url;
        //dispatch(_getPeopleData(COMPONENTS_GETPEOPLEDATA, {}));

        reqwest({
            url: url,
            type: 'json',
            method: 'post',
            data: params.data
        }).then(function (data) {
            if (typeof data.rs === 'undefined') {
                Modal.error({
                    title: '出错了',
                    content: '服务器错误, 请联系管理员',
                });
                return
            }
            if (data.rs) {
                dispatch(_getPeopleData(COMPONENTS_GETPEOPLEDATA_SUCCESS, data.data.users))
            }
        }).fail(function (err, msg) {
            Modal.error({
                title:"出错了",
                content:"服务器错误，请联系管理员",
            })
        })

    }

}


/**
 * 获取选择人员下一页列表数据
 * @param
 * @param
 * @returns {Function}
 */
export const getNextPagePeopleData = (params) => {
    const _getNextPagePeopleData = (type, data)=> {
        return {
            type,
            payload: data,
        }
    }

    return (dispatch, getState) => {
        const url = params.url;
        //dispatch(_getNextPagePeopleData(COMPONENTS_GETNEXTPEOPLEDATA, {}));
        reqwest({
            url: url,
            type: 'json',
            method: 'post',
            data: params.data
        }).then(function (data) {
            if (typeof data.rs === 'undefined') {
                Modal.error({
                    title: '出错了',
                    content: '服务器错误, 请联系管理员',
                });
                return
            }
            if (data.rs) {
                    dispatch(_getNextPagePeopleData(COMPONENTS_GETNEXTPEOPLEDATA_SUCCESS, data.data.users))
            }
        }).fail(function (err, msg) {
            Modal.error({
                title:"出错了",
                content:"服务器错误，请联系管理员",
            })
        })

    }


}


export {
    COMPONENTS_CHANGE_ISMUTISELECT,
    COMPONENTS_CHANGE_ISSHOWMODAL,
    COMPONENTS_GETPEOPLEDATA,
    COMPONENTS_GETPEOPLEDATA_SUCCESS,
    COMPONENTS_GETNEXTPEOPLEDATA,
    COMPONENTS_GETNEXTPEOPLEDATA_SUCCESS,
} 