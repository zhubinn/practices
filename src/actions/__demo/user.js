/**
 * Created by chenhf on 16-3-15.
 */
import fetch from 'isomorphic-fetch'
import { routerMiddleware, push } from 'react-router-redux'

// 用户登陆
const CK_USER_LOGIN = 'CK_USER_LOGIN'
// 用户登陆成功
const CK_USER_LOGIN_SUCCESS = 'CK_USER_LOGIN_SUCCESS'
// 用户登陆失败
const CK_USER_LOGIN_FAILURE = 'CK_USER_LOGIN_FAILURE'
// 注册新用户
const CK_USER_REG = 'CK_USER_REG'

/**
 * 用户登陆
 * @param username
 * @param password
 * @param remember
 * @returns {Function}
 */
const userLogin = (username, password, remember = false)=> {
    const login = (type, data)=> {
        return {
            type,
            payload: data
        }
    }

    return (dispatch, getState) => {
        console.log(getState())
        dispatch(login(CK_USER_LOGIN))
        fetch('http://localhost:8082/data.json', {
            method: 'post',
            headers: {
                'API': 1,
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                username,
                password
            })
        }).then(function(response) {
            if (response.status >= 400) {
                throw new Error("Bad response from server")
            }
            return response.json()
        }).then(function(json) {
            document.cookie = 'user=' + json.username
            dispatch(login(CK_USER_LOGIN_SUCCESS, json))
            dispatch(push('/foo'))
        })
        //.send({ username, password })
        //.set('Accept', 'application/json')
        //.end((err, res)=> {
        //    if (err) {
        //        dispatch(login(CK_USER_LOGIN_FAILURE))
        //    }
        //    dispatch(login(CK_USER_LOGIN_SUCCESS, res))
        //})
    }
}

const userReg = ()=> {
    const reg = ()=> {
        return {
            type: CK_USER_REG,
            payload: ''
        }
    }
    const url = ''
    return (dispatch, getState)=> {
        /*request.post (url, (error, response, body)=> {
         if (error) {
         }
         debugger
         })*/
    }
}

export {
    CK_USER_LOGIN,
    CK_USER_LOGIN_SUCCESS,
    CK_USER_LOGIN_FAILURE,
    CK_USER_REG,

    userLogin,
    userReg
}