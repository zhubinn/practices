import fetch from 'isomorphic-fetch'
import { findDOMNode } from 'react-dom'

import { message, notification } from 'antd'


import InfoPath from './infoPath'
import InputDater from './inputDater'
import DaterButton from './daterButton'
import TableList from './tableList'
//less
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

        const obj = $('#viewNumList').data()
        //TODO 异步請求
        $.post(SCRM.url('/scrmnumreport/index/listAjax'), {
            templateID:obj.templateid,
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

    importExcel(){
        const { numberReportViewState  } = this.props
        const date = new Date()
        const curDay = date.getFullYear() + '-' + (date.getMonth()+1) + '-' + date.getDate()
        const dater = numberReportViewState.toJS().dater
        const obj = $("#viewNumList").data()
        let dateTime

        switch (obj.nptype){
            case 'day':
                dateTime = dater ? dater : curDay;
                break;
            case 'month':
                dateTime = dater ? dater + '-01' : curDay;
                break;
            case 'week':
                dateTime = dater ? dater[0] : curDay;
                break;
        }

        const parm = {
            "objName":"NumReportList",
            "TplID":obj.templateid,
            "date":dateTime,
            "dateType":obj.nptype
        }

        const parmStr = JSON.stringify(parm)

        window.open(SCRM.url('/common/scrmExport/export')+'?param='+parmStr)
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
                                <button className="ck-Function-btnreturn" onClick = { () => { history.back(-1) } }>返回</button>
                                <InputDater
                                    actions = { actions }
                                    numberReportViewState = { numberReportViewState }
                                />
                                <button className="ck-Function-Export" onClick = { this.importExcel.bind(this) } >导出EXCEL</button>

                            </div>
                        </div>
                        <TableList actions = { actions } numberReportViewState = { numberReportViewState } />
                    </div>
                </div>
            </div>
        )
    }
}
