import * as actionTypes from '../actions/actionTypes';

const initialState={
    orders:[],
    loading:false,
    purchase:false,
    err:null
}

const orderReducer=(state=initialState,action)=>{
    switch(action.type)
    {
        case actionTypes.PURCHASEBURGERSUCCESS:
            const newOrder={
                ...action.orderData,
                id:action.id,
                
            }
            return {
                ...state,
                orders:state.orders.concat(newOrder),
                loading:false,
                purchase:true
            }
        case actionTypes.PURCHASEINIT:
            return{
                ...state,
                purchase:false
            }
        case actionTypes.PURCHASEBURGERFAIL:return {
            ...state,
            loading:false,

        }
        case actionTypes.PURCHASEBURGERSTART:return {
            ...state,
            loading:true
        }
        case actionTypes.FETCHORDERSTART:return {
            ...state,
            loading:true
        }
        case actionTypes.FETCHORDERSUCCESS:
        
        return {
            ...state,
            orders:state.orders.concat(action.orders),
            loading:false
        }
        case actionTypes.FETCHORDERFAIL:return{
            ...state,
            err:action.err,
            loading:false
        }
        default:return state
    }
}
export default orderReducer;