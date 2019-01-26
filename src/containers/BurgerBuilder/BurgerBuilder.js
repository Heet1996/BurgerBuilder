import React, { Component } from 'react';

import Aux from '../../hoc/Auxillary';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControllers/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary'

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
        totalPrice:0,
        purchaseState:false,
        purchaseStatus:false
    };
    addIngredients=(type)=>{
        let updatedIngredients={...this.state.ingredients};
        let count=this.state.ingredients[type]+1;
        updatedIngredients[type]=count;
        let price=this.state.totalPrice + INGREDIENTS_PRICE[type];
        this.updatePurchaseState(updatedIngredients);
        this.setState({ingredients:updatedIngredients,totalPrice:price});
    }
    removeIngredients=(type)=>{
        let updatedIngredients={...this.state.ingredients};
        let count=this.state.ingredients[type]-1;
        updatedIngredients[type]=count;
        let price=this.state.totalPrice - INGREDIENTS_PRICE[type];
        this.updatePurchaseState(updatedIngredients);
        this.setState({ingredients:updatedIngredients,totalPrice:price});
        
    }
    updatePurchaseState=(ingredients)=>{ 
        let sum=Object.keys(ingredients).map((key)=>{
            return ingredients[key];
        }).reduce((sum,el)=>sum +el);
        console.log(sum);
        if(sum>0)
        this.setState({purchaseState:true});
        else this.setState({purchaseState:false});

        
    }
    purchaseHandler=()=>{
        this.setState({purchaseStatus:true});
    }
    render () {
        let disabledInfo={...this.state.ingredients};
        for(let i in disabledInfo)
        {   
            disabledInfo[i]=disabledInfo[i]<=0;
        }
        
        return (
            <Aux>
                <Burger ingredients={this.state.ingredients} />
                <Modal show={this.state.purchaseStatus}>
                    <OrderSummary ingredients={this.state.ingredients} />
                </Modal>
                <BuildControls 
                addIngredients={this.addIngredients} 
                removeIngredients={this.removeIngredients} 
                disabledInfo={disabledInfo}
                price={this.state.totalPrice}
                purchaseState={this.state.purchaseState}
                purchaseHandler={this.purchaseHandler}
                />
            </Aux>
        );
    }
}

export default BurgerBuilder;