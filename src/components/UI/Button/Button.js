import React from 'react';
import classes from './Button.css';

const btn=(props)=>(
    <button className={[classes.Button,classes.Button[props.classType]].join(' ')}>
        {props.children}
    </button>
);
export default btn;