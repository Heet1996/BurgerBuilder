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

export let fetchOrderStart=()=>{
    return {
        type:actionTypes.FETCHORDERSTART
    }
}
export let fetchOrderFail=(err)=>{
    return {
        type:actionTypes.FETCHORDERFAIL,
        err:err
    }
}
export let fetchOrderSuccess=(orders)=>{
    return {
        type:actionTypes.FETCHORDERSUCCESS,
        orders:orders
    }
}
export let fetchOrder=()=>{
    return (dispatch)=>{
        dispatch(fetchOrderStart());
        
        axiosInstance.get('/orders.json')
        .then(res=>{
            console.log("Success");
            const fetchData=[];
            for(let key in res.data)
            fetchData.push({...res.data[key],key})
            dispatch(fetchOrderSuccess(fetchData));
            
        }).catch((err)=>{
            console.log("Not getting bro");
            dispatch(fetchOrderFail(err));
        })

    }
}