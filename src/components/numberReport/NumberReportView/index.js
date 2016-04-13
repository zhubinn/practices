import { findDOMNode } from 'react-dom'

import 'ucjs_modules/layer/2.2.0/skin/layer.css'
import layer from '../../../../ucjs_modules/layer/2.2.0/layer.js'

import InfoPath from './infoPath'
import InputDater from './inputDater'
import DaterButton from './daterButton'
import TableList from './tableList'
//less
import './less/basic_new_v2.less'
import './less/numberReport.less'

export default class NumberReportView extends React.Component {
    constructor(props, context) {
        super(props, context)

    }


    render() {
        const { numberReportViewState ,actions } = this.props
        return (
            <div>
                <div className="col_right">
                    <div className="ck-numberReport">
                        <div className="ck-numberReport-top">
                            <InfoPath />
                            <div className="ck-numberReport-Function clearfix">
                                <button className="ck-Function-btnreturn">返回</button>

                                <InputDater actions = { actions } numberReportViewState = { numberReportViewState } />
                                <DaterButton />
                                <button className="ck-Function-Export">导出EXCEL</button>

                            </div>
                        </div>
                        <TableList numberReportViewState = { numberReportViewState } />
                    </div>
                </div>
            </div>
        )
    }
}
