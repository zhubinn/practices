/**
 * Created by chenhf on 16-3-23.
 */
export default class Tr extends React.Component {
    render() {
        const {
            style,
            data,
            ...other
            } = this.props

        return (
            <tr style={Object.assign({}, style)}>
                {this.props.children}
            </tr>
        )
    }
}
