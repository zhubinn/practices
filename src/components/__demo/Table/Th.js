/**
 * Created by chenhf on 16-3-23.
 */
export default class Th extends React.Component {
    getKey() {
        return this.props.key
    }

    render() {
        const {
            key,
            text,
            style,
            ...other,
            } = this.props

        return (
            <th style={Object.assign({}, style)} {...other}>
                {text || this.props.children}
            </th>
        )
    }
}