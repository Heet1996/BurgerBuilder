import React,{Component} from 'react';

import Aux from '../../hoc/Auxillary';
import Burger from '../../Component/Burger/Burger';

class BurgerBuilder extends Component
{
    render(){
        return (
            <Aux>
                <Burger></Burger>
                <div>Burger Controller</div>
            </Aux>
        )
    }
}

export default BurgerBuilder;