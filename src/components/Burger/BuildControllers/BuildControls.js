import React from 'react';

import BuildControl from './BuildController/BuildControl';
import classes from './BuidControls.css';

const controls=[
    {label:'Salad',type:'salad'},
    {label:'Bacon',type:'bacon'},
    {label:'Meat',type:'meat'},
    {label:'Cheese',type:'cheese'}
]
let buildControls=(props)=>(
    <div className={classes.BuildControls}>
        <p>Current Price : <strong>{props.price.toFixed(2)}</strong></p>
        {controls.map((val)=>(
            <BuildControl
                key={val.label}
                label={val.label}
                add={()=>props.addIngredients(val.type)}
                remove={()=>props.removeIngredients(val.type)}
                disabled={props.disabledInfo[val.type]}
                
            />
        ))}
        <button 
        className={classes.OrderButton} 
        disabled={!props.purchaseState}
        onClick={props.purchaseHandler}>Order Now</button>
    </div>
)
export default buildControls;