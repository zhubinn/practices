import { isPlainObject, isFunction, isString } from 'lodash'
import warning from 'fbjs/lib/warning'


class DivTab extends React.Component{
	constructor(props) {
        super(props)

    }
    handleTabClick(i){
    	const {selectedTabIndex} = this.props;
    	selectedTabIndex({'currentTabIndex':i})
    }
	render(){
		const divTabArr = [{name:'编辑字段'},{name:'运行中'}];
		const currentTabIndex = this.props.mapState.toJS().currentTabIndex;
		return (
			<ul className = "divTab clearfix">
                {
                    divTabArr.map((item, i) => {
                        return (
                            <li key={i} onClick = {this.handleTabClick.bind(this,i)}
                            className = {currentTabIndex==i?"current":""}
                            >{item.name}</li>
                        )
                    })
                }

			</ul>
		)
	}
}

export default DivTab