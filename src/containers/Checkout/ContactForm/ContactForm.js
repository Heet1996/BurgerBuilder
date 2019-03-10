import React,{Component} from 'react';
import Button from '../../../components/UI/Button/Button';
import classes from '../ContactForm/ContactForm.css';

import axiosInstance from '../../../axios-order';
import Spinner from '../../../components/UI/Spinner/Spinner';
class Contact extends Component
{   
    state={
        name:'',
        email:'',
        address:{
            city:'',
            zipCode:''
        },
        loading:false
    }
    orderHandler=(event)=>{
        event.preventDefault();
        this.setState({
            loading:'true'
        })
        const order={
            ingredients:this.props.ingredients,
            price:this.props.totalPrice,
            customer:{
                name:'Heet Shah',
                address:{
                    street:'test purpose',
                    country:'Finland',
                    zipcode:'213123'
                },
                email:'tets@test.com',
                deliveryMtehod:'fastest'
            }
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
    render()
    {   let form=
        (
                
                <form>
                <input name="name" type="text" placeholder="Name"  />
                <input name="email" type="email" placeholder="Email" />
                <input name="city" type="text" placeholder="City" />
                <input name="zipCode" type="text" placeholder="zipCode"  />
                <Button btnType="Success" clicked={this.orderHandler}>Order</Button>
                </form>
            );
        if(this.state.loading) form = <Spinner/>
        
        return (
            <div className={classes.ContactForm}>
                <h2>We hope it taste's well!</h2>
                {form}
            </div>
        );
    }
}

export default Contact;