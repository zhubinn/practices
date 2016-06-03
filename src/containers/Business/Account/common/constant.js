/**
 * Created by janeluck on 5/13/16.
 */


import MapModal from 'containers/Business/Account/common/MapModal'
const detail_columns = [{
    title: '客户名称',
    dataIndex: 'Name',
    key: 'Name',

}, {
    title: '简称',
    dataIndex: 'ShortName',
    key: 'ShortName',
    width: 100

},{
    title: '生意数量',
    dataIndex: 'OptntyCount',
    key: 'OptntyCount',
},{
    title: '成交金额',
    dataIndex: 'TradingAmount',
    key: 'TradingAmount',
},{
    title: '回款金额',
    dataIndex: 'PaymentAmount',
    key: 'PaymentAmount',
}, {
    title: '开户银行',
    dataIndex: 'Bank',
    key: 'Bank',


}, {
    title: '银行账号',
    dataIndex: 'BankAccount',
    key: 'BankAccount',

}, {
    title: '负责人',
    dataIndex: 'OwnerID',
    key: 'OwnerID',
    width: 100

}, {
    title: '公司地址',
    dataIndex: 'Address',
    key: 'Address',

    render: function (text, record, index) {
        let cell = (<p>{record.Address}</p>)
        if (!!record.Lat) {
            cell = (<a href="javascript:;" onClick={()=>{MapModal(record.Lng, record.Lat, '公司地址')}}>{record.Address}</a>)
        }
        return cell
    }

}, {
    title: '销售地址',
    dataIndex: 'Address2',
    key: 'Address2',

    render: function (text, record, index) {
        let cell = (<p>{record.Address2}</p>)
        if (!!record.Lat2) {
            cell = (<a href="javascript:;" onClick={()=>{MapModal(record.Lng2, record.Lat2, '销售地址')}}>{record.Address2}</a>)
        }
        return cell
    }
}, {
    title: '工厂地址',
    dataIndex: 'Address3',
    key: 'Address3',

    render: function (text, record, index) {
        let cell = (<p>{record.Address3}</p>)
        if (!!record.Lat3) {
            cell = (<a href="javascript:;" onClick={()=>{MapModal(record.Lng3, record.Lat3, '工厂地址')}}>{record.Address3}</a>)
        }
        return cell
    }

}, {
    title: '库房地址',
    dataIndex: 'Address4',
    key: 'Address4',

    render: function (text, record, index) {
        let cell = (<p>{record.Address4}</p>)
        if (!!record.Lat4) {
            cell = (<a href="javascript:;" onClick={()=>{MapModal(record.Lng4, record.Lat4, '库房地址')}}>{record.Address4}</a>)
        }
        return cell
    }

}, {
    title: '收货地址',
    dataIndex: 'Address5',
    key: 'Address5',

    render: function (text, record, index) {
        let cell = (<p>{record.Address5}</p>)
        if (!!record.Lat5) {
            cell = (<a href="javascript:;" onClick={()=>{MapModal(record.Lng5, record.Lat5, '收货地址')}}>{record.Address5}</a>)
        }
        return cell
    }

}, {
    title: '门店地址',
    dataIndex: 'Address6',
    key: 'Address6',
    width: 100,
    render: function (text, record, index) {
        let cell = (<p>{record.Address6}</p>)
        if (!!record.Lat6) {
            cell = (<a href="javascript:;" onClick={()=>{MapModal(record.Lng6, record.Lat6, '门店地址')}}>{record.Address6}</a>)
        }
        return cell
    }

}, {
    title: '其他地址',
    dataIndex: 'Address7',
    key: 'Address7',

    render: function (text, record, index) {
        let cell = (<p>{record.Address7}</p>)
        if (!!record.Lat7) {
            cell = (<a href="javascript:;" onClick={()=>{MapModal(record.Lng7, record.Lat7, '其他地址')}}>{record.Address7}</a>)
        }
        return cell
    }

},  {
    title: '客户公司电话',
    dataIndex: 'Phone',
    key: 'Phone',

}, {
    title: '销售电话',
    dataIndex: 'Phone2',
    key: 'Phone2',

}, {
    title: '工厂电话',
    dataIndex: 'Phone3',
    key: 'Phone3',

}, {
    title: '库房电话',
    dataIndex: 'Phone4',
    key: 'Phone4',

}, {
    title: '收货电话',
    dataIndex: 'Phone5',
    key: 'Phone5',

}, {
    title: '门店电话',
    dataIndex: 'Phone6',
    key: 'Phone6',

}, {
    title: '传真',
    dataIndex: 'Phone8',
    key: 'Phone8',

}, {
    title: '其他电话',
    dataIndex: 'Phone7',
    key: 'Phone7',

}, {
    title: '客户简介',
    dataIndex: 'Descriptions',
    key: 'Descriptions',

}, {
    title: '业务类型',
    dataIndex: 'BusinessTpye',
    key: 'BusinessTpye',
    width: 100,

}, {
    title: '主营产品',
    dataIndex: 'MainProduct',
    key: 'MainProduct',

}, {
    title: '客户规模',
    dataIndex: 'Scale',
    key: 'Scale',

}, {
    title: '客户级别',
    dataIndex: 'AccountLevel',
    key: 'AccountLevel',

}, {
    title: '所属区域',
    dataIndex: 'Area',
    key: 'Area',

}, {
    title: '客户来源',
    dataIndex: 'Source',
    key: 'Source',

}, {
    title: '行业分类',
    dataIndex: 'Industry',
    key: 'Industry',

}, {
    title: '客户公司网址',
    dataIndex: 'WebSite',
    key: 'WebSite',

}, {
    title: '旺旺',
    dataIndex: 'Ww',
    key: 'Ww',

}, {
    title: 'MSN/QQ',
    dataIndex: 'Msnqq',
    key: 'Msnqq',

}, {
    title: '电子邮件',
    dataIndex: 'Email',
    key: 'Email',

}, {
    title: '公司负责人',
    dataIndex: 'Customer',
    key: 'Customer',

}, {
    title: '备注',
    dataIndex: 'Beizhu',
    key: 'Beizhu',

}, {
    title: '创建时间',
    dataIndex: 'CreatedTime',
    key: 'CreatedTime',
    width: 250

},{
    title: '创建方式',
    dataIndex: 'CreatedType',
    key: 'CreatedType',
},{
    title: '线索录入人',
    dataIndex: 'LeadCreater',
    key: 'LeadCreater',
},{
    title: '线索关联人',
    dataIndex: 'LeadName',
    key: 'LeadName',
},{
    title: '线索来源',
    dataIndex: 'LeadSource',
    key: 'LeadSource',
}];


const list_columns = [{
    title: '客户名称',
    dataIndex: 'Name',
    key: 'Name',

}, {
    title: '简称',
    dataIndex: 'ShortName',
    key: 'ShortName',
    width: 100

}, {
    title: '开户银行',
    dataIndex: 'Bank',
    key: 'Bank',


}, {
    title: '银行账号',
    dataIndex: 'BankAccount',
    key: 'BankAccount',

}, {
    title: '负责人',
    dataIndex: 'OwnerID',
    key: 'OwnerID',
    width: 100

}, {
    title: '公司地址',
    dataIndex: 'Address',
    key: 'Address',

    render: function (text, record, index) {
        let cell = (<p>{record.Address}</p>)
        if (!!record.Lat) {
            cell = (<a href="javascript:;" onClick={()=>{MapModal(record.Lng, record.Lat, '公司地址')}}>{record.Address}</a>)
        }
        return cell
    }

}, {
    title: '销售地址',
    dataIndex: 'Address2',
    key: 'Address2',

    render: function (text, record, index) {
        let cell = (<p>{record.Address2}</p>)
        if (!!record.Lat2) {
            cell = (<a href="javascript:;" onClick={()=>{MapModal(record.Lng2, record.Lat2, '销售地址')}}>{record.Address2}</a>)
        }
        return cell
    }
}, {
    title: '工厂地址',
    dataIndex: 'Address3',
    key: 'Address3',

    render: function (text, record, index) {
        let cell = (<p>{record.Address3}</p>)
        if (!!record.Lat3) {
            cell = (<a href="javascript:;" onClick={()=>{MapModal(record.Lng3, record.Lat3, '工厂地址')}}>{record.Address3}</a>)
        }
        return cell
    }

}, {
    title: '库房地址',
    dataIndex: 'Address4',
    key: 'Address4',

    render: function (text, record, index) {
        let cell = (<p>{record.Address4}</p>)
        if (!!record.Lat4) {
            cell = (<a href="javascript:;" onClick={()=>{MapModal(record.Lng4, record.Lat4, '库房地址')}}>{record.Address4}</a>)
        }
        return cell
    }

}, {
    title: '收货地址',
    dataIndex: 'Address5',
    key: 'Address5',

    render: function (text, record, index) {
        let cell = (<p>{record.Address5}</p>)
        if (!!record.Lat5) {
            cell = (<a href="javascript:;" onClick={()=>{MapModal(record.Lng5, record.Lat5, '收货地址')}}>{record.Address5}</a>)
        }
        return cell
    }

}, {
    title: '门店地址',
    dataIndex: 'Address6',
    key: 'Address6',

    render: function (text, record, index) {
        let cell = (<p>{record.Address6}</p>)
        if (!!record.Lat6) {
            cell = (<a href="javascript:;" onClick={()=>{MapModal(record.Lng6, record.Lat6, '门店地址')}}>{record.Address6}</a>)
        }
        return cell
    }

}, {
    title: '其他地址',
    dataIndex: 'Address7',
    key: 'Address7',

    render: function (text, record, index) {
        let cell = (<p>{record.Address7}</p>)
        if (!!record.Lat7) {
            cell = (<a href="javascript:;" onClick={()=>{MapModal(record.Lng7, record.Lat7, '其他地址')}}>{record.Address7}</a>)
        }
        return cell
    }

}, {
    title: '客户公司电话',
    dataIndex: 'Phone',
    key: 'Phone',

}, {
    title: '销售电话',
    dataIndex: 'Phone2',
    key: 'Phone2',

}, {
    title: '工厂电话',
    dataIndex: 'Phone3',
    key: 'Phone3',

}, {
    title: '库房电话',
    dataIndex: 'Phone4',
    key: 'Phone4',

}, {
    title: '收货电话',
    dataIndex: 'Phone5',
    key: 'Phone5',

}, {
    title: '门店电话',
    dataIndex: 'Phone6',
    key: 'Phone6',

}, {
    title: '传真',
    dataIndex: 'Phone8',
    key: 'Phone8',

}, {
    title: '其他电话',
    dataIndex: 'Phone7',
    key: 'Phone7',

}, {
    title: '客户简介',
    dataIndex: 'Descriptions',
    key: 'Descriptions',

}, {
    title: '业务类型',
    dataIndex: 'BusinessTpye',
    key: 'BusinessTpye',
    width: 100,

}, {
    title: '主营产品',
    dataIndex: 'MainProduct',
    key: 'MainProduct',

}, {
    title: '客户规模',
    dataIndex: 'Scale',
    key: 'Scale',

}, {
    title: '客户级别',
    dataIndex: 'AccountLevel',
    key: 'AccountLevel',

}, {
    title: '所属区域',
    dataIndex: 'Area',
    key: 'Area',

}, {
    title: '客户来源',
    dataIndex: 'Source',
    key: 'Source',

}, {
    title: '行业分类',
    dataIndex: 'Industry',
    key: 'Industry',

}, {
    title: '客户公司网址',
    dataIndex: 'WebSite',
    key: 'WebSite',

}, {
    title: '旺旺',
    dataIndex: 'Ww',
    key: 'Ww',

}, {
    title: 'MSN/QQ',
    dataIndex: 'Msnqq',
    key: 'Msnqq',

}, {
    title: '电子邮件',
    dataIndex: 'Email',
    key: 'Email',

}, {
    title: '公司负责人',
    dataIndex: 'Customer',
    key: 'Customer',

}, {
    title: '备注',
    dataIndex: 'Beizhu',
    key: 'Beizhu',

}, {
    title: '创建时间',
    dataIndex: 'CreatedTime',
    key: 'CreatedTime',
    width: 250

},{
    title: '创建方式',
    dataIndex: 'CreatedType',
    key: 'CreatedType',
},{
    title: '线索录入人',
    dataIndex: 'LeadCreater',
    key: 'LeadCreater',
},{
    title: '线索关联人',
    dataIndex: 'LeadName',
    key: 'LeadName',
},{
    title: '线索来源',
    dataIndex: 'LeadSource',
    key: 'LeadSource',
}];

export {
    list_columns,
    detail_columns
}