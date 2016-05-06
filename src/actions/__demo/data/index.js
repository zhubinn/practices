/**
 * Created by janeluck on 4/25/16.
 */
import INPUTTYPE from 'components/QueryNestedTable/inputType'

const account_list_columns = [{
    title: '客户名称',
    dataIndex: 'Name',
    key: 'Name',
    inputType: INPUTTYPE.STRING,
    defaultValue: '默认值',
    width: 80,
    render: text => {
        return <a href="http://baidu.com" target="_blank">{text}</a>
    }
}, {
    title: '简称',
    dataIndex: 'ShortName',
    key: 'ShortName',
    width: 80,
    inputType: INPUTTYPE.STRING,
}, {
    title: '开户银行',
    dataIndex: 'Bank',
    key: 'Bank',
    width: 80,
    inputType: INPUTTYPE.NUMBER,
}, {
    title: '银行账号',
    dataIndex: 'BankAccount',
    key: 'BankAccount',
    inputType: INPUTTYPE.NUMBER,
}, {
    title: '负责人',
    dataIndex: 'OwnerID',
    key: 'OwnerID',
    width: 80,
    inputType: INPUTTYPE.STRING,
}, {
    title: '客户公司地址',
    dataIndex: 'Address',
    key: 'Address',
    width: 100,
    inputType: INPUTTYPE.STRING,
}, {
    title: '客户公司电话',
    dataIndex: 'Phone',
    key: 'Phone',
    width: 100,
    inputType: INPUTTYPE.NUMBER,
}, {
    title: '客户简介',
    dataIndex: 'Descriptions',
    key: 'Descriptions',
    width: 80,
    inputType: INPUTTYPE.STRING,
}, {
    title: '业务类型',
    dataIndex: 'AccountIndustry',
    key: 'AccountIndustry',
    width: 80,
    inputType: INPUTTYPE.STRING,
}, {
    title: '主营产品',
    dataIndex: 'MainProduct',
    key: 'MainProduct',
    width: 80,
    inputType: INPUTTYPE.STRING,
}, {
    title: '客户规模',
    dataIndex: 'Scale',
    key: 'Scale',
    width: 80,
    inputType: INPUTTYPE.STRING,
}, {
    title: '客户级别',
    dataIndex: 'AccountLevel',
    key: 'AccountLevel',
    inputType: INPUTTYPE.STRING,
}, {
    title: '业务类型',
    dataIndex: 'AccountIndustry',
    key: 'AccountIndustry',
    width: 80,
    inputType: INPUTTYPE.STRING,
}, {
    title: '所属区域',
    dataIndex: 'Area',
    key: 'Area',
    inputType: INPUTTYPE.STRING,
}, {
    title: '客户公司网址',
    dataIndex: 'WebSite',
    key: 'WebSite',
    inputType: INPUTTYPE.STRING,
}, {
    title: '旺旺',
    dataIndex: 'Ww',
    key: 'Ww',
    width: 80,
    inputType: INPUTTYPE.STRING,
}, {
    title: 'MSN/QQ',
    dataIndex: 'Msnqq',
    key: 'Msnqq',
    width: 80,
    inputType: INPUTTYPE.STRING,
}, {
    title: '电子邮件',
    dataIndex: 'Email',
    key: 'Email',
    width: 80,
    inputType: INPUTTYPE.STRING,
}, {
    title: '客户联系人',
    dataIndex: 'AccountConnect',
    key: 'AccountConnect',
    width: 80,
    inputType: INPUTTYPE.STRING,
}, {
    title: '备注',
    dataIndex: 'Beizhu',
    key: 'Beizhu',
    width: 80,
    inputType: INPUTTYPE.STRING,
}, {
    title: '创建时间',
    dataIndex: 'CreatedTime',
    key: 'CreatedTime',
    width: 80,
    inputType: INPUTTYPE.DATE,
}];

const account_list_childColumns = [{
    title: '客户名称1',
    dataIndex: 'Name1',
    key: 'Name1',
    inputType: INPUTTYPE.STRING,
    defaultValue: '默认值',
}, {
    title: '简称1',
    dataIndex: 'ShortName1',
    key: 'ShortName1',
    inputType: INPUTTYPE.STRING,
    defaultValue: '默认值',
}]

export {
    account_list_columns,
    account_list_childColumns,
}
