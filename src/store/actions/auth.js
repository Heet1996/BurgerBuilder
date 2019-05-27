import axios from 'axios';  
import * as actionTypes from './actionTypes';

 let authStart=()=>{
    return {
        type:actionTypes.AUTH_START
    }
}

 let authFail=(err)=>{
    return {
        type:actionTypes.AUTH_START,
        err:err
    }
}

 let authSuccess=(token)=>{
    return {
        type:actionTypes.AUTH_START,
        payload:token
    }
}
export let auth=(email,password,isSignUp)=>{
    return dispatch=>{
        dispatch(authStart());
        let credentials={
            email:email,
            password:password,
            returnSecureToken:true
        }
        console.log(isSignUp);
        let url='https://www.googleapis.com/identitytoolkit/v3/relyingparty/signupNewUser?key=AIzaSyBQHlY7z4PCMBXpLN3BmaDsWdAsUaPK-tA';
        if(!isSignUp) url='https://www.googleapis.com/identitytoolkit/v3/relyingparty/verifyPassword?key=AIzaSyBQHlY7z4PCMBXpLN3BmaDsWdAsUaPK-tA'
        axios.post(url,credentials)
             .then((response)=>{
                 console.log(response.data);
                dispatch(authSuccess(response.data))
             })   
             .catch((err)=>{
                dispatch(authFail(err));
             })
    }
}