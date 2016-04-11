/**
 * Created by yangtm on 16-3-11.
 */
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import Pagination from 'components/pagination/index'
import Custom from 'components/custom/index'
import { pageChangeAction, customizableAction, addItem, delItem } from 'actions/userlist/index'

class Userlist extends React.Component {
	constructor(){
        super()
        this.pageChangeFn = this.pageChangeFn.bind(this)
        this.customFn = this.customFn.bind(this)
        this.addItems = this.addItems.bind(this)
        this.delItems = this.delItems.bind(this)
    }
    pageChangeFn (pageIndex, pageSize){
        const { pageChangeAction } = this.props
        pageChangeAction(pageIndex, pageSize)
    }
    customFn (index, val){
        const { customizableAction } = this.props
        customizableAction(index, val)
    }
    addItems (index) {
        const { addItem } = this.props
        addItem(index)
    }
    delItems (index) {
        const { delItem } = this.props
        delItem(index)
    }
    render() {
    	const { pageChangeFn, customFn, addItems, delItems} = this

    	const { userlistdata } = this.props

        const pagination = userlistdata.get('pagination')
        let current = pagination.get("current")
        let total = pagination.get("total")
        let pageSize = pagination.get("pageSize")
        console.log(userlistdata.get('customizable').get('items'))
        let custom_items = userlistdata.get('customizable').get('items').toJS()

        return (
            <div>
            <Custom custom_items = { custom_items } customFn = {customFn} addItems = {addItems} delItems={delItems}/>
            <Pagination current = { current } total = { total } pageSize={ pageSize } pageChangeFn = {pageChangeFn} model = {false}/>
            </div>
        )
    }
}

const mapStateToProps = (state, ownProps) => {
    return {
        userlistdata: state.userlist
    }
}


export default connect(mapStateToProps, {
    pageChangeAction,
    customizableAction,
    addItem,
    delItem,
})(Userlist)