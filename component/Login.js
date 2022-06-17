import React,{Component} from 'react'
import Form from '../common/Form'
import Joi from 'joi-browser'
class Login extends Form{
  state={
    data:{username:'', password:''},
    errors:{}     
  }
  schema={
    username:Joi.string().required().label('Username'),
    password:Joi.string().required().label('Password')
  }
  
  handleSubmit=(e)=>{
     e.preventDefault();
     const errors = this.validate();
   
     this.setState({errors: errors|| {}})

     if(errors) return

     this.doSubmit()

     
  }
  doSubmit = () => {
    //call server
     console.log('Submitted')
  }
 
 
  render(){
    return (
    <div>
       <h1>Login</h1>
       <form onSubmit={this.handleSubmit}>
         {this.renderInput('username','Username','text')}
         {this.renderInput('password','Password','password')}
          
        {this.renderButton('Login')}
       </form>

    </div>
   
  )
  }
  
}
export default Login