import * as actionTypes from './actionTypes';
import axiosInstance from '../../axios-order';

export let addIngredients=(ingName)=>{
    return {type:actionTypes.ADDINGREDIENT,ingredientName:ingName}
}
export let removeIngredients=(ingName)=>{return {type:actionTypes.REMOVEINGREDIENT,ingredientName:ingName}}

export let setIngredients=(data)=>{
    return {
        type:actionTypes.SETINGREDIENTS,
        ingredient:data,
        error:false
    }
}
export let fetchIngredientsError=(err)=>{
    return {
        type:actionTypes.FETCHINGREDIENTSERROR,
        error:err
    }
}
export let initIngredients=()=>{

    return (dispatch)=>{
            axiosInstance.get('https://react-burgerbuilder-a3bac.firebaseio.com/ingredients.json')
                     .then((res)=>{
                        dispatch(setIngredients(res.data));

                     })
                     .catch((err)=>fetchIngredientsError(err));
    }
}