/**
 * Created by chenhf on 16-3-11.
 */
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import Pagination from 'components/pagination/index'
import { perAction, nextAction, indexAction, pageGoAction } from 'actions/userlist/index'

class Userlist extends React.Component {
	constructor(){
        super()
        this.preFn = this.preFn.bind(this)
        this.nextFn = this.nextFn.bind(this)
        this.indexFn = this.indexFn.bind(this)
        this.GOFn = this.GOFn.bind(this)
        this.pageChange = this.pageChange.bind(this)
    }
    pageChange (){
        
    }
	preFn() {
		const { perAction } = this.props
		perAction();
	}
    nextFn() {
        const { nextAction } = this.props
        nextAction();
    }
    indexFn(index) {
        const { indexAction } = this.props
        indexAction(index);
    }
    GOFn(index) {
        const { pageGoAction } = this.props
        pageGoAction(index);
    }
    render() {
    	const { preFn, nextFn, indexFn, GOFn } = this
    	const { userlistdata } = this.props
    	const pending = userlistdata.get ('pending')
        const pagination = userlistdata.get('pagination')

        const preDisabled = pagination.get('preDisabled')
        const nextDisabled = pagination.get('nextDisabled')
        const items = pagination.get('items')

// pageChange: function,
// pageIndex: number,
// pageSize: number,
// count: number,
// mode: enum,

        return (
            <div>
            {pending}
            <Pagination items={items}  preDisabled = {preDisabled} nextDisabled = {nextDisabled} GOFn={GOFn}  indexFn = {indexFn}  preFn={preFn} nextFn={nextFn}/>
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
    perAction, nextAction, indexAction, pageGoAction
})(Userlist)