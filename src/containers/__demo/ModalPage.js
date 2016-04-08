/**
 * Created by c on 16/3/21.
 */
import { connect } from 'react-redux'
import 'ucjs_modules/layer/2.2.0/skin/layer.css'
import layer from 'ucjs_modules/layer/2.2.0/layer.js'

//docs
//https://github.com/sentsin/layer
class ModalPage extends React.Component {
    render() {
        return (
            <div>
                <a onClick={ x=>layer.alert('内容') } href="javascript:;">初体验</a>
            </div>
        )
    }
}

export default connect()(ModalPage)