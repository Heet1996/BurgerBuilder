import React,{Component} from 'react';
import Button from '../../../components/UI/Button/Button';
import classes from '../ContactForm/ContactForm.css';
class Contact extends Component
{   
    state={
        name:'',
        email:'',
        address:{
            city:'',
            zipCode:''
        }
    }
    render()
    {
        return(
            <form className={classes.ContactForm}>
                <input name="name" type="text" placeholder="Name"  />
                <input name="email" type="email" placeholder="Email" />
                <input name="city" type="text" placeholder="City" />
                <input name="zipCode" type="text" placeholder="zipCode"  />
                <Button btnType="Success">Order</Button>
            </form>
        )
    }
}

export default Contact;