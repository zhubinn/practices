/**
 * Created by chenhf on 16-3-25.
 */
export default class Table extends React.Component {
    render() {
        const {
            key,
            text,
            format,
            style,
            ...other,
            } = this.props

        return (
            <th {...other} style={Object.assign({}, style)}>
                {text}
            </th>
        )
    }
}