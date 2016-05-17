//                            _ooOoo_
//                           o8888888o
//                          88"  .  "88
//                          (|  -_-  |)
//                           O\  =  /O
//                        ____/`---'\____
//                      .   ' \\| |// `.
//                       / \\||| : |||// \
//                     / _||||| -:- |||||- \
//                       | | \\\ - /// | |
//                     | \_| ''\---/'' | |
//                      \ .-\__ `-` ___/-. /
//                   ___`. .' /--.--\ `. . __
//                ."" '< `.___\_<|>_/___.' >'"".
//               | | : `- \`.;`\ _ /`;.`/ - ` : | |
//                 \ \ `-. \_ __\ /__ _/ .-` / /
//         ======`-.____`-.___\_____/___.-`____.-'======
//                            `=---='
//
//         .............................................
//                  佛祖保佑             永无BUG
import "es6-promise"
import { browserHistory } from 'react-router'
import { syncHistoryWithStore } from 'react-router-redux'

import configureStore from 'store/configureStore'
import RootElement from 'containers'

const store = configureStore()
const history = syncHistoryWithStore(browserHistory, store)

ReactDOM.render(
    <RootElement store={store} history={history}/>,
    document.getElementById('root')
)
