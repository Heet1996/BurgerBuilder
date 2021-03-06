import React,{Component} from 'react';

import Order from '../../components/Order/Order';
import axios from '../../axios-order';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import * as orderActions from '../../store/actions/index' 
import {connect} from 'react-redux';


class Orders extends Component
{   
    componentDidMount()
    { 
       this.props.fetchOrder(this.props.token);   
    }
    render()
    {
        let orderList=<Spinner/>;
        
        if(!this.props.loading) 
        {
        
        orderList=this.props.order.map((order)=>(<Order 
            key={order.key} 
            orderPrice={+order.price} 
            ingredients={order.ingredients} />))
           
        }
        return (
            <div>
            {orderList}
            </div>
            )
        
            
        
    }
}

let mapStateToProps=(state)=>{
    return {
            order:state.order.orders,
            loading:state.order.loading,
            err:state.order.err,
            token:state.auth.token,
            fetchOrder:state.order.fetchOrder
        }
}
let mapDispacthToProps=(dispatch)=>{
    return {
        fetchOrder:(token)=>dispatch(orderActions.fetchOrder(token))
    }
}
export default connect(mapStateToProps,mapDispacthToProps)(withErrorHandler(Orders,axios));