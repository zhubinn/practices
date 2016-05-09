/**
 * Created by c on 16/3/21.
 */
export default class Script extends React.Component {
    render() {
        return null
    }

    componentDidMount() {
        const { src } = this.props

        const mapScriptTag = document.createElement('script')
        mapScriptTag.setAttribute('src', src)
        mapScriptTag.setAttribute('async', true)
        top.window.document.body.appendChild(mapScriptTag)
    }
}

Script.PropTyps = {
    src: React.PropTypes.string.isRequired
}