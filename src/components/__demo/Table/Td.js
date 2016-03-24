/**
 * Created by chenhf on 16-3-23.
 */
export default class Td extends React.Component {
    render() {
        const {
            style,
            text,
            ...other
            } = this.props

        return (
            <td {...other} style={Object.assign({}, style)}>
            {this.props.children || text}
            </td>
        )
    }
}