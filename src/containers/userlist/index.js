/**
 * Created by chenhf on 16-3-11.
 */
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import Pagination from 'components/pagination/index'
import { pageChangeAction } from 'actions/userlist/index'

class Userlist extends React.Component {
	constructor(){
        super()
        this.pageChangeFn = this.pageChangeFn.bind(this)
    }
    pageChangeFn (pageIndex, pageSize){
        const { pageChangeAction } = this.props
        pageChangeAction(pageIndex, pageSize)
    }
    render() {
    	const { pageChangeFn } = this
    	const { userlistdata } = this.props

        const pagination = userlistdata.get('pagination')
        let current = pagination.get("current")
        let total = pagination.get("total")
        let pageSize = pagination.get("pageSize")

        //alert(pageSize)

        return (
            <div>
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
    pageChangeAction
})(Userlist)