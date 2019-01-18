import React from 'react';

import Aux from '../../hoc/Auxillary';
let Layout=(props)=>(
    <Aux>
        <div>
        Toolbars,sidebars,backdrop
        </div>
        <main>
            {props.children}
        </main>
    </Aux>
    
);
export default Layout;