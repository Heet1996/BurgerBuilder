import React,{Component} from 'react';
import Aux from '../Auxillary';
import Modal from '../../components/UI/Modal/Modal';
const withErrroHandler=(WrappedComponent,axios)=>{
    return (
        class extends Component
        {   state={
            error:null
        }
            componentWillMount()
            {
               this.requestInterceptors= axios.interceptors.request.use(req=>{
                 this.setState({error:null});
                 return req;  
                })
                this.responseInterceptors=axios.interceptors.response.use(res=>res,error=>{
                       this.setState({
                           error:error
                       }) ;
                });
            }
            componentWillUnmount()
            {
                axios.interceptors.request.eject(this.requestInterceptors);
                axios.interceptors.response.eject(this.responseInterceptors);
            }
            errorConfirmHandler=()=>
            {
                this.setState({
                    error:null
                }) ;
            }
            render()
            {  
                 
               return (
                <Aux>
                    <WrappedComponent {...this.props}></WrappedComponent>
                    <Modal show={this.state.error} modalClosed={this.errorConfirmHandler}>
                        { this.state.error? this.state.error.message :null}
                    </Modal>
                </Aux>
                
                );

            }
        }
    )
}
export default withErrroHandler;