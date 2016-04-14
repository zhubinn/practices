import Immutable from 'immutable'
import {CK_TABLE_GETDATA, CK_TABLE_GETDATA_SUCCESS,CK_SELECTEDROWDATA,
    CK_SETTINGCLOSE,CK_CHANGETAB,CK_CHANGEISREQUIRED,CK_ADDITEM,CK_DELETEITEM,
    CK_CHANGRINPUTVALUE,CK_CHANGEISWORK,CK_APPLY_BTN,CK_DOWNITEM,CK_UPITEM,CK_SETTINGCANCLE} from 'actions/CustomizablePage/CustomizablePage'

export default function Customizable(state = Immutable.fromJS({rows:[], selectedRow:{}, IsShow:false, currentTabIndex:0}), action) {
    switch(action.type) {
    	case CK_TABLE_GETDATA:
    		return state
    	case CK_TABLE_GETDATA_SUCCESS:
            return state.merge(action.payload)
        case CK_SELECTEDROWDATA:
            return state.merge(action.payload,{'IsShow':true})
        case CK_SETTINGCLOSE:
            return state.merge({'IsShow':false})
        case CK_SETTINGCANCLE:
            return state.merge({'IsShow':false})
        case CK_CHANGETAB:
        	return state.merge(action.payload)
        case CK_CHANGEISREQUIRED:
            return state.updateIn(['selectedRow', 'col_IsRequired'], col_IsRequired => {
                return action.payload.col_IsRequired
            })
        case CK_ADDITEM:
            const additemCon =  Immutable.fromJS({'optionInfor':'','IsDelete':'是','status':'启用'})
            return state.updateIn(['editColumnsOptions'], editColumnsOptions => {
                return editColumnsOptions.push(additemCon)
            })
        case CK_DELETEITEM:
            if(action.payload === 0){
            const lastitemCon =  Immutable.fromJS([{optionInfor:'',IsDelete:'否',status:'启用'}])
                return state.updateIn(['editColumnsOptions'], editColumnsOptions => {
                    
                    return lastitemCon
                })
            }else{
                return state.updateIn(['editColumnsOptions'], editColumnsOptions => {
                    
                    return editColumnsOptions.delete(action.payload)
                })
            }
        case CK_CHANGRINPUTVALUE:

            let index = action.payload.index
            let NewoptionInfor = action.payload.value
            let editColumnsOptions = state.get('editColumnsOptions')
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
            return state.set('editColumnsOptions', editColumnsOptions)
        case CK_CHANGEISWORK:
            let changeIndex = action.payload.index
            let Newostatus = action.payload.status
            let columnsOptions = state.get('editColumnsOptions')
            columnsOptions = columnsOptions.map((r, i) => {
                if (i === changeIndex) {
                    return r.updateIn(['status'], status => {
                        return Newostatus
                    })
                }
                return r
            })
            return state.set('editColumnsOptions', columnsOptions)
        case CK_APPLY_BTN:
            return state.merge({'submit':true})
        case CK_DOWNITEM:
            const DownIndex = action.payload
            let curOptions = state.get('editColumnsOptions')
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
            return state.set('editColumnsOptions', curOptions)
        case CK_UPITEM:
            const UpIndex = action.payload
            let Options = state.get('editColumnsOptions')
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
            return state.set('editColumnsOptions', Options)
        default:
            return state
    }
}