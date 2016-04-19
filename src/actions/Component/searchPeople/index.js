import fetch from 'isomorphic-fetch'
import { routerMiddleware, push } from 'react-router-redux'

// 获取列表数据
const CK_SEARCH_GETDATA = 'CK_SEARCH_GETDATA'
const CK_SEARCH_GETDATA_SUCCESS = 'CK_SEARCH_GETDATA_SUCCESS'
const CK_SEARCH_GETDATA_FAILURE = 'CK_SEARCH_GETDATA_FAILURE'
const CK_SEARCH_GETDATA_ERROR_NETWORK = 'CK_SEARCH_GETDATA_ERROR_NETWORK'

//点击列表
const CK_CLICK_GETDATA = 'CK_CLICK_GETDATA'

//点击已选择的tag
const CK_TAG_UPDATEDATA = 'CK_TAG_UPDATEDATA'

//删除已选择的tag
const CK_TAG_DELETEDATA = 'CK_TAG_DELETEDATA'

//搜索人员数据
const CK_SEARCH_ITEMDATA = 'CK_SEARCH_ITEMDATA'

//提交数据
const CK_SUBMITBTN = 'CK_SUBMITBTN'
// 取消
const CK_CANCLEBTN = 'CK_CANCLEBTN'

//滚动底部加载下一页
const CK_LOADMORE_GETDATA = 'CK_LOADMORE_GETDATA'
const CK_LOADMORE_GETDATA_SUCCESS = 'CK_LOADMORE_GETDATA_SUCCESS'

//改变输入框值
const CK_CHANGEINPUT = 'CK_CHANGEINPUT'

//源定义
const DATA_SELECTPEOPLE_SOURCE = 'Account_static'


export const initSource =(source)=>{
    return {
        type: 'INIT_SOURCEPEOPLE',
        source
    }
}

export const changeIsMultiselect = (IsMultiselect)=>{
    return {
        type: 'CHANGE_ISMUTISELECT',
        payload:IsMultiselect,
        source:DATA_SELECTPEOPLE_SOURCE
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
        dispatch(_getPeopleData(CK_SEARCH_GETDATA,{},source));

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

                dispatch(_getPeopleData(CK_SEARCH_GETDATA_SUCCESS, data.data.users, source))

            })
        
    
    }
}


/**
 * 点击列表数据
 * @param  
 * @param 
 * @returns {Function}
 */

export const clickPeopleDate = ({"itemdata":itemdata,"areapadding":InittextareaPadding})=>{
    return {
        type: CK_CLICK_GETDATA,
        payload: {"itemdata":itemdata,"areapadding":InittextareaPadding},
        source:DATA_SELECTPEOPLE_SOURCE
    }
}



/**
 * 点击peopleList数据生成tag
 */

export const clickPeopleTag = ({"itemdata":itemdata,"areapadding":newareapadding})=>{
    return {
        type: CK_TAG_UPDATEDATA,
        payload: {"itemdata":itemdata,"areapadding":newareapadding},
        source:DATA_SELECTPEOPLE_SOURCE
    }
}

/**
 * 点击tag标签数据

 */

export const deletePeopleTag = ({"itemdata":nameItemData,"areapadding":newareapadding})=>{
    return {
        type: CK_TAG_DELETEDATA,
        payload: {"itemdata":nameItemData,"areapadding":newareapadding},
        source:DATA_SELECTPEOPLE_SOURCE
    }
}

export const handleChangeInput = (value)=>{
    return {
        type: CK_CHANGEINPUT,
        payload: value,
        source:DATA_SELECTPEOPLE_SOURCE
    }
}
/**
 * 搜索数据
 * @param  
 * @param 
 * @returns {Function}
 */

export const searchPeopleData = (searchParams)=>{
    const _searchPeopleData = (type, data)=> {
        return {
            type,
            payload: data,
            source:DATA_SELECTPEOPLE_SOURCE
        }
    }

    return (dispatch, getState) => {
    const url = searchParams.url;
    dispatch(_searchPeopleData(CK_SEARCH_GETDATA,{}));

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

            dispatch(_searchPeopleData(CK_SEARCH_ITEMDATA, data.data.users))

        })
            
        
    }





}

// 点击确认按钮 发送请求把所选用户的ID
export const submitData = ({"chosedNameData":choseNameData})=>{
    return {
        type: CK_SUBMITBTN,
        payload: {"chosedNameData":choseNameData},
        source:DATA_SELECTPEOPLE_SOURCE
    }
}

// 点击取消按钮
export const handleCancle = ()=>{
    return {
        type: CK_CANCLEBTN,
        payload: '',
        source:DATA_SELECTPEOPLE_SOURCE
    }
}


/**
 * 加载下一页数据
 * @param  
 * @param 
 * @returns {Function}
 */

export const loadNextPage = (NextPageParams) => {
    const _loadNextPage = (type, data)=> {
        return {
            type,
            payload: data,
            source:DATA_SELECTPEOPLE_SOURCE
        }
    }
    return (dispatch, getState) => {
    const url = NextPageParams.url;
    dispatch(_loadNextPage(CK_LOADMORE_GETDATA,{}));

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

            dispatch(_loadNextPage(CK_LOADMORE_GETDATA_SUCCESS, data.data.users))

        })
            
        
    }



}


export {
    CK_SEARCH_GETDATA,
    CK_SEARCH_GETDATA_SUCCESS,
    CK_SEARCH_GETDATA_FAILURE,
    CK_SEARCH_GETDATA_ERROR_NETWORK,
    CK_CLICK_GETDATA,
    CK_TAG_UPDATEDATA,
    CK_TAG_DELETEDATA,
    CK_SEARCH_ITEMDATA,
    CK_SUBMITBTN,
    CK_CANCLEBTN,
    CK_LOADMORE_GETDATA,
    CK_LOADMORE_GETDATA_SUCCESS,
    CK_CHANGEINPUT,

}