/**
 * Created by yangtm on 16-3-11.
 */
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import Pagination from 'components/__demo/pagination/index'
import { pageChangeAction } from 'actions/__demo/DemoPagination'

class DemoPagination extends React.Component {
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

    	const {  $$mapState } = this.props

        const pagination =  $$mapState.get('pagination')
        let current = pagination.get("current")
        let total = pagination.get("total")
        let pageSize = pagination.get("pageSize")

        return (
            <div>
                <Pagination current = { current } total = { total } pageSize={ pageSize } pageChangeFn = {pageChangeFn} model = {false}/>
            </div>
        )
    }
}


const mapStateToProps = (state, ownProps) => {
    return {
        $$mapState: state.__demo.DemoPagination
    }
}

export default connect (mapStateToProps, {
    pageChangeAction,
}) (DemoPagination)