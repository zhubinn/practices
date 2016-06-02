/**
 * Created by janeluck on 6/2/16.
 */
import reqwest from 'reqwest'

reqwest.ajaxSetup({
    headers: {
        // 后端约定, 用以辨别是否为ajax请求的字段
        'X-Requested-With': 'XMLHttpRequest'
    }
})

export default reqwest