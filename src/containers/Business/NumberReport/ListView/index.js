import React, { Component, PropTypes } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import fetch from 'isomorphic-fetch'
import { findDOMNode } from 'react-dom'
import reqwest from 'reqwest'
import { message, notification } from 'antd'

import * as NumberReportViewActions from 'actions/business/numberReport/ListView'

import InfoPath from './InfoPath'
import InputDater from './InputDater'
import TableList from './TableList'

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


class NumberReportViewPage extends Component {


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

        const obj = {
            nptype:document.querySelector('#npType').value,
            templateid:document.querySelector('#templateId').value,
        }
        //TODO 异步請求

        reqwest({
            url: SCRM.url('/scrmnumreport/index/listAjax'),
            method: 'post',
            data:{
                templateID:obj.templateid,
                date:myDate.getFullYear() +'-'+ this.fillZero(myDate.getMonth()+1) +'-'+ this.fillZero(myDate.getDate()),
                dateType:obj.nptype
            },
            type: 'json',
            error: function (result) {
                message.error(result.error)
            },
            success: (result) => {
                if (result.rs === true) {
                    actions.fetchData(true, result.data)
                } else {
                    message.error('服务器错误，请联系客服')
                }
            }
        })
        
    }

    importExcel(){
        const { numberReportViewState  } = this.props
        const date = new Date()
        const curDay = date.getFullYear() + '-' + (date.getMonth()+1) + '-' + date.getDate()
        const dater = numberReportViewState.toJS().dater

        const obj = {
            nptype:document.querySelector('#npType').value,
            templateid:document.querySelector('#templateId').value,
        }
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





NumberReportViewPage.propTypes = {
    numberReportViewState: PropTypes.object.isRequired,
    actions: PropTypes.object.isRequired
}

function mapStateToProps(state) {
    return {
        numberReportViewState: state.business.numberReportViewState //所有的业务页面state，都在state.business下
    }
}



function mapDispatchToProps(dispatch) {

    return {
        actions: bindActionCreators(NumberReportViewActions, dispatch)
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(NumberReportViewPage)