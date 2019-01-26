import React from 'react';
import Aux from '../../../hoc/Auxillary';
const OrderSummary=(props)=>{
    
    const ingredientSummary=Object.keys(props.ingredients).map((igkey)=>{
                return (<span style={{textTransform:'capitalize'}}>
                        <li key={igkey+props.ingredients[igkey]}>{igkey}:{props.ingredients[igkey]}</li>
                        </span>)
    });
    return (
            <Aux>
                <h3>Your Order Summary</h3>
                <p>A delicious burger with following ingredients:</p>
                <ul>
                    {ingredientSummary}
                </ul>
                <p>Continue to Checkout ?</p>
            </Aux>
    )
}
export default OrderSummary;