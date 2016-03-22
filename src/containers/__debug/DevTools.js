/**
 * Created by c on 16/3/21.
 */
import { connect } from 'react-redux'
import { createDevTools } from 'redux-devtools'
import LogMonitor from 'redux-devtools-log-monitor'
import DockMonitor from 'redux-devtools-dock-monitor'

const DevTools = createDevTools(
    <DockMonitor toggleVisibilityKey='ctrl-h'
                 changePositionKey='ctrl-q'
                 changeMonitorKey='ctrl-m'>
        <LogMonitor/>
    </DockMonitor>
)

export default connect()(DevTools)