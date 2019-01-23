import React, { Component } from 'react';

import Aux from '../../hoc/Auxillary';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControllers/BuildControls';
const INGREDIENTS_PRICE={salad:4,bacon:5,meat:6,cheese:2};
class BurgerBuilder extends Component {
    // constructor(props) {
    //     super(props);
    //     this.state = {...}
    // }
    state = {
        ingredients: {
            salad: 0,
            bacon: 0,
            cheese: 0,
            meat: 0
        },
        totalPrice:0
    };
    addIngredients=(type)=>{
        let updatedIngredients={...this.state.ingredients};
        let count=this.state.ingredients[type]+1;
        updatedIngredients[type]=count;
        let price=this.state.totalPrice + INGREDIENTS_PRICE[type];
        this.setState({ingredients:updatedIngredients,totalPrice:price});
        
    }
    render () {
        return (
            <Aux>
                <Burger ingredients={this.state.ingredients} />
                <BuildControls addIngredients={this.addIngredients} />
            </Aux>
        );
    }
}

export default BurgerBuilder;