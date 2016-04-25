/**
 * Created by janeluck on 4/25/16.
 */

import INPUTTYPE from 'components/QueryNestedTable/inputType'

const account_summary_columns = [{
    title: '客户名称',
    dataIndex: 'Name',
    key: 'Name',
    inputType: INPUTTYPE.STRING,
}, {
    title: '简称',
    dataIndex: 'ShortName',
    key: 'ShortName',
    inputType: INPUTTYPE.STRING,
}, {
    title: '开户银行',
    dataIndex: 'Bank',
    key: 'Bank',
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
    inputType: INPUTTYPE.STRING,
}, {
    title: '客户公司地址',
    dataIndex: 'Address',
    key: 'Address',
    inputType: INPUTTYPE.STRING,
}, {
    title: '客户公司电话',
    dataIndex: 'Phone',
    key: 'Phone',
    inputType: INPUTTYPE.NUMBER,
}, {
    title: '客户简介',
    dataIndex: 'Descriptions',
    key: 'Descriptions',
    inputType: INPUTTYPE.STRING,
}, {
    title: '业务类型',
    dataIndex: 'AccountIndustry',
    key: 'AccountIndustry',
    inputType: INPUTTYPE.STRING,
}, {
    title: '主营产品',
    dataIndex: 'MainProduct',
    key: 'MainProduct',
    inputType: INPUTTYPE.STRING,
}, {
    title: '客户规模',
    dataIndex: 'Scale',
    key: 'Scale',
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
    inputType: INPUTTYPE.STRING,
}, {
    title: 'MSN/QQ',
    dataIndex: 'Msnqq',
    key: 'Msnqq',
    inputType: INPUTTYPE.STRING,
}, {
    title: '电子邮件',
    dataIndex: 'Email',
    key: 'Email',
    inputType: INPUTTYPE.STRING,
}, {
    title: '客户联系人',
    dataIndex: 'AccountConnect',
    key: 'AccountConnect',
    inputType: INPUTTYPE.STRING,
}, {
    title: '备注',
    dataIndex: 'Beizhu',
    key: 'Beizhu',
    inputType: INPUTTYPE.STRING,
}, {
    title: '创建时间',
    dataIndex: 'CreatedTime',
    key: 'CreatedTime',
    inputType: INPUTTYPE.DATE,
}];

const account_summary_business_columns = [
    {
        title: '生意名称',
        dataIndex: 'optnty_name',
        key: 'optnty_name',
        inputType: INPUTTYPE.STRING,
    },{
        title: '生意阶段',
        dataIndex: 'optnty_stage',
        key: 'optnty_stage',
        inputType: INPUTTYPE.STRING,
    }, {
        title: '负责人',
        dataIndex: ' owner_user_id',
        key: ' owner_user_id',
        inputType: INPUTTYPE.STRING,
    }
]
export {
    account_summary_columns,
    account_summary_business_columns
}
