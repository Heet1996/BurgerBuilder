import React,{Component} from 'react';

import Order from '../../components/Order/Order';
import axios from '../../axios-order';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';

class Orders extends Component
{   state={
    orders:null,
    loading:true
}
    componentDidMount()
    {
        axios.get('/orders.json')
            .then(res=>{
                
                const fetchData=[];
                for(let key in res.data)
                fetchData.push({...res.data[key],key})
                this.setState({orders:fetchData,loading:false});
                console.log(this.state.orders);
            }).catch((err)=>{
                console.log(err);
            })
    }
    render()
    {
        let orderList=<Spinner/>;
        if(!this.state.loading) 
        orderList=this.state.orders
        .map((order)=>(<Order 
            key={order.key} 
            orderPrice={+order.price} 
            ingredients={order.ingredients} />))
        return (
            <div>
            {orderList}
            </div>
            )
            
        
    }
}

export default withErrorHandler(Orders,axios);