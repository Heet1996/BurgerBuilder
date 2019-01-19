import React from 'react';

import Aux from '../../hoc/Auxillary';
import classes from '../Layout/Layout.module.scss';

let Layout=(props)=>(
    <Aux>
        <div>
        Toolbars,sidebars,backdrop
        </div>
        <main className={classes.Component}>
            {props.children}
        </main>
    </Aux>
    
);
export default Layout;