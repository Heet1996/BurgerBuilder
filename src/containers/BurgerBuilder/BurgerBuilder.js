import React, { Component } from 'react';
import {connect} from 'react-redux';

import Aux from '../../hoc/Auxillary';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import * as action from '../../store/actions/index';
import axiosInstance from '../../axios-order';
import * as actionTypes from '../../store/actions/actionTypes';





class BurgerBuilder extends Component {
    // constructor(props) {
    //     super(props);
    //     this.state = {...}
    // }
    
    state = {
    
        purchasing: false
        
    }
    componentDidMount()
    {
        // axiosInstance.get('https://react-burgerbuilder-a3bac.firebaseio.com/ingredients.json')
        //              .then((res)=>{
        //                 this.setState({
        //                     ingredients:res.data
        //                 })
        //              })
        //              .catch((err)=>this.setState({error:true}));   
        
        this.props.initIng();
        
        
        
    }
    updatePurchaseState () {
        const sum = Object.keys( this.props.ing )
            .map( igKey => {
                return this.props.ing[igKey];
            } )
            .reduce( ( sum, el ) => {
                return sum + el;
            }, 0 );
            
        return  sum > 0 ;
    }

    // addIngredientHandler = ( type ) => {
    //     const oldCount = this.props.ings[type];
    //     const updatedCount = oldCount + 1;
    //     const updatedIngredients = {
    //         ...this.props.ings
    //     };
    //     updatedIngredients[type] = updatedCount;
        
        
    //     this.updatePurchaseState(updatedIngredients);
    // }

    // removeIngredientHandler = ( type ) => {
    //     const oldCount = this.props.ings[type];
    //     if ( oldCount <= 0 ) {
    //         return;
    //     }
    //     const updatedCount = oldCount - 1;
    //     const updatedIngredients = {
    //         ...this.props.ings
    //     };
    //     updatedIngredients[type] = updatedCount;
    //     const priceDeduction = INGREDIENT_PRICES[type];
    //     const oldPrice = this.state.totalPrice;
    //     const newPrice = oldPrice - priceDeduction;
    //     this.setState( { totalPrice: newPrice, ingredients: updatedIngredients } );
    //     this.updatePurchaseState(updatedIngredients);
    // }

    purchaseHandler = () => {
        if(this.props.isAuth)
        this.setState({purchasing: true});
        else this.props.history.push({pathname:'/auth',state:{from:'/checkout'}})
    }

    purchaseCancelHandler = () => {
        this.setState({purchasing: false});
    }

    purchaseContinueHandler = () => {
        // alert('You continue!');
      /*  this.setState({
            loading:'true'
        })
        const order={
            ingredients:this.state.ingredients,
            price:this.state.totalPrice,
            customer:{
                name:'Heet Shah',
                address:{
                    street:'test purpose',
                    country:'Finland',
                    zipcode:'213123'
                },
                email:'tets@test.com',
                deliveryMtehod:'fastest'
            }
        }
        axiosInstance.post('/orders.json',order)
                    .then(res=>{
                        this.setState({
                            loading:false,
                            purchasing:false
                        })
                    })
                    .catch((err)=>console.log(err)); */
                    this.props.onInitPurchase();
                    this.props.history.push('/checkout');           
                    
    }

    render () {
        const disabledInfo = {
            ...this.props.ing
        };
        for ( let key in disabledInfo ) {
            disabledInfo[key] = disabledInfo[key] <= 0
        }
        // {salad: true, meat: false, ...}
        let orderSummary;
        let burgerStatus=this.props.error?<p>Can't fetch the Ingredients</p>:<Spinner />;

        if(this.props.ing)
        {       
            orderSummary=<OrderSummary 
            ingredients={this.props.ing}
            price={this.props.totalPrice}
            purchaseCancelled={this.purchaseCancelHandler}
            purchaseContinued={this.purchaseContinueHandler} />;
            burgerStatus=<Aux>
                <Burger ingredients={this.props.ing} />
                <BuildControls
                    ingredientAdded={this.props.onIngAdded}
                    ingredientRemoved={this.props.onIngRemoved}
                    disabled={disabledInfo}
                    purchasable={this.updatePurchaseState()}
                    ordered={this.purchaseHandler}
                    price={this.props.totalPrice} 
                    isAuth={this.props.isAuth}/>
            </Aux>
            
        }
        return (
            <Aux>
                <Modal show={this.state.purchasing} modalClosed={this.purchaseCancelHandler}>
                    {orderSummary}
                </Modal>
                {burgerStatus}
            </Aux>
        );
    }

}
const mapStateToProps=(state)=>{
   
    return { ing:state.burger.ingredients,totalPrice:state.burger.total,error:state.burger.error,isAuth:state.auth.token }
 }
const mapDispatchToProps=(dispatch)=>{
   
   return { onIngAdded:(ingName)=>dispatch(action.addIngredients(ingName)),
            onIngRemoved:(ingName)=>dispatch(action.removeIngredients(ingName)),
            initIng:()=>dispatch(action.initIngredients()),
            onInitPurchase:()=>dispatch({type:actionTypes.PURCHASEINIT})
               
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(withErrorHandler(BurgerBuilder,axiosInstance));