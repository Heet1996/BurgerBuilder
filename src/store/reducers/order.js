import * as actionTypes from '../actions/actionTypes';

const initialState={
    orders:[],
    loading:false
}

const orderReducer=(state=initialState,action)=>{
    switch(action.type)
    {
        case actionTypes.PURCHASEBURGERSUCCESS:
            const newOrder={
                ...action.orderData,
                id:action.id
            }
            return {
                ...state,
                orders:state.orders.concat(newOrder),
                loading:false
            }
        case actionTypes.PURCHASEBURGERFAIL:return {
            ...state,
            loading:false,

        }
        case actionTypes.PURCHASEBURGERSTART:return {
            ...state,
            loading:true
        }
        default:return state
    }
}
export default orderReducer;