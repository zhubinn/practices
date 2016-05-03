import { isPlainObject, isFunction, isString } from 'lodash'
import warning from 'fbjs/lib/warning'
import { Tabs } from 'antd';

import TabListEdit  from './TabListEdit'
import TabListRun  from './TabListRun'

const TabPane = Tabs.TabPane;

class DivTab extends React.Component{
	constructor(props) {
        super(props)

    }
    handleTabClick(key){
         //console.log(key)
    }
	render(){
		return (
            <div className = "ck-customize-bannerTit">
                <Tabs onChange={this.handleTabClick.bind(this)} type="card">
                    <TabPane tab="编辑字段" key="1">
                        <TabListEdit    
                            $$mapState={this.props.$$mapState} 
                            changeIsRequired = {this.props.changeIsRequired} 
                            addItem={this.props.addItem} 
                            deletItem={this.props.deletItem} 
                            changeInputValue={this.props.changeInputValue} 
                            ChangeStatus={this.props.ChangeStatus}
                            DownItem = {this.props.DownItem} 
                            UpItem={this.props.UpItem} 
                            clickapplyBtn={this.props.clickapplyBtn} 
                            clickCancleBtn={this.props.clickCancleBtn}
                            getTableData= {this.props.getTableData}
                        />
                    </TabPane>
                    <TabPane tab="运行中" key="2">
                        <TabListRun      
                            $$mapState = {this.props.$$mapState}
                        />
                    </TabPane>
                </Tabs>
            </div>

		)
	}
}

export default DivTab