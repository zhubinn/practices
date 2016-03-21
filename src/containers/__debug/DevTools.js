/**
 * Created by c on 16/3/21.
 */
import { connect } from 'react-redux'
import { createDevTools } from 'redux-devtools'
import LogMonitor from 'redux-devtools-log-monitor'
import DockMonitor from 'redux-devtools-dock-monitor'

const monitorState = {
    position: "left",
    size: 16,
    isVisible: false
}

class DevTools extends React.Component {
    render() {
        return (
            <DockMonitor toggleVisibilityKey="ctrl-h"
                         changePositionKey="ctrl-w"
                         monitorState={monitorState}>
                <LogMonitor/>
            </DockMonitor>
        )
    }
}

export default connect()(DevTools)