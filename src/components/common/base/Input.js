/**
 * Created by c on 16/3/21.
 */
export default class Input extends React.Component {
    render() {
        const {
            style,
            ...other
            } = this.props
        return <input {...other} style={Object.assign({}, style)}/>
    }
}

Input.PropTyps = {
    type: React.PropTypes.string.isRequired
}