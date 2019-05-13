import * as actionTypes from './actionTypes';
import axiosInstance from '../../axios-order';

export let purchaseBurgerSucess=(id,orderData)=>{
    return {
        type:actionTypes.PURCHASEBURGERSUCCESS,
        order:{
            orderData:orderData,
            id:id
        }
    }
}
export let purchaseBurgerFail=(err)=>{
    return {
        type:actionTypes.PURCHASEBURGERFAIL,
        err:err
    }
}
export let purchaseBurgerStart=()=>{
    return {
        type:actionTypes.PURCHASEBURGERSTART

    }
}
export let purchaseInit=()=>{
    return {
        type:actionTypes.PURCHASEINIT,
        
    }
}
export let purchaseBurger=(orderData)=>{
    return (dispatch)=>{
        dispatch(purchaseBurgerStart())
        axiosInstance.post('/orders.json',orderData)
        .then(res=>{
            dispatch(purchaseBurgerSucess(res.data.name,orderData));
        })
        .catch((err)=>dispatch(purchaseBurgerFail(err)));
    }
}