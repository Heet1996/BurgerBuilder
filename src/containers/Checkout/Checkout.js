import React,{Component} from 'react';

import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';
import ContactForm from '../Checkout/ContactForm/ContactForm';

import {Route,Redirect} from 'react-router-dom';
import {connect} from 'react-redux';
import * as actionTypes from '../../store/actions/actionTypes';

class Checkout extends Component
{   
    componentWillMount()
    {
        this.props.onInitPurchase();
    }
    checkoutCancelled=()=>{
        this.props.history.goBack();
    }
    checkoutContinue=()=>{

        this.props.history.replace('/checkout/contact-data');
    }
    render()
    {   let summary=<Redirect to='/' />
        let purchase=this.props.purchase ? <Redirect to='/' /> :null;
        if(this.props.ings)

            {   
                summary=    (
                            <div>
                            {purchase}
                            <CheckoutSummary 
                            checkoutCancelled={this.checkoutCancelled}
                            checkoutContinue={this.checkoutContinue}
                            ingredients={this.props.ings} />
                            <Route path={this.props.match.path + '/contact-data'} 
                            component={ContactForm}/>
                        </div>)
            }
        return summary
        
    }
}

const mapStateToProps=(state)=>{
            return {
                ings:state.burger.ingredients,
                purchase:state.order.purchase
            }
}
const mapDispatchToProps=(dispatch)=>{
            return {
                onInitPurchase:()=>dispatch({type:actionTypes.PURCHASEINIT})
            }
}
export default connect(mapStateToProps,mapDispatchToProps)(Checkout);