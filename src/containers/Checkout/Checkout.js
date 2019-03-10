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

        },
        totalPrice:0
    }
    componentDidMount()
    {
        const query=new URLSearchParams(this.props.location.search);
        const ingredients={};
        let price=0;
        for(let param of query.entries())
        {   
            if(param[0]==='price')
            price=param[1];
            else
            ingredients[param[0]]=+param[1];
        }
        
        this.setState({ingredients:ingredients,totalPrice:price});
        
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
                <Route path={this.props.match.path + '/contact-data'} 
                render={(props)=>(<ContactForm ingredients={this.state.ingredients} totalPrice={this.state.totalPrice}  {...this.props}/>)} />
            </div>
            
        )
    }
}

export default Checkout;