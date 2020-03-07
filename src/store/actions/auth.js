import axios from 'axios';  
import * as actionTypes from './actionTypes';

 let authStart=()=>{
    return {
        type:actionTypes.AUTH_START
    }
}

 let authFail=(err)=>{
    return {
        type:actionTypes.AUTH_FAIL,
        err:err
    }
}

 let authSuccess=(token,userId)=>{
    localStorage.setItem('token',token);
     
    return {
        type:actionTypes.AUTH_SUCCESS,
        payload:{token,userId}
    }
}
export let logout=()=>{
    localStorage.removeItem('expirationTime');
    localStorage.removeItem('token');
    return {
        type:actionTypes.AUTH_LOGOUT
    }
}

let checkInExpire=(expireTime)=>{
    return (dispatch)=>
    setTimeout(()=>{
        console.log(expireTime);
        dispatch(logout());
    },expireTime*1000);

}
export let auth=(email,password,isSignUp)=>{
    return dispatch=>{
        dispatch(authStart());
        let credentials={
            email:email,
            password:password,
            returnSecureToken:true
        }
        
        let url='https://www.googleapis.com/identitytoolkit/v3/relyingparty/signupNewUser?key=AIzaSyBQHlY7z4PCMBXpLN3BmaDsWdAsUaPK-tA';
        if(!isSignUp) url='https://www.googleapis.com/identitytoolkit/v3/relyingparty/verifyPassword?key=AIzaSyBQHlY7z4PCMBXpLN3BmaDsWdAsUaPK-tA'
        axios.post(url,credentials)
             .then((response)=>{
                 
                dispatch(authSuccess(response.data.idToken,response.data.localId));
                let expirationTime=new Date(new Date().getTime()+response.data.expiresIn*1000);
                localStorage.setItem('expirationTime',expirationTime);
                localStorage.setItem('userId',response.data.localId);
                dispatch(checkInExpire(response.data.expiresIn));    
             })   
             .catch((err)=>{
                dispatch(authFail(err.response.data.error.message));
             })
    }

}

export let authCheckState=()=>(dispatch)=>{
        const token=localStorage.getItem('token');
        if(!token)
        dispatch(logout());
        else{
            let expirationTime=new Date(localStorage.getItem('expirationTime'));
            
             if(expirationTime>new Date())
               {
                   
                   dispatch(authSuccess(token,localStorage.getItem('userId')));
                   //console.log(expirationTime.getMinutes()-new Date().getMinutes());
                   dispatch(checkInExpire((expirationTime.getTime()-new Date().getTime())/1000)) ;
            }
            else dispatch(logout());
            
        }


}
