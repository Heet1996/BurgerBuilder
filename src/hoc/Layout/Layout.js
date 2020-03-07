import React, { Component } from 'react';
import {connect} from 'react-redux';
import {Redirect} from 'react-router-dom';

import classes from './Layout.css';
import Toolbar from '../../components/Navigation/Toolbar/Toolbar';
import SideDrawer from '../../components/Navigation/SideDrawer/SideDrawer';
import {AuthProvider} from '../../store/context/AuthContext';
import Modal from '../../components/UI/Modal/Modal';
import Button from '../../components/UI/Button/Button';
import * as actions from '../../store/actions/index';

class Layout extends Component {
    state = {
        showSideDrawer: false,
        toogle:false
    }

    sideDrawerClosedHandler = () => {
        this.setState( { showSideDrawer: false } );
    }

    sideDrawerToggleHandler = () => {
        this.setState( ( prevState ) => {
            return { showSideDrawer: !prevState.showSideDrawer };
        } );
    }
    toogleShow=()=>{
            this.setState({toogle:!this.state.toogle});
    }
    doLogout=()=>{

        this.props.doLogout();
        this.toogleShow();
        <Redirect to='/auth' />
    }
    cancelLogout=()=>this.toogleShow();
    render () {
        return (
            <AuthProvider value={{auth:this.props.isAuth,clicked:this.toogleShow}}>
                <Toolbar 
                drawerToggleClicked={this.sideDrawerToggleHandler}
                
                />
                <SideDrawer
                    open={this.state.showSideDrawer}
                    closed={this.sideDrawerClosedHandler} />
                <main className={classes.Content}>
                    {this.props.children}
                </main>
                <Modal show={this.state.toogle} modalClosed={this.toogleShow}>
                        <div className="container">
                            <h3>Do you want to logout ?</h3>
                            <Button btnType="Success" clicked={this.doLogout}>Yes</Button>
                            <Button btnType="Danger" clicked={this.cancelLogout}> No</Button>
                        </div>
                </Modal>
            </AuthProvider>
        )
    }
}

let mapStateToProps=(state)=>{return {isAuth:state.auth.token}};
let mapDispatchToProps=(dispatch)=>{ return {doLogout:()=>dispatch(actions.logout())}}
export default connect(mapStateToProps,mapDispatchToProps)(Layout);