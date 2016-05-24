import { isPlainObject, isFunction, isString } from 'lodash'
import warning from 'fbjs/lib/warning'
import {message } from 'antd';


class TabListRun extends React.Component{
	constructor(props) {
        super(props)
    }

	render(){
             const {$$mapState} = this.props;
             let servereditColumnsOptions = this.props.$$mapState.toJS().servereditColumnsOptions
            const serverSelectedRow = this.props.$$mapState.toJS().serverSelectedRow
            /*只展示从后台拿到的启用状态的选项*/
             let showColumnsOptions = []

             //先把符合条件的选项信息筛选出来（启用与未被删除）
             servereditColumnsOptions.map((r, i) => {
                    if (r.IsStop ==0 && r.IsDeleted == 0) {
                        return showColumnsOptions.push(r)
                    }
            })
             console.log(showColumnsOptions)
             //如果

             if(showColumnsOptions.length ==0 ||
                (showColumnsOptions.length ==1 && showColumnsOptions[0].Val == '')){
                showColumnsOptions = [{Val:'请选择',IsStop:0}]
             }

        return (
                <div className = "ck-customize-CntMian">
                    <ul className = "ck-customize-Txt01 clearfix">
                        <li>字段名称：{serverSelectedRow["Label"]}</li>
                        <li>字段类型：{serverSelectedRow["AttrType"]==13?'单选':''}</li>
                        <li>是否必填：{serverSelectedRow["IsMust"]=='1'?"必填":"不必填"}</li>
                    </ul>
                    <div className = "ck-customize-gongn02">
                        <ul className = "ck-customize-gongn02Tit clearfix">
                            <li className = "ck-customize02Options">选项信息</li>
                            <li className="ck-customize02Zt">状态</li>
                        </ul>
                        <div className = "ck-customize-gongn02cntWrap">
                            <ul className = "ck-customize-gongn02cnt clearfix">
                                {
                                    showColumnsOptions.map((opt,i)=>{
                                        if(opt.Val){
                                        return (
                                            <li key = {i}>
                                                <div className = "ck-gongn02cnt-first">{opt.Val}</div>
                                                <div className = "ck-gongn02cnt-third">{opt.IsStop==1?'停用':'启用'}</div>
                                            </li>
                                            )
                                        }
                                    })
                                }
                            </ul>
                        </div>
                    </div>
                </div>
        )
	}
}

export default TabListRun