import fetch from 'isomorphic-fetch'
import { routerMiddleware, push } from 'react-router-redux'

// 获取搜索列表数据
const COMPONENT_SEARCH_GETDATA = 'COMPONENT_SEARCH_GETDATA'
const COMPONENT_SEARCH_GETDATA_SUCCESS = 'COMPONENT_SEARCH_GETDATA_SUCCESS'


const COMPONENT_GETPEOPLEDATA = 'COMPONENT_GETPEOPLEDATA'
const COMPONENT_GETPEOPLEDATA_SUCCESS = 'COMPONENT_GETPEOPLEDATA_SUCCESS'
//点击列表
const COMPONENT_CLICK_GETDATA = 'COMPONENT_CLICK_GETDATA'

//点击已选择的tag
const COMPONENT_TAG_UPDATEDATA = 'COMPONENT_TAG_UPDATEDATA'

//删除已选择的tag
const COMPONENT_TAG_DELETEDATA = 'COMPONENT_TAG_DELETEDATA'

//搜索人员数据
const COMPONENT_SEARCH_ITEMDATA = 'COMPONENT_SEARCH_ITEMDATA'

//提交数据
const COMPONENT_SUBMITBTN = 'COMPONENT_SUBMITBTN'
// 取消
const COMPONENT_CANCLEBTN = 'COMPONENT_CANCLEBTN'

//滚动底部加载下一页
const COMPONENT_LOADMORE_GETDATA = 'COMPONENT_LOADMORE_GETDATA'
const COMPONENT_LOADMORE_GETDATA_SUCCESS = 'COMPONENT_LOADMORE_GETDATA_SUCCESS'

//改变输入框值
const COMPONENT_CHANGEINPUT = 'COMPONENT_CHANGEINPUT'
//改变当前页
const COMPONENT_CHANGE_PAGE = 'COMPONENT_CHANGE_PAGE'



export const changePageNum =(page,source)=>{
    return {
        type: COMPONENT_CHANGE_PAGE,
        payload:page,
        source:source
    }
}
export const selectPeopelinitSource =(source,params,confirmOkParams)=>{
    return {
        type: 'COMPONENT_INIT_SOURCEPEOPLE',
        payload:{
            getDataParams:params,
            confirmOkParams:confirmOkParams
        },
        source
    }
}

export const changeIsMultiselect = (IsMultiselect,source)=>{
    return {
        type: 'COMPONENT_CHANGE_ISMUTISELECT',
        payload:IsMultiselect,
        source:source
    }
}

/**
 * 获取列表数据
 * @param  
 * @param 
 * @returns {Function}
 */
export const getPeopleData = (params, source) => {
    const _getPeopleData = (type, data,source)=> {
        return {
            type,
            payload: data,
            source
        }
    }


    return (dispatch, getState) => {
        const url = params.url;
        dispatch(_getPeopleData(COMPONENT_GETPEOPLEDATA,{},source));

            fetch(params.url, {
                credentials: 'include',
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

                dispatch(_getPeopleData(COMPONENT_GETPEOPLEDATA_SUCCESS, data.data.users, source))

            })
        
    
    }
}


/**
 * 点击列表数据
 * @param  
 * @param 
 * @returns {Function}
 */

export const clickPeopleDate = ({"itemdata":itemdata,"areapadding":InittextareaPadding},source)=>{
    return {
        type: COMPONENT_CLICK_GETDATA,
        payload: {"itemdata":itemdata,"areapadding":InittextareaPadding},
        source:source
    }
}



/**
 * 点击peopleList数据生成tag
 */

export const clickPeopleTag = ({"itemdata":itemdata,"areapadding":newareapadding},source)=>{
    return {
        type: COMPONENT_TAG_UPDATEDATA,
        payload: {"itemdata":itemdata,"areapadding":newareapadding},
        source:source
    }
}

/**
 * 点击tag标签数据

 */

export const deletePeopleTag = ({"itemdata":nameItemData,"areapadding":newareapadding},source)=>{
    return {
        type: COMPONENT_TAG_DELETEDATA,
        payload: {"itemdata":nameItemData,"areapadding":newareapadding},
        source:source
    }
}

export const handleChangeInput = (value,source)=>{
    return {
        type: COMPONENT_CHANGEINPUT,
        payload: value,
        source:source
    }
}
/**
 * 搜索数据
 * @param  
 * @param 
 * @returns {Function}
 */

export const searchPeopleData = (searchParams,source)=>{
    const _searchPeopleData = (type, data,source)=> {
        return {
            type,
            payload: data,
            source:source
        }
    }

    return (dispatch, getState) => {
    const url = searchParams.url;
    dispatch(_searchPeopleData(COMPONENT_SEARCH_GETDATA,{},source));

        fetch(url, {
            credentials: 'include',
            method: 'post',
            headers: {
                'API': 1,
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(searchParams.data)
        }).then(function(response) {
            if (response.status >= 400) {
                throw new Error("Bad response from server")
            }
            return response.json()
        }).then(function (data) {

            dispatch(_searchPeopleData(COMPONENT_SEARCH_ITEMDATA, data.data.users,source))

        })
            
        
    }





}

// 点击确认按钮 发送请求把所选用户的ID
export const submitData = (confirmOkParams,source)=>{
    const _submitData = (type, data,source)=> {
        return {
            type,
            payload: data,
            source:source
        }
    }

    return (dispatch, getState) => {
    const url = confirmOkParams.url;
        fetch(url, {
            credentials: 'include',
            method: 'post',
            headers: {
                'API': 1,
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(confirmOkParams.data)
        }).then(function(response) {
            if (response.status >= 400) {
                throw new Error("Bad response from server")
            }
            return response.json()
        }).then(function (data) {

            dispatch(_submitData(COMPONENT_SUBMITBTN,source))

        })
            
        
    }

}






// 点击取消按钮
export const handleCancle = (source)=>{
    return {
        type: COMPONENT_CANCLEBTN,
        payload: '',
        source:source
    }
}


/**
 * 加载下一页数据
 * @param  
 * @param 
 * @returns {Function}
 */

export const loadNextPage = (NextPageParams,source) => {
    const _loadNextPage = (type, data,source)=> {
        return {
            type,
            payload: data,
            source:source
        }
    }
    return (dispatch, getState) => {
    const url = NextPageParams.url;
    dispatch(_loadNextPage(COMPONENT_LOADMORE_GETDATA,{},source));

        fetch(url, {
            credentials: 'include',
            method: 'post',
            headers: {
                'API': 1,
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(NextPageParams.data)
        }).then(function(response) {
            if (response.status >= 400) {
                throw new Error("Bad response from server")
            }
            return response.json()
        }).then(function (data) {

            dispatch(_loadNextPage(COMPONENT_LOADMORE_GETDATA_SUCCESS, data.data.users,source))

        })
            
        
    }



}


export {
    COMPONENT_GETPEOPLEDATA,
    COMPONENT_GETPEOPLEDATA_SUCCESS,
    COMPONENT_CLICK_GETDATA,
    COMPONENT_TAG_UPDATEDATA,
    COMPONENT_TAG_DELETEDATA,
    COMPONENT_SEARCH_GETDATA,
    COMPONENT_SEARCH_ITEMDATA,
    COMPONENT_SUBMITBTN,
    COMPONENT_CANCLEBTN,
    COMPONENT_LOADMORE_GETDATA,
    COMPONENT_LOADMORE_GETDATA_SUCCESS,
    COMPONENT_CHANGEINPUT,
    COMPONENT_CHANGE_PAGE,
}