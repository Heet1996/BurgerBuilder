import React from 'react';
import classes from './Button.css';

const btn=(props)=>(
    <button onClick={props.click} className={[classes.Button,classes[props.classType]].join(' ')}>
        {props.children}
    </button>
);
export default btn;