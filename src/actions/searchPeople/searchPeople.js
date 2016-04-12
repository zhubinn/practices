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
const CK_SUBMITDATA = 'CK_SUBMITDATA'

//滚动底部加载下一页
const CK_LOADMORE_GETDATA = 'CK_LOADMORE_GETDATA'
const CK_LOADMORE_GETDATA_SUCCESS = 'CK_LOADMORE_GETDATA_SUCCESS'
/**
 * 获取列表数据
 * @param  
 * @param 
 * @returns {Function}
 */
export const getPeopleData = () => {
    const _getPeopleData = (type, data)=> {
        return {
            type,
            payload: data
        }
    }


    return (dispatch, getState) => {
        //const url = 'http://esn.chenhuangfang.com/scrmnumreport/index/tpllist/VISITID/1?filterscount=0&groupscount=0&pagenum=1&pagesize=20&recordstartindex=0&recordendindex=13&_=1458806730117'
        const url = '/actions/_demo/list.json';
        const jsonData = {
        data:[
        {
            "ID":"14623",
            "Name":"第一页",
            "Dept":"全公司",
            "Avatar":"http://test.staticoss.upesn.com/1/14623/201512/3/1449111464vXTV.jpg.thumb.jpg",
            "Url":"http://esn.fuwenfang.com/space/cons/index/id/14623"
        },
        {
            "ID":"4507",
            "Name":"曹海龙",
            "Dept":"全公司",
            "Avatar":"http://test.staticoss.upesn.com/1/4507/201601/18/1453080583VG6s.jpg.thumb.jpg",
            "Url":"http://esn.fuwenfang.com/space/cons/index/id/4507"
        },
        {
            "ID":"4488",
            "Name":"123456",
            "Dept":"研发部",
            "Avatar":"http://test.staticoss.upesn.com/1/4488/201508/17/1439801185r4SR.jpg.thumb.jpg",
            "Url":"http://esn.fuwenfang.com/space/cons/index/id/4488"
        },
        {
            "ID":"4487",
            "Name":"123222",
            "Dept":"研发部",
            "Avatar":"http://esn.fuwenfang.com/front/images/scrm/default_avatar.png",
            "Url":"http://esn.fuwenfang.com/space/cons/index/id/4487"
        },
        {
            "ID":"4472",
            "Name":"刘王芳",
            "Dept":"全公司",
            "Avatar":"http://esn.fuwenfang.com/front/images/scrm/default_avatar.png",
            "Url":"http://esn.fuwenfang.com/space/cons/index/id/4472"
        },
        {
            "ID":"4400",
            "Name":"测试3",
            "Dept":"全公司",
            "Avatar":"http://esn.fuwenfang.com/front/images/scrm/default_avatar.png",
            "Url":"http://esn.fuwenfang.com/space/cons/index/id/4400"
        },
        {
            "ID":"4339",
            "Name":"刘王芳",
            "Dept":"全公司",
            "Avatar":"http://test.staticoss.upesn.com/1/4339/201505/29/1432867053YB20.jpg.thumb.jpg",
            "Url":"http://esn.fuwenfang.com/space/cons/index/id/4339"
        },
        {
            "ID":"4214",
            "Name":"aa",
            "Dept":"考勤测试部门",
            "Avatar":"http://esn.fuwenfang.com/front/images/scrm/default_avatar.png",
            "Url":"http://esn.fuwenfang.com/space/cons/index/id/4214"
        },
        {
            "ID":"4194",
            "Name":"bb",
            "Dept":"测试部门",
            "Avatar":"http://esn.fuwenfang.com/front/images/scrm/default_avatar.png",
            "Url":"http://esn.fuwenfang.com/space/cons/index/id/4194"
        },
        {
            "ID":"1194",
            "Name":"vv",
            "Dept":"开发部门",
            "Avatar":"http://esn.fuwenfang.com/front/images/scrm/default_avatar.png",
            "Url":"http://esn.fuwenfang.com/space/cons/index/id/4194"
        },
        {
            "ID":"6194",
            "Name":"tt",
            "Dept":"部门",
            "Avatar":"http://esn.fuwenfang.com/front/images/scrm/default_avatar.png",
            "Url":"http://esn.fuwenfang.com/space/cons/index/id/4194"
        },
        {
            "ID":"8494",
            "Name":"qq",
            "Dept":"部门A",
            "Avatar":"http://esn.fuwenfang.com/front/images/scrm/default_avatar.png",
            "Url":"http://esn.fuwenfang.com/space/cons/index/id/4194"
        },
        {
            "ID":"9194",
            "Name":"rr",
            "Dept":"部门B",
            "Avatar":"http://esn.fuwenfang.com/front/images/scrm/default_avatar.png",
            "Url":"http://esn.fuwenfang.com/space/cons/index/id/4194"
        },
        {
            "ID":"1194",
            "Name":"hh",
            "Dept":"部门V",
            "Avatar":"http://esn.fuwenfang.com/front/images/scrm/default_avatar.png",
            "Url":"http://esn.fuwenfang.com/space/cons/index/id/4194"
        }]
    }

        dispatch(_getPeopleData(CK_SEARCH_GETDATA));

        return fetch(url, {
            method: 'get',
            headers: {
                'API': 1,
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        }).then(response=> {
            //dispatch(_getPeopleData(CK_SEARCH_GETDATA_SUCCESS, peopleListData))
            if (response.status >= 400) {
                //dispatch(_getReportData(CK_REPORT_GETDATA_ERROR_NETWORK))
                return {};
            }
            return response.json()
        }).then(json=> {
        	json = jsonData;//假数据
        	//console.log(json);
            // if (json.rs) {
            //     dispatch(_getPeopleData(CK_SEARCH_GETDATA_SUCCESS, json.data))
            // } else {
            //     dispatch(_getPeopleData(CK_SEARCH_GETDATA_FAILURE))
            // }
            dispatch(_getPeopleData(CK_SEARCH_GETDATA_SUCCESS, json))
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
    const _clickPeopleDate = (type, data)=> {
        return {
            type,
            payload: data
        }
    }

    return (dispatch, getState) => {
        dispatch(_clickPeopleDate(CK_CLICK_GETDATA,{"itemdata":itemdata,"areapadding":InittextareaPadding}))
    }

}


/**
 * 点击tag标签数据
 * @param  
 * @param 
 * @returns {Function}
 */

    
export const clickPeopleTag = ({"itemdata":itemdata,"areapadding":newareapadding})=>{
    const _clickPeopleTag = (type, data)=> {
        return {
            type,
            payload: data
        }
    }

    return (dispatch, getState) => {
        dispatch(_clickPeopleTag(CK_TAG_UPDATEDATA,{"itemdata":itemdata,"areapadding":newareapadding}))
    }

}

/**
 * 点击tag标签数据
 * @param  
 * @param 
 * @returns {Function}
 */

    
export const deletePeopleTag = ({"itemdata":nameItemData,"areapadding":newareapadding})=>{
    const _deletePeopleTag = (type, data)=> {
        return {
            type,
            payload: data
        }
    }

    return (dispatch, getState) => {
        dispatch(_deletePeopleTag(CK_TAG_DELETEDATA,{"itemdata":nameItemData,"areapadding":newareapadding}))
    }

}
/**
 * 搜索数据
 * @param  
 * @param 
 * @returns {Function}
 */

export const searchPeopleData = (textValue)=>{
    const _searchPeopleData = (type, data)=> {
        return {
            type,
            payload: data
        }
    }

    return (dispatch, getState) => {
        const url = '/actions/_demo/list.json';
        const searchJsonData = {
            data:[{
                "ID":"4085",
                "Name":"张笑颜a",
                "Dept":"全公司",
                "Avatar":"http://test.staticoss.upesn.com/1/4085/201509/25/1443191497Eth8.jpg.thumb.jpg",
                "Url":"http://esn.fuwenfang.com/space/cons/index/id/4085"
            },
            {
                "ID":"4049",
                "Name":"唐零一二",
                "Dept":"全公司",
                "Avatar":"http://test.staticoss.upesn.com/1/4049/201511/26/1448536650Pppi.jpeg.thumb.jpg",
                "Url":"http://esn.fuwenfang.com/space/cons/index/id/4049"
            },
            {
                "ID":"3992",
                "Name":"212",
                "Dept":"研发部",
                "Avatar":"http://esn.fuwenfang.com/front/images/scrm/default_avatar.png",
                "Url":"http://esn.fuwenfang.com/space/cons/index/id/3992"
            },
            {
                "ID":"3925",
                "Name":"eoi",
                "Dept":"全公司",
                "Avatar":"http://test.staticoss.upesn.com/314/3925/201502/11/1423645702oH3y.jpg.thumb.jpg",
                "Url":"http://esn.fuwenfang.com/space/cons/index/id/3925"
            }]
        };

        dispatch(_searchPeopleData(CK_SEARCH_GETDATA));

        return fetch(url, {
            method: 'get',
            headers: {
                'API': 1,
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        }).then(response=> {
            //dispatch(_getPeopleData(CK_SEARCH_GETDATA_SUCCESS, peopleListData))
            if (response.status >= 400) {
                //dispatch(_getReportData(CK_REPORT_GETDATA_ERROR_NETWORK))
                return {};
            }
            return response.json()
        }).then(json=> {
            json = searchJsonData;//假数据
            //console.log(json);
            // if (json.rs) {
            //     dispatch(_getPeopleData(CK_SEARCH_GETDATA_SUCCESS, json.data))
            // } else {
            //     dispatch(_getPeopleData(CK_SEARCH_GETDATA_FAILURE))
            // }
            dispatch(_searchPeopleData(CK_SEARCH_ITEMDATA, json))
        })
    }

}



export const submitData = ({"chosedNameData":choseNameData})=>{

    const _submitData = (type, data)=> {
        return {
            type,
            payload: data
        }
    }

    return (dispatch, getState) => {
        dispatch(_submitData(CK_SUBMITDATA,{"chosedNameData":choseNameData}))
    }

}

/**
 * 加载下一页数据
 * @param  
 * @param 
 * @returns {Function}
 */

export const loadNextPage = () => {
    const _loadNextPage = (type, data)=> {
        return {
            type,
            payload: data
        }
    }

    return (dispatch, getState) => {

        //const url = 'http://esn.chenhuangfang.com/scrmnumreport/index/tpllist/VISITID/1?filterscount=0&groupscount=0&pagenum=1&pagesize=20&recordstartindex=0&recordendindex=13&_=1458806730117'
        const url = '/actions/_demo/list02.json';
        const jsonData = {
        data:[
        {
            "ID":"14623",
            "Name":"第二页",
            "Dept":"全公司",
            "Avatar":"http://test.staticoss.upesn.com/1/14623/201512/3/1449111464vXTV.jpg.thumb.jpg",
            "Url":"http://esn.fuwenfang.com/space/cons/index/id/14623"
        },
        {
            "ID":"4507",
            "Name":"曹海龙22",
            "Dept":"全公司",
            "Avatar":"http://test.staticoss.upesn.com/1/4507/201601/18/1453080583VG6s.jpg.thumb.jpg",
            "Url":"http://esn.fuwenfang.com/space/cons/index/id/4507"
        },
        {
            "ID":"4488",
            "Name":"12345622",
            "Dept":"研发部",
            "Avatar":"http://test.staticoss.upesn.com/1/4488/201508/17/1439801185r4SR.jpg.thumb.jpg",
            "Url":"http://esn.fuwenfang.com/space/cons/index/id/4488"
        },
        {
            "ID":"4487",
            "Name":"12322222",
            "Dept":"研发部",
            "Avatar":"http://esn.fuwenfang.com/front/images/scrm/default_avatar.png",
            "Url":"http://esn.fuwenfang.com/space/cons/index/id/4487"
        },
        {
            "ID":"4472",
            "Name":"刘王芳22",
            "Dept":"全公司",
            "Avatar":"http://esn.fuwenfang.com/front/images/scrm/default_avatar.png",
            "Url":"http://esn.fuwenfang.com/space/cons/index/id/4472"
        },
        {
            "ID":"4400",
            "Name":"测试322",
            "Dept":"全公司",
            "Avatar":"http://esn.fuwenfang.com/front/images/scrm/default_avatar.png",
            "Url":"http://esn.fuwenfang.com/space/cons/index/id/4400"
        },
        {
            "ID":"4339",
            "Name":"刘王芳22",
            "Dept":"全公司",
            "Avatar":"http://test.staticoss.upesn.com/1/4339/201505/29/1432867053YB20.jpg.thumb.jpg",
            "Url":"http://esn.fuwenfang.com/space/cons/index/id/4339"
        },
        {
            "ID":"4214",
            "Name":"aa22",
            "Dept":"考勤测试部门",
            "Avatar":"http://esn.fuwenfang.com/front/images/scrm/default_avatar.png",
            "Url":"http://esn.fuwenfang.com/space/cons/index/id/4214"
        },
        {
            "ID":"4194",
            "Name":"bb22",
            "Dept":"测试部门",
            "Avatar":"http://esn.fuwenfang.com/front/images/scrm/default_avatar.png",
            "Url":"http://esn.fuwenfang.com/space/cons/index/id/4194"
        },
        {
            "ID":"1194",
            "Name":"vv22",
            "Dept":"开发部门",
            "Avatar":"http://esn.fuwenfang.com/front/images/scrm/default_avatar.png",
            "Url":"http://esn.fuwenfang.com/space/cons/index/id/4194"
        },
        {
            "ID":"6194",
            "Name":"tt22",
            "Dept":"部门",
            "Avatar":"http://esn.fuwenfang.com/front/images/scrm/default_avatar.png",
            "Url":"http://esn.fuwenfang.com/space/cons/index/id/4194"
        },
        {
            "ID":"8494",
            "Name":"qq22",
            "Dept":"部门A",
            "Avatar":"http://esn.fuwenfang.com/front/images/scrm/default_avatar.png",
            "Url":"http://esn.fuwenfang.com/space/cons/index/id/4194"
        },
        {
            "ID":"9194",
            "Name":"rr22",
            "Dept":"部门B",
            "Avatar":"http://esn.fuwenfang.com/front/images/scrm/default_avatar.png",
            "Url":"http://esn.fuwenfang.com/space/cons/index/id/4194"
        },
        {
            "ID":"1194",
            "Name":"hh22",
            "Dept":"部门V",
            "Avatar":"http://esn.fuwenfang.com/front/images/scrm/default_avatar.png",
            "Url":"http://esn.fuwenfang.com/space/cons/index/id/4194"
        }]
    }

        dispatch(_loadNextPage(CK_LOADMORE_GETDATA));

        return fetch(url, {
            method: 'get',
            headers: {
                'API': 1,
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        }).then(response=> {
            //dispatch(_getPeopleData(CK_SEARCH_GETDATA_SUCCESS, peopleListData))
            if (response.status >= 400) {
                //dispatch(_getReportData(CK_REPORT_GETDATA_ERROR_NETWORK))
                return {};
            }
            return response.json()
        }).then(json=> {
            //把新一页的数据与当前已展示的页的数据连接
            json = {data:getState().searchPeople.toJS().data.concat(jsonData.data)};//假数据
            //console.log(json);
            // if (json.rs) {
            //     dispatch(_getPeopleData(CK_SEARCH_GETDATA_SUCCESS, json.data))
            // } else {
            //     dispatch(_getPeopleData(CK_SEARCH_GETDATA_FAILURE))
            // }
            dispatch(_loadNextPage(CK_LOADMORE_GETDATA_SUCCESS, json))
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
    CK_SUBMITDATA,
    CK_LOADMORE_GETDATA,
    CK_LOADMORE_GETDATA_SUCCESS,
    getPeopleData,
    clickPeopleDate,
    clickPeopleTag,
    deletePeopleTag,
    searchPeopleData,
    submitData,
    loadNextPage
}