import React,{Component} from 'react';

import Button from '../../../components/UI/Button/Button';
import classes from '../ContactForm/ContactForm.css';
import {checkValidity} from '../../../shared/checkValidity';
import * as orderActions from '../../../store/actions/index';
import Spinner from '../../../components/UI/Spinner/Spinner';
import Input from '../../../components/UI/Input/Input';
import {connect} from 'react-redux';
import withErrorHandler from '../../../hoc/withErrorHandler/withErrorHandler'
import axios from '../../../axios-order';

class Contact extends Component
{   
    
    state={
       
            orderForm: {
                name: {
                    elementType: 'input',
                    elementConfig: {
                        type: 'text',
                        placeholder: 'Your Name'
                    },
                    value: '',
                    validity:{
                        required:true,
                        valid:false,
                        minLength:3,
                        maxLength:15
                    },
                    touched:false
                },
                street: {
                    elementType: 'input',
                    elementConfig: {
                        type: 'text',
                        placeholder: 'Street'
                    },
                    validity:{
                        required:true,
                        valid:false
                    },
                    value: '',
                    touched:false
                },
                zipCode: {
                    elementType: 'input',
                    elementConfig: {
                        type: 'text',
                        placeholder: 'ZIP Code'
                    },
                    validity:{
                        required:true,
                        valid:false

                    },
                    value: '',
                    touched:false
                },
                country: {
                    elementType: 'input',
                    elementConfig: {
                        type: 'text',
                        placeholder: 'Country'
                    },
                    validity:{
                        required:true,
                        valid:false
                    },
                    value: '',
                    touched:false
                },
                email: {
                    elementType: 'input',
                    elementConfig: {
                        type: 'email',
                        placeholder: 'Your E-Mail'
                    },
                    validity:{
                        required:true,
                        valid:false
                    },
                    value: '',
                    touched:false
                },
                deliveryMethod: {
                    elementType: 'select',
                    elementConfig: {
                        options: [
                            {value: 'fastest', displayValue: 'Fastest'},
                            {value: 'cheapest', displayValue: 'Cheapest'}
                        ]
                    },
                    validity:{
                        required:false,
                        valid:true
                    },
                    value: 'fastest',
                    touched:false
                }
            },
        isFormValid:false
    }
    orderHandler=(event)=>{
        event.preventDefault();
        const formData = {};
        for (let formElementIdentifier in this.state.orderForm) {
            formData[formElementIdentifier] = this.state.orderForm[formElementIdentifier].value;
        }
        const order={
            ingredients:this.props.ings,
            price:this.props.totalPrice,
            orderData: formData,
            userId:this.props.userId
        }
        this.props.onOrder(order,this.props.token);
    }
    inputChangedHandler = (event, inputIdentifier) => {
        //Destructuring and making shallow copy of orderForm state (Making copy of state) 
        const updatedOrderForm = {
            ...this.state.orderForm
        };
        /*
        Destructuring and making shallow copy of orderForm[inputIdentifier] state (Making copy of a state) 
        e.g. orderForm['deliveryMethod']
        */
        const updatedFormElement = { 
            ...updatedOrderForm[inputIdentifier]
        };

        updatedFormElement.value = event.target.value;
        updatedFormElement.touched=true;
        /*
         Checking required validation for orderForm[inputIdentifier]

        */
        updatedFormElement.validity.valid=checkValidity(updatedFormElement.value,updatedFormElement.validity);

        let isFormValid=true;
        /*
            Validating the form with each validation
        */
        
        for(let inputElement in updatedOrderForm)
            isFormValid=updatedOrderForm[inputElement].validity.valid && isFormValid;
        
        //Assigning new value to the updatedOrderForm    
        updatedOrderForm[inputIdentifier] = updatedFormElement;
        this.setState({orderForm: updatedOrderForm,isFormValid:isFormValid});
        
    }
    render()
    {   
        const formElementsArray = [];
        for (let key in this.state.orderForm) {
            formElementsArray.push({
                id: key,
                config: this.state.orderForm[key]
            });
        }
        let form = (
            <form onSubmit={this.orderHandler}>
                {formElementsArray.map(formElement => (
                    <Input 
                        key={formElement.id}
                        elementType={formElement.config.elementType}
                        elementConfig={formElement.config.elementConfig}
                        value={formElement.config.value}
                        shouldValidate={formElement.config.validity}
                        notValid={!formElement.config.validity.valid}
                        changed={(event) => this.inputChangedHandler(event, formElement.id)} 
                        touched={formElement.config.touched}
                        />
                ))}
                <Button btnType="Success" disabled={!this.state.isFormValid}>ORDER</Button>
            </form>
        );
        if ( this.props.loading ) {
            form = <Spinner />;
        }
        return (
            <div className={classes.ContactForm}>
                <h4>Enter your Contact Data</h4>
                {form}
            </div>
        );
    }
}
const mapStateToProps=(state)=>{
    return {
        ings:state.burger.ingredients,
        totalPrice:state.burger.total,
        loading:state.order.loading,
        token:state.auth.token,
        userId:state.auth.userId
    }
}
const mapDispatchToProps=(dispatch)=>{
    return {
        onOrder:(orderData,token)=>dispatch(orderActions.purchaseBurger(orderData,token))
    }
}
export default connect(mapStateToProps,mapDispatchToProps)(withErrorHandler(Contact,axios));