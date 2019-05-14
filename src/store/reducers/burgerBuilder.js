

import * as actionTypes from '../actions/actionTypes';

const initialState={
    ingredients:null,
    error:false,
    total:4
}
const INGREDIENT_PRICES = {
    salad: 0.5,
    cheese: 0.4,
    meat: 1.3,
    bacon: 0.7
};
const burgerBuilderReducer=(state=initialState,action)=>{
    switch(action.type)
    {
        case actionTypes.ADDINGREDIENT:
              return{
                ...state,
                ingredients:{
                    ...state.ingredients,
                    [action.ingredientName]:state.ingredients[action.ingredientName]+1
                },
                total:state.total+INGREDIENT_PRICES[action.ingredientName]
            }  
        case actionTypes.REMOVEINGREDIENT:
                return{
                    ...state,
                    ingredients:{
                        ...state.ingredients,
                        [action.ingredientName]:state.ingredients[action.ingredientName]-1
                    },
                    total:state.total-INGREDIENT_PRICES[action.ingredientName]
        }
        case actionTypes.SETINGREDIENTS:
                return{
                    ...state,
                    ingredients:action.ingredient,
                    error:false,
                    total:4
                }
        case actionTypes.FETCHINGREDIENTSERROR:
                return{
                    ...state,
                    error:action.error
                }        
        default : return state        
        
    }
    
}
export default burgerBuilderReducer;