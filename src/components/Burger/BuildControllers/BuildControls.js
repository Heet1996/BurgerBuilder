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
        {controls.map((val)=>(
            <BuildControl
                key={val.label}
                label={val.label}
            />
        ))}
    </div>
)
export default buildControls;