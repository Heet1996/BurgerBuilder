import * as actionTypes from './actionTypes';
import axiosInstance from '../../axios-order';

import {firebaseObj,databaseRef} from '../../config/firebaseConfig';



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
export let purchaseBurger=(orderData,token)=>{
    return (dispatch)=>{
        dispatch(purchaseBurgerStart())
        axiosInstance.post('/orders.json?auth='+token,orderData)
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
export let fetchOrder=(token)=>{
    return (dispatch)=>{
        dispatch(fetchOrderStart());
        
        // const orders=databaseRef.child(`orders/`);
        
        // orders.orderByChild('userId').equalTo(localStorage.getItem('userId')).once("value",(snapshot) => {
        //     const fetchData=[];

        //     for(let key in snapshot.val())
        //     fetchData.push({...snapshot[key],key});
        //     dispatch(fetchOrderSuccess(fetchData));
        //   },function (errorObject) {
        //     console.log("The read failed: " + errorObject.code);
        //   })
                
        const queryParams=`?auth=${token}&orderBy="userId"&equalTo="${localStorage.getItem('userId')}"`;
        
        axiosInstance.get('/orders.json/'+queryParams)
        .then(res=>{
            
            const fetchData=[];
            
            for(let key in res.data)
            fetchData.push({...res.data[key],key})
            dispatch(fetchOrderSuccess(fetchData));
            
        }).catch((err)=>{
            
            console.log(err);
            dispatch(fetchOrderFail(err));
        })

    }
}