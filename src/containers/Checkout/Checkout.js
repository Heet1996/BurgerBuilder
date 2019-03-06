import React,{Component} from 'react';

import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';
import ContactForm from '../Checkout/ContactForm/ContactForm';

import {Route} from 'react-router';
class Checkout extends Component
{   
    state={
        ingredients:{
            salad:1,
            bacon:1,
            cheese:1,
            meat:1

        }
    }
    componentDidMount()
    {
        const query=new URLSearchParams(this.props.location.search);
        const ingredients={};
        for(let param of query.entries())
        {
            ingredients[param[0]]=+param[1];
        }
        console.log(ingredients);
        this.setState({ingredients});
        console.log(this.state.ingredients);
    }
    checkoutCancelled=()=>{
        this.props.history.goBack();
    }
    checkoutContinue=()=>{

        this.props.history.replace('/checkout/contact-data');
    }
    render()
    {
        return(
            <div>
                <CheckoutSummary 
                checkoutCancelled={this.checkoutCancelled}
                checkoutContinue={this.checkoutContinue}
                ingredients={this.state.ingredients} />
                <Route path={this.props.match.path + '/contact-data'} component={ContactForm} />
            </div>
            
        )
    }
}

export default Checkout;