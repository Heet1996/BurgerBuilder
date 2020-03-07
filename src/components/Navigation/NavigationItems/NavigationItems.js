import React,{useContext} from 'react';
import AuthContext from '../../../store/context/AuthContext';

import classes from './NavigationItems.css';
import NavigationItem from './NavigationItem/NavigationItem';
import Button from '../../UI/Button/Button'


const navigationItems = (props) => {
    
    let context=useContext(AuthContext);
    return (
    <ul className={classes.NavigationItems}>
        <NavigationItem link="/" active exact>Burger Builder</NavigationItem>
        {context.auth?<NavigationItem link="/orders">Orders</NavigationItem>:null}
        {context.auth?<Button btnType="Success" clicked={context.clicked}>Logout</Button>:<NavigationItem link="/auth">Auth</NavigationItem>}

    </ul>
)};

export default navigationItems;