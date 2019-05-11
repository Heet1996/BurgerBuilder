import React,{Component} from 'react';

import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';
import ContactForm from '../Checkout/ContactForm/ContactForm';

import {Route,Redirect} from 'react-router-dom';
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
    {   let summary=<Redirect to='/' />

        if(this.props.ings)
            summary=    <div>
                            <CheckoutSummary 
                            checkoutCancelled={this.checkoutCancelled}
                            checkoutContinue={this.checkoutContinue}
                            ingredients={this.props.ings} />
                            <Route path={this.props.match.path + '/contact-data'} 
                            component={ContactForm}/>
                        </div>
        return summary
        
    }
}

const mapStateToProps=(state)=>{
            return {ings:state.burger.ingredients}
}

export default connect(mapStateToProps,null)(Checkout);