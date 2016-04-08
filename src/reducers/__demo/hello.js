/**
 * Created by chenhf on 16-3-16.
 */
import Immutable from 'immutable'
import { INPUT_ONCHANGE,ONCLICK_HELLO,ADDITEMS_HELLO,DELETE_HELLO,SEARCH_HELLO } from 'actions/__demo/hello'

// reducer 根据传入的state和当前的action 返回新的state.

const hello = (state = Immutable.Map(), action) => {

    switch (action.type) {
        case INPUT_ONCHANGE:
            return state.merge(action.payload);
        case ONCLICK_HELLO:
            return state.merge(action.payload);
        case ADDITEMS_HELLO:
            return state.merge(action.addItem);
        case DELETE_HELLO:
            let t = state.toJS().items;
            t.splice(action.id, 1);
            return state.merge({"items": t});
        case SEARCH_HELLO:
            //debugger;
            const imState = Immutable.fromJS(state.toJS());
            let items = imState.toJS().items;
            let searchlist = items.filter((item) => {
                let reg = new RegExp(action.searchtext.searchtext)
                return reg.test(item.text);
            } )
            //debugger
            console.log(searchlist)
            return state.merge({"items":searchlist});

        default:
            return state
    }
}

// 当前应用的state(todos列表和选中的过滤器)
//let previousState = {
//    visibleTodoFilter:'SHOW_ALL',
//    todos:[
//        {
//            text:'Read the docs',
//            complete:false
//        }
//    ]
//
//};
//将要执行的action（添加一个todo）
//let action = {
//    type:'ADD_TODO',
//    text:'Understand the flow.'
//};
// render 返回处理后的应用状态
//let nextState = todoApp(previousState,action);
//注意reducer是纯函数 ,它仅仅用于计算下一个state。他应该是完全可预测的：多次传入相同的输入必须产生相同的输出。
// const todos = (state=[],action)=>{
//     //省略逻辑处理...
//     return nextState;
// };
//const visibleTodoFilter=(state='SHOW_ALL',action)=>{
//    //省略处理逻辑..
//    return newState;
//};
//
//let todoApp = combineReducers({
//    todos,
//    visibleTodoFilter
//});
// action触发后，通知reducer更新视图。  action fn()-->actions---> reducers
//事件触发后，有一个action(比如鼠标触发点击事件后，会从当前组件的this.props中得到，一个action方法),action方法执行，
// 会返回一个包含action type的对象，然后通知 reducer根据type的类型去处理state，
// 返回新的state.当state变化的时候视图也随之自动变化。
export default hello