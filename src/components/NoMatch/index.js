/**
 * Created by c on 16/3/21.
 */
export default class NoMatch extends React.Component {
    render() {
        return (
            <div className="nors">
                <div className="norsSuggest">
                    <h3 className="norsTitle">很抱歉，您要访问的页面不存在！</h3>
                    <p className="norsTitle2">温馨提示：</p>
                    <ol>
                        <li>请检查您访问的网址是否正确</li>
                        <li>如果您不能确认访问的网址，请浏览<a href="//www.baidu.com/more/index.html">百度更多</a>页面查看更多网址。</li>
                        <li>回到顶部重新发起搜索</li>
                        <li>如有任何意见或建议，请及时<a href="http://qingting.baidu.com/index">反馈给我们</a>。</li>
                    </ol>
                </div>
            </div>
        )
    }
}