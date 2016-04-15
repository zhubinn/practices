import fetch from 'isomorphic-fetch'
import { findDOMNode } from 'react-dom'

//日历组件
//弹框组件
import 'ucjs_modules/layer/2.2.0/skin/layer.css'
import layer from '../../../../ucjs_modules/layer/2.2.0/layer.js'

import InfoPath from './infoPath'
import InputDater from './inputDater'
import DaterButton from './daterButton'
import TableList from './tableList'
//less
import './less/basic_new_v2.less'
import './less/numberReport.less'
// mock data
import { data,data2 } from './data/response'

import  '../../../../ucjs_modules/ReactUI/themes'
import Datetime from '../../../../ucjs_modules/ReactUI/Datetime'


export default class NumberReportView extends React.Component {
    constructor(props, context) {
        super(props, context)

    }



    componentDidMount(){
        const { numberReportViewState ,actions } = this.props
        //TODO 异步請求
        actions.fetchDate(data);
        console.log(data)
    }

    render() {
        const { numberReportViewState ,actions } = this.props

        console.log(numberReportViewState.toJS(),'=========');
        return (
            <div>
                <div className="col_right">


                    <div className="ck-numberReport">
                        <div className="ck-numberReport-top">
                            <InfoPath />
                            <div className="ck-numberReport-Function clearfix">
                                <button className="ck-Function-btnreturn">返回</button>

                                <InputDater actions = { actions } numberReportViewState = { numberReportViewState } />
                                <DaterButton actions = { actions } numberReportViewState = { numberReportViewState } />
                                <button className="ck-Function-Export">导出EXCEL</button>

                            </div>
                        </div>
                        <TableList actions = { actions } numberReportViewState = { numberReportViewState } />
                    </div>
                </div>
            </div>
        )
    }
}
