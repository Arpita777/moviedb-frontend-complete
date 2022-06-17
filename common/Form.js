import React from 'react'
import Input from './Input'
import Select from './Select'
import Joi from 'joi-browser'
class Form extends React.Component{
  state={
    data:{},
    errors:{}  
  }
   validateProperty = ({name,value}) => {
    const obj = {[name]:value};
    const schema = {[name]: this.schema[name]}
    const result = Joi.validate(obj,schema)
    return result.error ? result.error.details[0].message:null
    
  }
  validate=()=>{
    const result = Joi.validate(this.state.data,this.schema,{abortEarly:false});
    console.log(result.error)
    if(!result.error) return null
    const errors={}
    result.error.details.map(item => errors[item.path[0]]=item.message)
    return errors;
  
  }

   handleChange=e=>{
    const errors={...this.state.errors}
    const errorMessage=this.validateProperty(e.target)
    console.log(errorMessage)
    if(errorMessage){
      errors[e.target.name]=errorMessage
    }
    else{
      delete errors[e.target.name]
    }
    const data={...this.state.data}
    data[e.target.name]=e.target.value;
    this.setState({data,errors})
  }
  renderButton(label){
    return <button 
           className='btn btn-primary'
           disabled={this.validate()}
           >{label}
          </button>
  }
  renderInput(name,label,type='text'){
   
    return <Input name={name}
                value={this.state.data[name]}
                onChange={this.handleChange}
                error={this.state.errors[name]}
                label={label}
                type={type}
                
          />
  }
  renderSelect(name,label,options){
   
    return <Select name={name}
                value={this.state.data[name]}
                onChange={this.handleChange}
                error={this.state.errors[name]}
                label={label}
                options={options}
                
          />
  }
  
  
 
}
export default Form