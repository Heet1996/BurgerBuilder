import React from 'react';
import classes from './Toolbar.css';
import Logo from '../../Logo/Logo';
let Toolbar=(props)=>(
    <header className={classes.Toolbar}>
        <div>Menu</div>
        <Logo/>
        <nav>
            ...
        </nav>
    </header>
);

export default Toolbar;