import fetch from 'isomorphic-fetch'
import { findDOMNode } from 'react-dom'

import { message, notification } from 'antd'


import InfoPath from './infoPath'
import InputDater from './inputDater'
import DaterButton from './daterButton'
import TableList from './tableList'
//less
import './less/basic_new_v2.less'
import './less/numberReport.less'
// mock data
//import { data,data2 } from './data/response'

const openNotification = function () {
    const args = {
        message: '错误信息',
        description: '服务器错误，请联系客服',
        duration: 0
    };
    notification.open(args);
};

export default class NumberReportView extends React.Component {
    constructor(props, context) {
        super(props, context)

    }


    componentWillMount(){
        const { numberReportViewState ,actions } = this.props
    }

    fillZero(v){
        return v < 10 ? '0'+v : v;
    }

    componentDidMount(){
        const { numberReportViewState ,actions } = this.props
        const myDate = new Date()
        //TODO 异步請求
        const obj = $('#viewNumList').data()

        $.post(SCRM.url('/scrmnumreport/index/listAjax'), {
            templateID:obj.templateid || 18,
            date:myDate.getFullYear() +'-'+ this.fillZero(myDate.getMonth()+1) +'-'+ this.fillZero(myDate.getDate()),
            dateType:obj.nptype
        },function(data){
            if(data.rs === true){
                actions.fetchData(true,data.data);
            }else{
                openNotification()
            }
        },'json');

        /*fetch(SCRM.url('/scrmnumreport/index/listAjax'), {
            method: 'post',
            headers: {
                'API': 1,
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: pram
        }).then(function(json) {
            console.log(json)
        })*/



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
                                <InputDater
                                    actions = { actions }
                                    numberReportViewState = { numberReportViewState }
                                />
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
