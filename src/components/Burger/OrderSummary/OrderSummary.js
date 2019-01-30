import React from 'react';
import Aux from '../../../hoc/Auxillary';
import Btn from '../../UI/Button/Button';
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
                    <li>Total Sum : {props.purchasePrice.toFixed(2)}</li>
                </ul>
                <p>Continue to Checkout ?</p>
                <Btn classType="Danger" click={props.purchaseCancel}>CANCEL</Btn>
                <Btn classType="Success" click={props.purchaseContinue}>CONTINUE</Btn>
            </Aux>
    )
}
export default OrderSummary;