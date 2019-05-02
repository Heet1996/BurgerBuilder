import * as actionTypes from './actionTypes';

export let addIngredients=(ingName)=>{
    return {type:actionTypes.ADDINGREDIENT,ingredientName:ingName}
}
export let removeIngredients=(ingName)=>{return {type:actionTypes.REMOVEINGREDIENT,ingredientName:ingName}}
