import { isPlainObject, isFunction, isString } from 'lodash'
import warning from 'fbjs/lib/warning'
import DivEdit from './DivEdit'


class DivList extends React.Component{
	constructor(props) {
        super(props)
        this.handleCheckbox = this.handleCheckbox.bind(this)
    }
    componentDidMount(prevProps, prevState) {
   }
    handleCheckbox(){
        const selectedRow = this.props.mapState.toJS().selectedRow;
        const {changeIsRequired}=this.props;
        selectedRow['col_IsRequired']=='是'?changeIsRequired({'col_IsRequired':'否'}):changeIsRequired({'col_IsRequired':'是'})
    }
    componentWillUpdate() {
        const currentTabIndex = this.props.mapState.toJS().currentTabIndex;
        const selectedRow = this.props.mapState.toJS().selectedRow;
        if(currentTabIndex==0){
            const {mapState,addItem,deletItem,changeInputValue,ChangeStatus} = this.props;

            return (
                <div>
                    <ul className = "editColumnInfor">
                        <li>字段名称:{selectedRow["col_name"]}</li>
                        <li>字段类型:{selectedRow["col_type"]}</li>
                        <li>是否必填：<input type = "checkbox" ref="checkboxInput" 
                        defaultChecked={selectedRow['col_IsRequired']=='是'?'checked':''} onChange = {this.handleCheckbox}/></li>
                    </ul>
                    <DivEdit addItem={addItem} mapState={mapState} deletItem={deletItem} changeInputValue={changeInputValue} ChangeStatus={ChangeStatus}></DivEdit>
                    <div></div>
                </div>
            )
        }else if(currentTabIndex==1){
             const {mapState} = this.props;
             const editColumnsOptions = this.props.mapState.toJS().editColumnsOptions

            return(
                <div>
                    <ul className = "editColumnInfor">
                        <li>字段名称:{selectedRow["col_name"]}</li>
                        <li>字段类型:{selectedRow["col_type"]}</li>
                        <li>是否必填:{selectedRow["col_IsRequired"]}</li>
                    </ul>
                    <div>
                        <ul className = "editColumnsHead">
                            <li className = "optionInfor">选项信息</li>
                            <li className="status">状态</li>
                        </ul>
                        <ul className = "editColumnsCon">
                            {
                                editColumnsOptions.map((opt,i)=>{
                                    if(opt.optionInfor){
                                    return (
                                        <li key = {i}>
                                            <div className = "optionInforInput">{opt.optionInfor}</div>
                                            <div className = "statusSelect">{opt.status}</div>
                                        </li>
                                        )
                                    }
                                })
                            }
                        </ul>
                    </div>
                </div>
            )

        }
    }

	render(){
        return (
            <div>{this.componentWillUpdate()}</div>
        )
	}
}

export default DivList