import React from 'react'
import Form from '../common/Form'
import Joi from 'joi-browser'
class Register extends Form{
   state={
    data:{username:'', password:'',name:''},
    errors:{}     
  }
  schema={
    username:Joi.string().email().required().label('Username'),
    password:Joi.string().required().min(5).label('Password'),
    name:Joi.string().required().label('Name')
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
     return(
    <div>
          <h1>Register</h1>
       <form onSubmit={this.handleSubmit}>
         {this.renderInput('username','Username','text')}
         {this.renderInput('password','Password','password')}
         {this.renderInput('name','Name','text')}
          
        {this.renderButton('Register')}
       </form>

    </div>
     )
   }
}

export default Register