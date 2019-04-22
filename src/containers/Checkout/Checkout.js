import React,{Component} from 'react';

import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';
import ContactForm from '../Checkout/ContactForm/ContactForm';

import {Route} from 'react-router';
import {connect} from 'react-redux';

class Checkout extends Component
{   
   
    
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
                ingredients={this.props.ings} />
                <Route path={this.props.match.path + '/contact-data'} 
                component={ContactForm}/>)} />
            </div>
            
        )
        
    }
}

const mapStateToProps=(state)=>{
            return {ings:state.ingredients}
}

export default connect(mapStateToProps,null)(Checkout);