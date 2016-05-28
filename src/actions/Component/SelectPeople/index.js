import fetch from 'isomorphic-fetch'
import reqwest from 'reqwest';
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
            method: 'post',
            data: params.data,
            type: 'json',
            success: (data) => {
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
            }
        });

    }


    /* //fakeData pageOne
     const data  = {"rs":true,"data":{"total":192,"pages":20,"currentPage":1,"pageRow":10,"users":
     [
     {
     "ID":"1462",
     "Name":"搜索内容",
     "Dept":"全公司",
     "Avatar":"http://test.staticoss.upesn.com/1/14623/201512/3/1449111464vXTV.jpg.thumb.jpg",
     "Url":"http://esn.fuwenfang.com/space/cons/index/id/14623"
     },
     {
     "ID":"450",
     "Name":"曹海龙",
     "Dept":"全公司",
     "Avatar":"http://test.staticoss.upesn.com/1/4507/201601/18/1453080583VG6s.jpg.thumb.jpg",
     "Url":"http://esn.fuwenfang.com/space/cons/index/id/4507"
     },
     {
     "ID":"448",
     "Name":"123456",
     "Dept":"研发部",
     "Avatar":"http://test.staticoss.upesn.com/1/4488/201508/17/1439801185r4SR.jpg.thumb.jpg",
     "Url":"http://esn.fuwenfang.com/space/cons/index/id/4488"
     },
     {
     "ID":"445557",
     "Name":"123222",
     "Dept":"研发部",
     "Avatar":"http://esn.fuwenfang.com/front/images/scrm/default_avatar.png",
     "Url":"http://esn.fuwenfang.com/space/cons/index/id/4487"
     },
     {
     "ID":"447",
     "Name":"刘王芳",
     "Dept":"全公司",
     "Avatar":"http://esn.fuwenfang.com/front/images/scrm/default_avatar.png",
     "Url":"http://esn.fuwenfang.com/space/cons/index/id/4472"
     },
     {
     "ID":"405550",
     "Name":"测试3",
     "Dept":"全公司",
     "Avatar":"http://esn.fuwenfang.com/front/images/scrm/default_avatar.png",
     "Url":"http://esn.fuwenfang.com/space/cons/index/id/4400"
     },
     {
     "ID":"439",
     "Name":"刘王芳",
     "Dept":"全公司",
     "Avatar":"http://test.staticoss.upesn.com/1/4339/201505/29/1432867053YB20.jpg.thumb.jpg",
     "Url":"http://esn.fuwenfang.com/space/cons/index/id/4339"
     },
     {
     "ID":"421",
     "Name":"aa",
     "Dept":"考勤测试部门",
     "Avatar":"http://esn.fuwenfang.com/front/images/scrm/default_avatar.png",
     "Url":"http://esn.fuwenfang.com/space/cons/index/id/4214"
     },
     {
     "ID":"414",
     "Name":"aa",
     "Dept":"考勤测试部门",
     "Avatar":"http://esn.fuwenfang.com/front/images/scrm/default_avatar.png",
     "Url":"http://esn.fuwenfang.com/space/cons/index/id/4194"
     },
     {
     "ID":"11141855",
     "Name":"张笑颜15",
     "Dept":"全公司",
     "Avatar":"http://esn.fuwenfang.com/front/images/scrm/default_avatar.png",
     "Url":"http://esn.fuwenfang.com/space/cons/index/id/4182"
     },
     {
     "ID":"111414",
     "Name":"aa",
     "Dept":"考勤测试部门",
     "Avatar":"http://esn.fuwenfang.com/front/images/scrm/default_avatar.png",
     "Url":"http://esn.fuwenfang.com/space/cons/index/id/4194"
     },
     {
     "ID":"111418",
     "Name":"张笑颜15",
     "Dept":"全公司",
     "Avatar":"http://esn.fuwenfang.com/front/images/scrm/default_avatar.png",
     "Url":"http://esn.fuwenfang.com/space/cons/index/id/4182"
     },
     {
     "ID":"11419",
     "Name":"11",
     "Dept":"全公司",
     "Avatar":"http://esn.fuwenfang.com/front/images/scrm/default_avatar.png",
     "Url":"http://esn.fuwenfang.com/space/cons/index/id/4139"
     },
     {
     "ID":"4055503",
     "Name":"测试3",
     "Dept":"全公司",
     "Avatar":"http://esn.fuwenfang.com/front/images/scrm/default_avatar.png",
     "Url":"http://esn.fuwenfang.com/space/cons/index/id/4400"
     },
     {
     "ID":"4393",
     "Name":"刘王芳",
     "Dept":"全公司",
     "Avatar":"http://test.staticoss.upesn.com/1/4339/201505/29/1432867053YB20.jpg.thumb.jpg",
     "Url":"http://esn.fuwenfang.com/space/cons/index/id/4339"
     },
     {
     "ID":"4213",
     "Name":"aa",
     "Dept":"考勤测试部门",
     "Avatar":"http://esn.fuwenfang.com/front/images/scrm/default_avatar.png",
     "Url":"http://esn.fuwenfang.com/space/cons/index/id/4214"
     },
     {
     "ID":"41432",
     "Name":"aa",
     "Dept":"考勤测试部门",
     "Avatar":"http://esn.fuwenfang.com/front/images/scrm/default_avatar.png",
     "Url":"http://esn.fuwenfang.com/space/cons/index/id/4194"
     },
     {
     "ID":"1114185532",
     "Name":"张笑颜15",
     "Dept":"全公司",
     "Avatar":"http://esn.fuwenfang.com/front/images/scrm/default_avatar.png",
     "Url":"http://esn.fuwenfang.com/space/cons/index/id/4182"
     },
     {
     "ID":"11141432",
     "Name":"aa",
     "Dept":"考勤测试部门",
     "Avatar":"http://esn.fuwenfang.com/front/images/scrm/default_avatar.png",
     "Url":"http://esn.fuwenfang.com/space/cons/index/id/4194"
     },
     {
     "ID":"11141832",
     "Name":"张笑颜15",
     "Dept":"全公司",
     "Avatar":"http://esn.fuwenfang.com/front/images/scrm/default_avatar.png",
     "Url":"http://esn.fuwenfang.com/space/cons/index/id/4182"
     },
     {
     "ID":"1141932",
     "Name":"11",
     "Dept":"全公司",
     "Avatar":"http://esn.fuwenfang.com/front/images/scrm/default_avatar.png",
     "Url":"http://esn.fuwenfang.com/space/cons/index/id/4139"
     },
     {
     "ID":"11141432",
     "Name":"aa",
     "Dept":"考勤测试部门",
     "Avatar":"http://esn.fuwenfang.com/front/images/scrm/default_avatar.png",
     "Url":"http://esn.fuwenfang.com/space/cons/index/id/4194"
     },
     {
     "ID":"11141832",
     "Name":"张笑颜15",
     "Dept":"全公司",
     "Avatar":"http://esn.fuwenfang.com/front/images/scrm/default_avatar.png",
     "Url":"http://esn.fuwenfang.com/space/cons/index/id/4182"
     },
     {
     "ID":"1141932",
     "Name":"11",
     "Dept":"全公司",
     "Avatar":"http://esn.fuwenfang.com/front/images/scrm/default_avatar.png",
     "Url":"http://esn.fuwenfang.com/space/cons/index/id/4139"
     }
     ]}*/


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
            method: 'post',
            data: params.data,
            type: 'json',
            success: (data) => {
                if (data.rs) {
                    dispatch(_getNextPagePeopleData(COMPONENTS_GETNEXTPEOPLEDATA_SUCCESS, data.data.users))
                }
            }
        });


    }

    //fakeData pageOne
    /* const data  = {"rs":true,"data":{"total":192,"pages":20,"currentPage":1,"pageRow":10,"users":
     [
     {
     "ID":"1462",
     "Name":"搜索内容",
     "Dept":"全公司",
     "Avatar":"http://test.staticoss.upesn.com/1/14623/201512/3/1449111464vXTV.jpg.thumb.jpg",
     "Url":"http://esn.fuwenfang.com/space/cons/index/id/14623"
     },
     {
     "ID":"450",
     "Name":"曹海龙",
     "Dept":"全公司",
     "Avatar":"http://test.staticoss.upesn.com/1/4507/201601/18/1453080583VG6s.jpg.thumb.jpg",
     "Url":"http://esn.fuwenfang.com/space/cons/index/id/4507"
     },
     {
     "ID":"448",
     "Name":"123456",
     "Dept":"研发部",
     "Avatar":"http://test.staticoss.upesn.com/1/4488/201508/17/1439801185r4SR.jpg.thumb.jpg",
     "Url":"http://esn.fuwenfang.com/space/cons/index/id/4488"
     },
     {
     "ID":"445557",
     "Name":"123222",
     "Dept":"研发部",
     "Avatar":"http://esn.fuwenfang.com/front/images/scrm/default_avatar.png",
     "Url":"http://esn.fuwenfang.com/space/cons/index/id/4487"
     },
     {
     "ID":"447",
     "Name":"刘王芳",
     "Dept":"全公司",
     "Avatar":"http://esn.fuwenfang.com/front/images/scrm/default_avatar.png",
     "Url":"http://esn.fuwenfang.com/space/cons/index/id/4472"
     },
     {
     "ID":"405550",
     "Name":"测试3",
     "Dept":"全公司",
     "Avatar":"http://esn.fuwenfang.com/front/images/scrm/default_avatar.png",
     "Url":"http://esn.fuwenfang.com/space/cons/index/id/4400"
     },
     {
     "ID":"439",
     "Name":"刘王芳",
     "Dept":"全公司",
     "Avatar":"http://test.staticoss.upesn.com/1/4339/201505/29/1432867053YB20.jpg.thumb.jpg",
     "Url":"http://esn.fuwenfang.com/space/cons/index/id/4339"
     },
     {
     "ID":"421",
     "Name":"aa",
     "Dept":"考勤测试部门",
     "Avatar":"http://esn.fuwenfang.com/front/images/scrm/default_avatar.png",
     "Url":"http://esn.fuwenfang.com/space/cons/index/id/4214"
     },
     {
     "ID":"414",
     "Name":"aa",
     "Dept":"考勤测试部门",
     "Avatar":"http://esn.fuwenfang.com/front/images/scrm/default_avatar.png",
     "Url":"http://esn.fuwenfang.com/space/cons/index/id/4194"
     },
     {
     "ID":"11141855",
     "Name":"张笑颜15",
     "Dept":"全公司",
     "Avatar":"http://esn.fuwenfang.com/front/images/scrm/default_avatar.png",
     "Url":"http://esn.fuwenfang.com/space/cons/index/id/4182"
     },
     {
     "ID":"111414",
     "Name":"aa",
     "Dept":"考勤测试部门",
     "Avatar":"http://esn.fuwenfang.com/front/images/scrm/default_avatar.png",
     "Url":"http://esn.fuwenfang.com/space/cons/index/id/4194"
     },
     {
     "ID":"111418",
     "Name":"张笑颜15",
     "Dept":"全公司",
     "Avatar":"http://esn.fuwenfang.com/front/images/scrm/default_avatar.png",
     "Url":"http://esn.fuwenfang.com/space/cons/index/id/4182"
     },
     {
     "ID":"11419",
     "Name":"11",
     "Dept":"全公司",
     "Avatar":"http://esn.fuwenfang.com/front/images/scrm/default_avatar.png",
     "Url":"http://esn.fuwenfang.com/space/cons/index/id/4139"
     },
     {
     "ID":"4055503",
     "Name":"测试3",
     "Dept":"全公司",
     "Avatar":"http://esn.fuwenfang.com/front/images/scrm/default_avatar.png",
     "Url":"http://esn.fuwenfang.com/space/cons/index/id/4400"
     },
     {
     "ID":"4393",
     "Name":"刘王芳",
     "Dept":"全公司",
     "Avatar":"http://test.staticoss.upesn.com/1/4339/201505/29/1432867053YB20.jpg.thumb.jpg",
     "Url":"http://esn.fuwenfang.com/space/cons/index/id/4339"
     },
     {
     "ID":"4213",
     "Name":"aa",
     "Dept":"考勤测试部门",
     "Avatar":"http://esn.fuwenfang.com/front/images/scrm/default_avatar.png",
     "Url":"http://esn.fuwenfang.com/space/cons/index/id/4214"
     },
     {
     "ID":"41432",
     "Name":"aa",
     "Dept":"考勤测试部门",
     "Avatar":"http://esn.fuwenfang.com/front/images/scrm/default_avatar.png",
     "Url":"http://esn.fuwenfang.com/space/cons/index/id/4194"
     },
     {
     "ID":"1114185532",
     "Name":"张笑颜15",
     "Dept":"全公司",
     "Avatar":"http://esn.fuwenfang.com/front/images/scrm/default_avatar.png",
     "Url":"http://esn.fuwenfang.com/space/cons/index/id/4182"
     },
     {
     "ID":"11141432",
     "Name":"aa",
     "Dept":"考勤测试部门",
     "Avatar":"http://esn.fuwenfang.com/front/images/scrm/default_avatar.png",
     "Url":"http://esn.fuwenfang.com/space/cons/index/id/4194"
     },
     {
     "ID":"11141832",
     "Name":"张笑颜15",
     "Dept":"全公司",
     "Avatar":"http://esn.fuwenfang.com/front/images/scrm/default_avatar.png",
     "Url":"http://esn.fuwenfang.com/space/cons/index/id/4182"
     },
     {
     "ID":"1141932",
     "Name":"11",
     "Dept":"全公司",
     "Avatar":"http://esn.fuwenfang.com/front/images/scrm/default_avatar.png",
     "Url":"http://esn.fuwenfang.com/space/cons/index/id/4139"
     },
     {
     "ID":"11141432",
     "Name":"aa",
     "Dept":"考勤测试部门",
     "Avatar":"http://esn.fuwenfang.com/front/images/scrm/default_avatar.png",
     "Url":"http://esn.fuwenfang.com/space/cons/index/id/4194"
     },
     {
     "ID":"11141832",
     "Name":"张笑颜15",
     "Dept":"全公司",
     "Avatar":"http://esn.fuwenfang.com/front/images/scrm/default_avatar.png",
     "Url":"http://esn.fuwenfang.com/space/cons/index/id/4182"
     },
     {
     "ID":"1141932",
     "Name":"11",
     "Dept":"全公司",
     "Avatar":"http://esn.fuwenfang.com/front/images/scrm/default_avatar.png",
     "Url":"http://esn.fuwenfang.com/space/cons/index/id/4139"
     }
     ]}*/

}


export {
    COMPONENTS_CHANGE_ISMUTISELECT,
    COMPONENTS_CHANGE_ISSHOWMODAL,
    COMPONENTS_GETPEOPLEDATA,
    COMPONENTS_GETPEOPLEDATA_SUCCESS,
    COMPONENTS_GETNEXTPEOPLEDATA,
    COMPONENTS_GETNEXTPEOPLEDATA_SUCCESS,
} 