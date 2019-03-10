import React from 'react';
import classes from './Order.css';
const Order=(props)=>{
    let ingredients=[];
    for(let key in props.ingredients)
    ingredients.push({name:key,amount:props.ingredients[key]});
         
    let ingredientsOutput=ingredients
                            .map((ig)=>(<span 
                                        key={ig.name} 
                                        style={{
                                            textTransform:'capitalize',
                                            display:'inline-block',
                                            padding:'5px',
                                            border:'1px solid #ccc',
                                            margin:'0 8px'    
                                        }}>{ig.name} ({ig.amount})</span> ))

    return (
        <div className={classes.Order}>
            <p>Ingredients : {ingredientsOutput}</p>    
            <p>Total Price: $ {props.orderPrice.toFixed(2)}</p>
        </div>
    )
}

export default Order;