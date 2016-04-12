import Immutable from 'immutable'
import {CK_TABLE_GETDATA, CK_TABLE_GETDATA_SUCCESS,CK_SELECTEDROWDATA,
    CK_SETTINGCLOSE,CK_CHANGETAB,CK_CHANGEISREQUIRED,CK_ADDITEM,CK_DELETEITEM,
    CK_CHANGRINPUTVALUE,CK_CHANGEISWORK} from 'actions/CustomizablePage/CustomizablePage'

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
            return state.updateIn(['editColumnsOptions'], editColumnsOptions => {
                
                return editColumnsOptions.delete(action.payload)
            })
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
        default:
            return state
    }
}