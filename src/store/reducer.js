import * as actionTypes from './action';

const initialState={
    ingredients:{
        salad:0,
        bacon:0,
        cheese:0,
        meat:0
    },
    total:4
}
const reducer=(state=initialState,action)=>{
    switch(action.type)
    {
        case actionTypes.ADDINGREDIENT:
              return{
                ...state,
                ingredients:{
                    ...state.ingredients,
                    [action.ingredientName]:state.ingredients[action.ingredientName]+1
                }
            }  
        case actionTypes.REMOVEINGREDIENT:
                return{
                    ...state,
                    ingredients:{
                        ...state.ingredients,
                        [action.ingredientName]:state.ingredients[action.ingredientName]-1
                    }
        }

        
    }
    return state
}
export {reducer};