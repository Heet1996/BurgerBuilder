import React from 'react';
import classes from './Logo.css';

import imgSrc from '../../assets/127 burger-logo.png'; 
let Logo=()=>(
    <div className={classes.Logo}>
        <img src={imgSrc} alt="MyBurger"/>
    </div>
);
export default Logo