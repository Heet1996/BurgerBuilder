import React,{Component} from 'react';
import Button from '../../../components/UI/Button/Button';
import classes from '../ContactForm/ContactForm.css';

import axiosInstance from '../../../axios-order';
import Spinner from '../../../components/UI/Spinner/Spinner';
import Input from '../../../components/UI/Input/Input';
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
                    }
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
                    value: ''
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
                    value: ''
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
                    value: ''
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
                    value: ''
                },
                deliveryMethod: {
                    elementType: 'select',
                    elementConfig: {
                        options: [
                            {value: 'fastest', displayValue: 'Fastest'},
                            {value: 'cheapest', displayValue: 'Cheapest'}
                        ]
                    },
                    validity:false,
                    value: ''
                }
            },
        loading:false
    }
    orderHandler=(event)=>{
        event.preventDefault();
        this.setState({
            loading:'true'
        });
        const formData = {};
        for (let formElementIdentifier in this.state.orderForm) {
            formData[formElementIdentifier] = this.state.orderForm[formElementIdentifier].value;
        }
        const order={
            ingredients:this.props.ingredients,
            price:this.props.totalPrice,
            orderData: formData
        }
        axiosInstance.post('/orders.json',order)
                    .then(res=>{
                        this.setState({
                            loading:false
                        });
                        this.props.history.push('/');
                    })
                    .catch((err)=>console.log(err));
    }
    checkValidity=(values,rules)=>{
        let isValid=true;
        if(rules.required)
        isValid=values.trim()!=='' && isValid;
        if(rules.minLength)
        isValid=values.length>=rules.minLength && isValid;
        if(rules.maxLength)
        isValid=values.length<=rules.maxLength && isValid
        return isValid;

    }
    inputChangedHandler = (event, inputIdentifier) => {
        const updatedOrderForm = {
            ...this.state.orderForm
        };
        const updatedFormElement = { 
            ...updatedOrderForm[inputIdentifier]
        };
        updatedFormElement.value = event.target.value;
        updatedOrderForm[inputIdentifier] = updatedFormElement;
        updatedFormElement.validity.valid=this.checkValidity(updatedFormElement.value,updatedFormElement.validity);
        this.setState({orderForm: updatedOrderForm});
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
                        changed={(event) => this.inputChangedHandler(event, formElement.id)} />
                ))}
                <Button btnType="Success">ORDER</Button>
            </form>
        );
        if ( this.state.loading ) {
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

export default Contact;