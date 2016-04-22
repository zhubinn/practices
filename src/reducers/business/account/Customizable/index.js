import Immutable from 'immutable'
import {ACCOUNT_CUSTOM_TABLE_GETDATA, ACCOUNT_CUSTOM_TABLE_GETDATA_SUCCESS,ACCOUNT_CUSTOM_SELECTEDROWDATA,
    ACCOUNT_CUSTOM_SETTINGCLOSE,ACCOUNT_CUSTOM_CHANGETAB,ACCOUNT_CUSTOM_CHANGEISREQUIRED,ACCOUNT_CUSTOM_ADDITEM,ACCOUNT_CUSTOM_DELETEITEM,
    ACCOUNT_CUSTOM_CHANGRINPUTVALUE,ACCOUNT_CUSTOM_CHANGEISWORK,ACCOUNT_CUSTOM_APPLY_BTN,ACCOUNT_CUSTOM_DOWNITEM,ACCOUNT_CUSTOM_UPITEM,
    ACCOUNT_CUSTOM_SETTINGCANCLE,DATAITEM} from 'actions/Business/Account/Customizable'


const $$initialState = Immutable.fromJS({
    rows:[], 
    selectedRow:{}, 
    IsShow:false, 
    currentTabIndex:0,
    data:[]
})

const  Customizable = ($$state = $$initialState, action)=>{
    switch(action.type) {
        case DATAITEM:
            return $$state.merge({data:action.payload})
    	case ACCOUNT_CUSTOM_TABLE_GETDATA:
    		return $$state
    	case ACCOUNT_CUSTOM_TABLE_GETDATA_SUCCESS:
            return $$state.merge(action.payload)
        case ACCOUNT_CUSTOM_SELECTEDROWDATA:
            return $$state.merge(action.payload,{'IsShow':true})
        case ACCOUNT_CUSTOM_SETTINGCLOSE:
            return $$state.merge({'IsShow':false})
        case ACCOUNT_CUSTOM_SETTINGCANCLE:
            return $$state.merge({'IsShow':false})
        case ACCOUNT_CUSTOM_CHANGETAB:
        	return $$state.merge(action.payload)
        case ACCOUNT_CUSTOM_CHANGEISREQUIRED:
            return $$state.updateIn(['selectedRow', 'col_IsRequired'], col_IsRequired => {
                return action.payload.col_IsRequired
            })
        case ACCOUNT_CUSTOM_ADDITEM:
            const $$additemCon =  Immutable.fromJS({'optionInfor':'','IsDelete':'是','status':'启用'})
            return $$state.updateIn(['editColumnsOptions'], editColumnsOptions => {
                return editColumnsOptions.push($$additemCon)
            })
        case ACCOUNT_CUSTOM_DELETEITEM:
            if(action.payload === 0){
            const $$lastitemCon =  Immutable.fromJS([{optionInfor:'',IsDelete:'否',status:'启用'}])
                return $$state.updateIn(['editColumnsOptions'], editColumnsOptions => {
                    
                    return $$lastitemCon
                })
            }else{
                return $$state.updateIn(['editColumnsOptions'], editColumnsOptions => {
                    
                    return editColumnsOptions.delete(action.payload)
                })
            }
        case ACCOUNT_CUSTOM_CHANGRINPUTVALUE:

            let index = action.payload.index
            let NewoptionInfor = action.payload.value
            let editColumnsOptions = $$state.get('editColumnsOptions')
            editColumnsOptions = editColumnsOptions.map((r, i) => {
                if (i === index) {
                    return r.updateIn(['optionInfor'], optionInfor => {
                        return NewoptionInfor
                    })
                }
                return r
            })
            editColumnsOptions = editColumnsOptions.map((r, i) => {
                if(i === 0 && NewoptionInfor.length>0 ) {
                    return r.updateIn(['IsDelete'], IsDelete => {
                        return '是'
                    })

                }
                return r
            })
            return $$state.set('editColumnsOptions', editColumnsOptions)
        case ACCOUNT_CUSTOM_CHANGEISWORK:
            let changeIndex = action.payload.index
            let Newostatus = action.payload.status
            let columnsOptions = $$state.get('editColumnsOptions')
            columnsOptions = columnsOptions.map((r, i) => {
                if (i === changeIndex) {
                    return r.updateIn(['status'], status => {
                        return Newostatus
                    })
                }
                return r
            })
            return $$state.set('editColumnsOptions', columnsOptions)
        case ACCOUNT_CUSTOM_APPLY_BTN:
            return $$state.merge({'submit':true})
        case ACCOUNT_CUSTOM_DOWNITEM:
            const DownIndex = action.payload
            let curOptions = $$state.get('editColumnsOptions')
            let currentItem = new Map()
            let currentRnext =new Map()
            let templeItem = new Map()
            curOptions = curOptions.map((r, i) => {
                if (i === DownIndex) {
                         currentItem = r;
                }
                if(i === DownIndex+1){
                         currentRnext = r;
                }
                return r
            })
            templeItem = currentItem
            curOptions = curOptions.map((r, i) => {
                if (i === DownIndex+1) {
                    r = templeItem
                }
                if(i === DownIndex){
                    r = currentRnext
                }
                return r
            })
            return $$state.set('editColumnsOptions', curOptions)
        case ACCOUNT_CUSTOM_UPITEM:
            const UpIndex = action.payload
            let Options = $$state.get('editColumnsOptions')
            let currentR = new Map()
            let currentRpre =new Map()
            let templemap = new Map()
            Options = Options.map((r, i) => {
                if (i === UpIndex) {
                         currentR = r;
                }
                if(i === UpIndex-1){
                         currentRpre = r;
                }
                return r
            })
            templemap = currentR
            Options = Options.map((r, i) => {
                if (i === UpIndex-1) {
                    r = templemap
                }
                if(i === UpIndex){
                    r = currentRpre
                }
                return r
            })
            return $$state.set('editColumnsOptions', Options)
        default:
            return $$state
    }
}

export default Customizable