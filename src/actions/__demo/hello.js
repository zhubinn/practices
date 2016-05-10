/**
 * Created by chenhf on 16-3-15.
 */
import fetch from 'isomorphic-fetch'
import { routerMiddleware, push } from 'react-router-redux'

const HELLO_MSG = 'HELLO_MSG';
const ADD_HELLO_MSG = 'ADD_HELLO_MSG';
const INPUT_ONCHANGE = 'INPUT_ONCHANGE';
const ONCLICK_HELLO = 'ONCLICK_HELLO';
const ADDITEMS_HELLO = 'ADDITEMS_HELLO';
const DELETE_HELLO = 'DELETE_HELLO';
const ITEMS_ARRAY = [];
const SEARCH_HELLO = 'SEARCH_HELLO'



/*export function inputChange(text,id) {
    return { type: INPUT_CHANGE_FIELD, text ,id }
}*/

const sayHello = ({"value":inputText})=> {
    const _sayHello = (type,data)=> {
        return {
            type: type,
            payload: data
        }
    }
    return (dispatch, getState)=> {
        dispatch(_sayHello(INPUT_ONCHANGE,{"value":inputText}));
    }
}

const clickHello = ({'msg':inputText})=>{

    const _clickHello = (type,data)=>{
        //这一部分是 reducer中action可以接收到的对象
        return {
            type:type,
            payload:data
        }
    }

    return (dispatch,getState)=>{
        //dispatch(_clickHello(ONCLICK_HELLO,{'msg':inputText}));
        dispatch(
            ()=>{
                //这一部分是 reducer中action可以接收到的对象
                return {
                    type:ONCLICK_HELLO,
                    payload:{inputText}
                }
            }
        )
    }
}


const addHello = (text)=>{

    const _addHello = (type,text)=>{
        // data {'items':ITEMS_ARRAY}
        //if(data.text) ITEMS_ARRAY.push(data);
        return {
            type:type,
            text

        }
    }

    return (dispatch,getState)=>{
        dispatch(_addHello(ADDITEMS_HELLO,text))

    }
}

const deleteHello = (id)=>{

    const _deleteHello = (type,id)=>{
        //这一部分是 reducer中action可以接收到的对象
        if(ITEMS_ARRAY.length) ITEMS_ARRAY.splice(id,1)
        return {
            type:type,
            id
        }
    }

    return (dispatch,getState)=>{
        dispatch(_deleteHello(DELETE_HELLO,id))
    }
}

const searchHello = (value)=>{

    const _searchHello = (type,value)=>{
        return {
            type:type,
            value
        }
    }

    return (dispatch,getState)=>{
        dispatch(_searchHello(SEARCH_HELLO,value))
    }
}

export {
    HELLO_MSG,
    ADD_HELLO_MSG,
    INPUT_ONCHANGE,
    ONCLICK_HELLO,
    ADDITEMS_HELLO,
    ITEMS_ARRAY,
    DELETE_HELLO,
    SEARCH_HELLO,
    sayHello,
    clickHello,
    addHello,
    deleteHello,
    searchHello
}