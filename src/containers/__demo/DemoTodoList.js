/**
 * Created by yangtm on 16-3-11.
 */
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import Custom from 'components/__demo/custom/index'
import { editItem, addItem, delItem, switchItem, isRequired, moveUpAct, moveDownAct} from 'actions/__demo/DemoTodoList'

class DemoTodoList extends React.Component {
	constructor(){
        super()
        this.customFn = this.customFn.bind(this)
        this.addItems = this.addItems.bind(this)
        this.delItems = this.delItems.bind(this)
        this.switchItems = this.switchItems.bind(this)
        this.isRequired = this.isRequired.bind(this)
        this.moveUp = this.moveUp.bind(this)
        this.moveDown = this.moveDown.bind(this)
    }
    customFn (index, val){
        const { editItem } = this.props
        editItem(index, val)
    }
    addItems (index){
        const { addItem } = this.props
        addItem(index)
    }
    delItems (index){
        const { delItem } = this.props
        delItem(index)
    }
    switchItems (index){
        const { switchItem } = this.props
        switchItem(index)
    }
    isRequired (enabled){
        const { isRequired } = this.props
        isRequired(enabled)
    }
    moveUp (index){
        const { moveUpAct } = this.props
        moveUpAct(index)
    }
    moveDown (index){
        const { moveDownAct } = this.props
        moveDownAct(index)
    }
    render() {
    	const { customFn, addItems, delItems, switchItems, isRequired, moveUp, moveDown } = this

    	const {  $$mapState } = this.props

        let custom_items =  $$mapState.get('customizable').get('items').toJS()
        let Required =  $$mapState.get('customizable').toJS().isRequired

        return (
            <div style = {{marginTop: "100px"}}>
                <Custom moveUp = {moveUp} moveDown = {moveDown}  Required = {Required} custom_items = { custom_items } isRequired = {isRequired} customFn = {customFn} addItems = {addItems} delItems={delItems} switchItems={switchItems}/>
            </div>
        )
    }
}


const mapStateToProps = (state, ownProps) => {
    return {
        $$mapState: state.__demo.DemoTodoList
    }
}

export default connect (mapStateToProps, {
    editItem,
    addItem,
    delItem,
    switchItem,
    isRequired,
    moveUpAct,
    moveDownAct,
}) (DemoTodoList)