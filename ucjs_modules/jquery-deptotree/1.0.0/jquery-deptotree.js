;(function($, window, document,undefined) {
    /*
     说明：
     */
    //定义Depto的构造函数
    var Depto = function(ele, opt) {
        this.$element = ele,
            this.defaults = {
                allowStop: 1,  // 默认只取没有停用的部门, 0为取全部状态部门
                type: 1,  // 类型1 会员 2部门
                maxNum:0, // 最大数量
                isMultiple:1, // 是否多选
                deptid: 0,  // 部门ID ，默认为0 全部
                headImg: '/images/scrm/default_avatar.png', // 默认头像, defaultHeadImgUrl ./images/default_avatar.jpg.thumb.jpg
                requestUrl: [], // 请求接口路径路径，可填写1-3个数组元素，如:['url-1','url-2','url-3'],依次对应为部门列表、员工列表、搜索会员列表
                beforeSuccess:$.noop(),// 确认提交回调函数
                success:$.noop()// 确认提交回调函数
            },
            this.options = $.extend({}, this.defaults, opt),
            this.oA = [],   // 选择结果数据容器
            this.op = null,   // 请求数据容器

            // zTree参数配置
            /*this.check = (this.options.type==2)?{ enable: true, autoCheckTrigger: true,chkboxType: { "Y": "s", "N": "s" }}:'',*/

            this.zTreeId = 'zTreeDemo';
        this.init();
    }

    var headImgUrl = '';
    var layerIndex = null; // 当前弹出层
    var getDeptTree = '', // 部门列表Url
        getMemberList = '',// 部门员工列表Url
        getUserList = ''; // 搜索会员列表Url

    //定义Depto的方法
    Depto.prototype = {
        init: function() {

            var requestUrl = this.options.requestUrl;
            getDeptTree = requestUrl[0]?requestUrl[0]:_getAjaxPath('getDeptTree'); // 部门列表Url
            getMemberList = requestUrl[1]?requestUrl[1]:_getAjaxPath('getMemberListByDeptId');// 部门员工列表Url
            getUserList = requestUrl[2]?requestUrl[2]:_getAjaxPath('getUserList'); // 搜索会员列表Url

            var zTreeId  = this.zTreeId;
            var deptid  = this.options.deptid;

            var thisDepto = this;
            var headImgUrl = this.options.headImg;
            var maxNum = thisDepto.options.maxNum;
            var isMultiple = thisDepto.options.isMultiple;
            var selectedMulti = (isMultiple==1)?true:false;
            var check  = {};

            if(this.options.type== 2){
                if(isMultiple == 0){
                    check = { enable: true, autoCheckTrigger: true,chkboxType: { "Y": "", "N": "" }};
                } else {
                    check = { enable: true, autoCheckTrigger: true,chkboxType: { "Y": "s", "N": "s" }};
                }
            }

            var setting = {
                view: {
                    // dblClickExpand: false,
                    showIcon: false,
                    selectedMulti: selectedMulti
                },
                data: {
                    key: {
                        children: "Children",
                        name: "Name"
                    }
                },
                check:check ,
                callback: {
                    beforeCheck: function(treeId,treeNode){
                        // console.log(isMultiple);
                        // 单选 0
                        if(isMultiple==0){
                            thisDepto.oA = [];
                            var treeObj = $.fn.zTree.getZTreeObj(zTreeId);
                            var nodes = treeObj.getSelectedNodes();
                            treeObj.checkAllNodes(false);
                        }
                        // 多选
                        else {
                            if( thisDepto.oA.length >= maxNum && maxNum>0 && treeNode.checked==false ){
                                thisDepto.msg('最多可选'+maxNum+'个');

                                return false;
                            }
                        }
                    },
                    onCheck: function(event,treeId,treeNode){

                        var treeObj = $.fn.zTree.getZTreeObj(zTreeId);
                        var checked = treeObj.getNodeByTId(treeNode.tId).checked;
                        var that = $(this);
                        if(checked == true){

                            if (isMultiple==1){
                                if( thisDepto.oA.length >= maxNum && maxNum>0  ){
                                    //thisDepto.msg('最多可选'+maxNum+'个');
                                    //treeObj.prop('checked',false)

                                    treeNode.checked=false;
                                    $('#'+treeNode.tId+'_check').attr("class","button chk checkbox_false_full");
                                    return false;
                                }
                            }

                            thisDepto._setDeptoResult(treeNode,treeNode.tId);
                        } else {
                            thisDepto._removeDeptoResult(treeNode.ID);
                        }
                    },
                    beforeClick:function(){},
                    onClick:function(event, treeId, treeNode, clickFlag){
                        /*var zTree = $.fn.zTree.getZTreeObj(zTreeId);
                         zTree.expandNode(treeNode);*/
                        if(thisDepto.options.type == 1){
                            var deptid = treeNode.ID;// 部门ID

                            if(deptid != 0){
                                // 重置全选按钮
                                $('#selectTreeResultContent .selectAll input[type="checkbox"]').prop('checked',false);

                                // 获取部门员工数据
                                thisDepto._getMemberList(deptid);
                            }
                        }
                    }
                }
            };


            // 初始化layer弹出层插件
            layerIndex = this._layerOpen(function(index){
                var rs = thisDepto.options.beforeSuccess(thisDepto, thisDepto.oA,index);
                if(rs!==false){

                    // 成功回调
                    thisDepto.options.success(thisDepto.oA);

                    // 关闭弹出层
                    thisDepto._layerClose(layerIndex);
                }

            });

            $.post(getDeptTree, {
                deptid: deptid,
                notDisabled: this.options.allowStop
            }, function(data) {
                if(data.rs == true){
                    $.fn.zTree.init($("#"+ zTreeId), setting, data.data);

                    var treeObj = $.fn.zTree.getZTreeObj(zTreeId);
                    var nodes = treeObj.getNodes();
                    treeObj.expandNode(nodes[0], true, false, true);
                }
            },'json');

            if(isMultiple == 0){
                $('#selectTreeResultContent .selectAll').find('input').attr('disabled',true);
                $('#treeSelectComponent .checkboxType').find('input').prop({'checked':false,'disabled':true});
            }

            // 监听点击员工操作
            $("#selectTreeResultContent ul ").on('click', 'li a', function(event) {
                event.preventDefault();
                var that = $(this),
                    parent = that.parent('li'),
                    input = that.siblings('input'),
                    id = parent.attr('mid'),
                    name = parent.attr('name'),
                    pid = parent.attr('pid'),
                    img = that.children('img').attr('src');

                // 单选 0
                if(isMultiple==0){

                    // $('#selectTreeResultContent .selectAll').find('input').attr('disabled',true);
                    if(!thisDepto._isChecked(id)){
                        thisDepto.oA = [];
                        thisDepto._addData(id,name,pid,img);

                        input.prop('checked',true);
                        parent.siblings('li').find('input').prop('checked',false);
                    } else {
                        thisDepto._removeData(id);
                        input.prop('checked',false);
                    }
                }
                // 多选
                else {


                    if(!thisDepto._isChecked(id)){
                        if( thisDepto.oA.length >= maxNum  && maxNum>0 ){
                            thisDepto.msg('最多可选'+maxNum+'个');
                            input.prop('checked',false);
                            return false;
                        }
                        thisDepto._addData(id,name,pid,img);
                        input.prop('checked',true);
                    } else {
                        thisDepto._removeData(id);
                        input.prop('checked',false);
                    }


                }

                thisDepto._setSelectResult();
            });

            // 监听勾选员工操作
            $("#selectTreeResultContent ul ").on('change', 'li input[type="checkbox"]', function(event) {
                event.preventDefault();
                var that = $(this),
                    parent = that.parent('li'),
                    id = parent.attr('mid'),
                    name = parent.attr('name'),
                    pid = parent.attr('pid'),
                    img = that.siblings('a').children('img').attr('src');

                // 单选 0
                if(isMultiple==0){

                    // $('#selectTreeResultContent .selectAll').find('input').attr('disabled',true);
                    if(!thisDepto._isChecked(id)){
                        thisDepto.oA = [];
                        thisDepto._addData(id,name,pid,img);

                        that.prop('checked',true);
                        parent.siblings('li').find('input').prop('checked',false);
                    } else {
                        thisDepto._removeData(id);
                        that.prop('checked',false);
                    }
                }
                // 多选
                else {


                    if(!thisDepto._isChecked(id)){
                        if( thisDepto.oA.length >= maxNum  && maxNum>0 ){
                            thisDepto.msg('最多可选'+maxNum+'个');
                            that.prop('checked',false);
                            return false;
                        }
                        thisDepto._addData(id,name,pid,img);
                        that.prop('checked',true);
                    } else {
                        $('#selectTreeResultContent .selectAll input[type="checkbox"]').prop('checked',false);
                        thisDepto._removeData(id);
                        that.prop('checked',false);
                    }

                }

                thisDepto._setSelectResult();
            });

            // 监听全选操作
            $("#selectTreeResultContent .selectAll ").on('change', 'input[type="checkbox"]', function(event) {
                event.preventDefault();

                var that = $(this),
                    selectAll = that.parents('.selectAll'),
                    li = selectAll.siblings('ul').find('li');



                $.each(li, function(index, val) {
                    var id = $(val).attr('mid'),
                        name = $(val).attr('name'),
                        pid = $(val).attr('pid'),
                        img = $(val).find('img').attr('src');

                    if(that.is(':checked')){
                        if( parseInt(thisDepto.oA.length+li.length) >= maxNum  && maxNum>0 ){
                            thisDepto.msg('最多可选'+maxNum+'个');
                            that.prop('checked',false);
                            return false;
                        }
                        thisDepto._addData(id,name,pid,img);
                        $(val).find('input[type="checkbox"]').prop('checked',true);
                    } else {
                        thisDepto._removeData(id);
                        $(val).find('input[type="checkbox"]').prop('checked',false);
                    }
                });

                thisDepto._setSelectResult();
            });

            // 监听删除添加操作
            $(".tscResultContent ul").on('click', 'li span', function(event) {
                event.preventDefault();
                var that = $(this),
                    id = that.parent('li').attr('mid'),
                    tid = that.parent('li').attr('tid');

                if(thisDepto.options.type == 1){// 员工

                    // 清除该数据
                    thisDepto._removeData(id);

                    // 渲染结果
                    thisDepto._setSelectResult();

                    // 取消选择
                    $('#selectTreeResultContent ul li[mid='+ id +'] input[type="checkbox"]').prop('checked',false);

                    // 取消全选
                    if(thisDepto.oA.length < 1){
                        $('#selectTreeResultContent .selectAll input[type="checkbox"]').prop('checked',false);
                    }

                } else {// 部门

                    var treeObj = $.fn.zTree.getZTreeObj(zTreeId);
                    var node = treeObj.getNodeByTId(tid);

                    treeObj.checkNode(node, false, false);
                    thisDepto._removeDeptoResult(id);

                }
            });

            // 监听确认取消操作
            $('#treeSelectComponent .submitContent').on('click', 'a', function(event) {
                event.preventDefault();
                thisDepto._layerClose(layerIndex);
            });

            // 监听搜索操作
            $('#treeSelectComponent').on('click', '.searchBtn', function(event) {
                var Keyword = $.trim($(this).siblings().find('input[type="text"]').val());
                if(Keyword!=''){
                    thisDepto._getMemberListByKeywords(Keyword);
                } else {
                    alert('无关键词');
                }
            });

            if(isMultiple==1){
                // 监听是否关联子节点,默认关联
                $('#treeSelectComponent').on('change', '.checkboxType', function(event) {


                    // 重置setting设置
                    if($(this).find('input').is(':checked')){
                        setting.check.chkboxType = { "Y": "s", "N": "s" };
                    } else {
                        setting.check.chkboxType = { "Y": "", "N": "" };
                    }

                    // 清除选择结果页面
                    $('.tscResultContent ul').html('');

                    // 重置数据容器
                    thisDepto.oA = [];

                    // 重新加载部门列表树
                    $.post(getDeptTree, {deptid: deptid}, function(data) {
                        if(data.rs == true){
                            $.fn.zTree.init($("#"+ zTreeId), setting, data.data);
                        }
                    },'json');

                });
            }

        },

        // 通过搜索关键词获取部门员工列表数据并设置模板
        _getMemberListByKeywords:function (Keyword){
            var obj = {};
            obj.SearchKeyword = Keyword;
            var that = this;
            _sendTemplateRequest(obj,getUserList,function(data){

                if(data.rs == true){
                    that._setMemberTemplate(data.data);
                } else {
                    alert(data.error);
                }
            });
        },

        // 通过部门ID获取部门员工列表数据并设置模板
        _getMemberList: function (deptid){
            var obj = {},
                requestUrl = this.options.requestUrl,
                that = this;

            obj.deptid = deptid;

            _sendTemplateRequest(obj,getMemberList,function(data){
                if(data.rs == true){
                    that._setMemberTemplate(data.data);
                } else {
                    alert(data.error);
                }

            });
        },

        // 设置选择员工结果模板
        _setSelectResult: function (){
            var html = '',
                imgUrl = this.options.headImg,
                oA = this.oA,
                oALength = oA.length;

            for (var i = 0; i < oALength; i++) {
                if(oA[i].img !=""){
                    imgUrl = oA[i].img;
                }

                html += '<li mid="' + oA[i].ID + '"><img title="' + oA[i].Name + '" src="' + imgUrl + '"><strong>' + oA[i].Name + '</strong><span>&times;</span></li>';
            };

            $(".tscResultContent ul").html(html);
        },

        // 设置员工列表模板
        _setMemberTemplate: function (data){
            var that = this;
            var html = '';
            var oA = this.oA;

            var imgUrl = this.options.headImg;
            // if(data.length>0){
            if($(data).size()){
                $.each(data, function(index, val) {
                    var headImg = headImgUrl;
                    var checked = '';
                    if(val.img && val.img !=''){
                        headImg = val.img;
                    }

                    for (var i = 0; i < oA.length; i++) {
                        if(val.ID == oA[i].ID){
                            checked = 'checked="checked"';
                        }
                    };

                    /* html+='<li name="'+ val.Name +'" pid="'+ val.ParentID +'" mid="'+ val.ID +'"><span class="myChecked">&radic;'+ '<input type="checkbox" style="display:none;" /></span><a href="javascript:;"><img src="' + headImg +'"> <b>' + val.Name +'</b></a></li>';*/


                    html+='<li name="'+ val.Name +'" pid="'+ val.ParentID +'" mid="'+ val.ID +'">'+ '<input type="checkbox" ' + checked + '  /><a href="javascript:;"><img src="' + headImg +'"> <b>' + val.Name +'</b></a></li>';
                });

            }else{
                html = '<p style="text-align:center;">暂无数据！</p>';
            }

            $("#selectTreeResultContent ul").html(html);



            // TODO:头像404添加默认头像
            $('#treeSelectComponent img').on('error', function(){
                $(this).attr('src', that.options.headImg)
            })

        },

        // 移除部门选择结果(单条)
        _removeDeptoResult: function (id){
            $('.tscResultContent ul li[mid="'+ id +'"]').remove();
            this._removeData(id);
        },

        // 过滤数据并渲染部门结果页面(单条)
        _setDeptoResult: function (data,tid){

            var html = '';
            var o = this._filterDeptoResult(data);

            if(o){
                html += '<li tid="'+ tid +'" mid="' + o.ID + '"><strong>' + o.Name + '</strong><span>&times;</span></li>';
            }

            $(".tscResultContent ul").append(html);
        },

        // 过滤部门数据结果(单条)
        _filterDeptoResult: function (data){
            var o ={};
            o.ID = data.ID;
            o.ParentID = data.ParentID;
            o.Name = data.Name;

            if(!this._addData(o.ID,o.Name,o.ParentID,'')){
                return false;
            }

            return o;
        },

        // 添加数据
        _addData:function(id,name,pid,img){
            var o = {};
            o.ID = id;
            o.ParentID = pid;
            o.Name = name;
            o.img = img;
            if(!$.isNumeric(id) || this._isChecked(id)){
                return false;
            }

            this.oA.push(o);
            return true;
        },

        // 移除数据
        _removeData:function(id){

            var oA = this.oA,
                oALength = oA.length;
            var newOA = [];
            for (var i = 0; i < oALength; i++) {
                if(oA[i].ID != id){
                    newOA.push(oA[i]);
                }
            };

            this.oA = newOA;
            return true;
        },

        // 判断当前数据是否存在 true 存在 false 不存在
        _isChecked: function (id){
            var flag = false;
            var oALength = this.oA.length;

            for (var i = 0; i < oALength; i++) {
                if(this.oA[i].ID == id){
                    flag = true;
                    break;
                }
            };

            return flag;
        },

        // 发送请求
        _sendTemplateRequest :function (obj,url,fun){
            $.post(url, obj, function(data) {
                if(fun !=null && $.isFunction(fun)){
                    fun(data);
                }
            },'json');
        },

        // 开启弹出层
        _layerOpen:function(fun){
            var content = this._getLayerTemplate();
            return _customerLayer(content,fun);
        },
        // 获取弹出层模板
        _getLayerTemplate:function(){
            var tmeplateHtml ='';
            var selectTreeResult='<div class="selectTreeResult"><div class="selectTreeResultContent" id="selectTreeResultContent"><div class="selectAll"><label for="selectAll"><input id="selectAll" type="checkbox" > 全选</label></div><ul></ul></div></div>';

            if( this.options.type == 1 ){
                var tscTitle='<div class="tscTitle">'+'<div class="searchContent"><span>选择人员 </span> '+'<span><input type="text" placeholder="" ></span>'+'<span class="searchBtn">搜索</span>'+"</div>"+'    <div class="submitContent">'+'<a href="javascript:;">关闭</a>'+"  </div>"+'<div style="clear:both;"></div>'+"</div>";

                var tscResult='<div class="tscResult"><p>已选择：</p><div class="tscResultContent"><ul class="tscResultMemberList" ></ul></div></div>';

                var selectTree= '<div class="selectTree" style="width:231px;"><ul id="'+ this.zTreeId +'" class="ztree"></ul></div>';
                tmeplateHtml = '<div id="treeSelectComponent">'
                    + tscTitle + tscResult
                    +'<div class="tscOperateContent">'
                    + selectTree+selectTreeResult
                    +'<div style="clear:both;"></div></div>'
                    +'</div>';
            } else {

                var tscTitle='<div class="tscTitle">'+'<div class="searchContent"><span>选择部门 </span> '+"</div>"+'   <div class="submitContent">'+'<a href="javascript:;">关闭</a>'+"  </div>"+'<div style="clear:both;"></div>'+"</div>";

                tscResult='<div class="tscResult">'+'<p>已选择：<label class="checkboxType"><input type="checkbox" checked="checked" />自动关联下级部门</label></p>'+'<div class="tscResultContent">'+'<ul class="tscResultDeptoList"></ul>'+"</div>"+"</div>";

                var selectTree= '<div class="selectTree" style="width:100%;"><ul id="'+ this.zTreeId +'" class="ztree"></ul></div>';
                tmeplateHtml = '<div id="treeSelectComponent">'
                    + tscTitle + tscResult
                    +'<div class="tscOperateContent">'
                    + selectTree
                    +'<div style="clear:both;"></div></div>'
                    +'</div>';
            }

            return tmeplateHtml;
        },

        // 简单提示弹出层(无按钮，带关闭按钮,3秒自动关闭)
        msg:function(msg){
            var content = '<p>'+ msg +'</p>';
            return layer.open({
                type: 1,
                title:false,
                content:content,
                // skin: 'layui-layer-customer1', //样式类名
                closeBtn: 0, //显示关闭按钮
                shift:-1,
                shadeClose: false, //开启遮罩关闭
                area: 'auto',
                closeBtn:1,
                time:3000
            });
        },
        close:function(){
            this._layerClose(layerIndex);
        },

        // 关闭弹出层
        _layerClose:function(layerIndex){
            layer.close(layerIndex);
        }
    }

    // 弹出层
    function _customerLayer(content,fun){
        return layer.open({
            type: 1,
            title:false,
            area: '514px',
            btn:['确定','取消'],
            yes:function(index){
                if(fun !=null && $.isFunction(fun)){
                    fun(index);
                }
                // _getBackData(layerIndex);
            },
            // skin: 'layui-layer-demo', //样式类名
            closeBtn: 0, //不显示关闭按钮
            shift: -2,
            shadeClose: true, //开启遮罩关闭
            content:content
        });
    }

    // 发送请求
    function _sendTemplateRequest(obj,url,fun){
        $.getJSON(url, obj, function(data) {
            if(fun !=null && $.isFunction(fun)){
                fun(data);
            }
        },'json');
    }

    // 获取路径
    function _getAjaxPath(action){
        // return './json/'+ action + '.json';
        //return '/deptcomponent/DeptComponent/'+ action;
        return 'dept.json';
//http://esn.fuwenfang.com/deptcomponent/DeptComponent/getDeptTree/VISITID/1
    }

    //在插件中使用Beautifier对象
    $.fn.DeptoTree = function(options) {
        //创建Beautifier的实体
        var DeptoObj = new Depto(this, options);
        //调用其方法
        return DeptoObj;
    }

    window.deptotree = $

})(jQuery, window, document);