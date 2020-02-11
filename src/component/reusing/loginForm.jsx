import React, { Component } from 'react';

import Input from './input';

class LoginForm extends Component {

  state = {
    account: { username: '', password: '' },
    errors: {}
  };

  // username = React.createRef(); // work like document.object.getElementById()
  // e = event object

  validate = () => {

    const errors = {};

    const { account } = this.state;

    if (account.username.trim() === '' ) 
      errors.username = 'Username is required.';
      
    if (account.password.trim() === '' ) 
      errors.password = 'Password is required.';

    return Object.keys(errors).length === 0 ? null : errors ;  
  };


  handleSubmit = e =>{

    e.preventDefault(); // didn't reload the page when click submit

    const errors = this.validate();
    this.setState({ errors: errors || {} });
    if (errors) return;
    
  };

  validateProperty = ({ name, value }) => {
    if (name === "username") {
      if (value.trim() === "") return "Username is required.";
      
    }

    if (name === "password") {
      if (value.trim() === "") return "Password is required.";
    }
  }

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
      
          <button className="btn btn-primary">Submit</button>
        </form>
      </div>
     );
  }
}
 
export default LoginForm;
