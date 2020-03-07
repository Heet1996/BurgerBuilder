import React,{Component} from 'react';
import {connect} from 'react-redux';

import Input from '../../components/UI/Input/Input';
import Button from '../../components/UI/Button/Button';
import Spinner from '../../components/UI/Spinner/Spinner';

import classes from './Auth.css';

import * as actions from '../../store/actions/index';
import { Redirect } from 'react-router';


class Auth extends Component
{
    state={
        controllers:{
            Email:{
                elementType: 'input',
                elementConfig: {
                    type: 'email',
                    placeholder: 'Your E-Mail'
                },
                validity:{
                    required:true,
                    valid:false,
                    isEmail:true
                },
                value: '',
                touched:false
            },
            Password:{
                elementType: 'input',
                elementConfig: {
                    type: 'password',
                    placeholder: 'Enter Password'
                },
                validity:{
                    required:true,
                    valid:false,
                    min:6,
                    max:14
                },
                value: '',
                touched:false
            }
        },
        isFormValid:false,
        isSignUp:false
    }
    
    

    validateEmail(email) {
        var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(String(email).toLowerCase());
    }
    checkValidity(val,rules)
    {   let isValid=true;
        if(rules.required)
        isValid=(val.trim()!=='') && isValid;
        if(rules.min)
        isValid=(val.length>rules.min) && isValid;
        if(rules.max)
        isValid=(val.length<rules.max) && isValid;
        if(rules.isEmail)
        isValid=this.validateEmail(val) && isValid;
        return isValid;
    }
   inputChangedHandler(event,id)
    {   
        
        let updateControl={...this.state.controllers};
        let updateControlId=updateControl[id];
        updateControlId.value=event.target.value;
        updateControlId.touched=true;
        updateControlId.validity.valid=this.checkValidity(updateControlId.value,updateControlId.validity);
        let isFormValid=true;
        for(let element in updateControl)
        isFormValid=updateControl[element].validity.valid && isFormValid;
        this.setState({
            controllers:updateControl,
            isFormValid:isFormValid
        })
        
    }
    onAuth=(event)=>
    {
        event.preventDefault(); 
        this.props.onLogin(this.state.controllers['Email'].value,this.state.controllers['Password'].value,this.state.isSignUp);
        //this.props.history.length>0?this.props.history.goBack():this.props.history.push('/');
        let {from}=this.props.location.state || {from:{pathname:'/'}};
        this.props.history.push(from);
    }
    switchAuthModedeHandler=()=>{
        this.setState(prevState=>{
            
            return {isSignUp:!prevState.isSignUp};
        })
    }
    render()
    {
        const formElementsArray=[];
        for(let key in this.state.controllers)
        {
            formElementsArray.push({
                id:key,
                config:this.state.controllers[key]
            })
        }
        let form=formElementsArray.map((control)=>
            <Input 
                key={control.id}
                elementType={control.config.elementType}
                elementConfig={control.config.elementConfig}
                value={control.config.value}
                shouldValidate={control.config.validity}
                notValid={!control.config.validity.valid}
                changed={(event) => this.inputChangedHandler(event, control.id)} 
                touched={control.config.touched}
                label={control.id}    
            />
            
        

        );
        
        form=this.props.isAuth?(<Redirect to="/" />):(<React.Fragment>
            
            <form onSubmit={this.onAuth}>
                    {form}
                    <Button btnType="Success" disabled={!this.state.isFormValid}>Submit</Button>
                </form>
                    <Button 
                    btnType="Danger"
                    clicked={this.switchAuthModedeHandler}
                    >Switch to {this.state.isSignUp ? 'LogIn' : 'SignUp'}</Button>
        </React.Fragment>) ;
        if(this.props.loading) form=<Spinner />
        return (
            <div className={classes.Auth}>
               
               <p> {this.props.errorMessage} </p>
                {form}
                
            </div>
                )

    }

}
let mapStatetoProps=(state)=>{
    return {loading:state.auth.loading,errorMessage:state.auth.error,isAuth:state.auth.token};
}
let mapDispatchToProps=(dispatch)=>{
    return {onLogin:(email,password,isSignUp)=>dispatch(actions.auth(email,password,isSignUp))}
}

export default connect(mapStatetoProps,mapDispatchToProps)(Auth);