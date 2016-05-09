
/**
 * Created by janeluck on 5/9/16.
 * 依赖百度地图, antd.Modal
 * @params: lng, lat 经纬度
 * @params: title 当前地图Modal的info信息
 */
import { Modal  } from 'antd'

const MapModal = function(lng, lat, title)
{


    Modal.info({
        content: (
            <div id="bdMap" style={{width: 800, height: 500, marginLeft: -34, marginTop: 20}}>
            </div>
        ),
        width: 884,
        okText: '关闭',
        title: title
    });

    // 百度地图API功能
    var msg = '';
    var map = new BMap.Map("bdMap");
    var point = new BMap.Point(lng, lat);
    var marker = new BMap.Marker(point); // 创建标注
    map.addOverlay(marker); // 将标注添加到地图中
    map.centerAndZoom(point, 12);
    var geoc = new BMap.Geocoder();
    var opts = {
        width: 200, // 信息窗口宽度
        height: 60, // 信息窗口高度

        title: "", // 信息窗口标题
        enableMessage: true, //设置允许信息窗发送短息
        message: ''
    };

    // 逆地址解析
    geoc.getLocation(point, function (result) {
        if (result) {
            //alert(result.address);
            var infoWindow = new BMap.InfoWindow("地址：" + result.address, opts);  // 创建信息窗口对象
            map.openInfoWindow(infoWindow, point); //开启信息窗口
        }
    });


    marker.addEventListener("click", function (e) {
        var pt = e.point;
        geoc.getLocation(pt, function (rs) {
            // console.log(rs);
            var addComp = rs.addressComponents;
            msg = addComp.province + addComp.city + addComp.district + ", " + addComp.street + ", " + addComp.streetNumber;
            var infoWindow = new BMap.InfoWindow(msg, opts); // 创建信息窗口对象
            map.openInfoWindow(infoWindow, point); //开启信息窗口

        });

    });


    var bottom_right_control = new BMap.ScaleControl({anchor: BMAP_ANCHOR_BOTTOM_RIGHT});// 添加比例尺
    var bottom_right_navigation = new BMap.NavigationControl({anchor: BMAP_ANCHOR_BOTTOM_RIGHT});  // 添加默认缩放平移控件
    /*缩放控件type有四种类型:
     BMAP_NAVIGATION_CONTROL_SMALL：仅包含平移和缩放按钮；BMAP_NAVIGATION_CONTROL_PAN:仅包含平移按钮；BMAP_NAVIGATION_CONTROL_ZOOM：仅包含缩放按钮*/

    //添加控件和比例尺

    map.addControl(bottom_right_control);
    map.addControl(bottom_right_navigation);

}
export  default MapModal