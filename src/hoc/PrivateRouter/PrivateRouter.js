import { Route, Redirect } from "react-router"
import React,{useContext} from 'react';
import AuthContext from '../../store/context/AuthContext';

let PrivateRoute=({component:Component,...rest})=>{
    let context=useContext(AuthContext);
    return(
        <Route {...rest} render={(props)=>
            context.auth ? <Component {...props} /> : <Redirect to="/auth" />
        } />
        
    )

}
export default PrivateRoute;