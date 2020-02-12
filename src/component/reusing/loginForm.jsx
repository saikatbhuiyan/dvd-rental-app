import React, { Component } from 'react';
import Joi from 'joi-browser';

import Input from './input';

class LoginForm extends Component {

  state = {
    account: { username: '', password: '' },
    errors: {}
  };

  schema = {
    username: Joi.string().min(3).max(30).required().label('Username'),
    password: Joi.string().required().label('Password')
  }

  // username = React.createRef(); // work like document.object.getElementById()
  // e = event object


  handleSubmit = e =>{

    e.preventDefault(); // didn't reload the page when click submit

    const errors = this.validate();
    this.setState({ errors: errors || {} });
    if (errors) return;
    
  };

  validate = () => {
    const option = { abortEarly: false};
    const { error } = Joi.validate(this.state.account, this.schema, option);
    
    if(!error) return null;

    const errors = {};
    for (let item of error.details) errors[item.path[0]] = item.message;

  // const result = Joi.validate(this.state.account, this.schema, { abortEarly: false});
  // if(!result.error) return null;
    // const errors = {};
    // for (let item of result.error.details) errors[item.path[0]] = item.message;

    return errors;

    // const errors = {};

    // const { account } = this.state;

    // if (account.username.trim() === '' ) 
    //   errors.username = 'Username is required.';
      
    // if (account.password.trim() === '' ) 
    //   errors.password = 'Password is required.';

    // return Object.keys(errors).length === 0 ? null : errors ;  

  };


  validateProperty = ({ name, value }) => {

    const obj = { [name]: value};
    const schema = { [name]: this.schema[name] };

    const {error} = Joi.validate(obj, schema);

    return error ? error.details[0].message : null;

    // if (name === "username") {
    //   if (value.trim() === "") return "Username is required.";
      
    // }

    // if (name === "password") {
    //   if (value.trim() === "") return "Password is required.";
    // }
  };

  handleChange = ({ currentTarget: input }) => {

    const errors = {...this.state.errors};
    const errorMessage = this.validateProperty(input);
    if (errorMessage) errors[input.name] = errorMessage;
    else delete errors[input.name];


    const account = {...this.state.account};
    // account.username = e.currentTarget.value;
    // account[e.currentTarget.name] = e.currentTarget.value;
    account[input.name] = input.value;

    this.setState({ account, errors });
  };

  render() { 

    const { account, errors } = this.state;

    return ( 
      <div className="container p-3 w-50 ">
        <form onSubmit={this.handleSubmit}> 

            <Input 
              onChange={this.handleChange}
              value={account.username}
              name="username"
              label = 'Username'
              error = {errors.username}
            />
            <Input
              onChange={this.handleChange}
              value={account.password}
              name="password"
              label = 'Password'
              error = {errors.password}
            />

          <button disabled={this.validate()} className="btn btn-primary">Login</button>
        </form>
      </div>
     );
  }
}
 
export default LoginForm;
