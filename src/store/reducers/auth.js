import * as actionTypes from '../actions/actionTypes';


const initialState={
    token:null,
    userId:null,
    error:null,
    loading:false
};

let authReducer=(state=initialState,actions)=>{

    switch(actions.type)
    {
        case actionTypes.AUTH_START:return{...state,loading:true,error:null};
        case actionTypes.AUTH_SUCCESS: return{...state,userId:actions.payload.userId,error:null,loading:false,token:actions.payload.token};
        case actionTypes.AUTH_FAIL:return {...state,error:actions.err,loading:false};
        case actionTypes.AUTH_LOGOUT:return {...state,token:null,userid:null};
        default : return state;
    }
}

export default authReducer;