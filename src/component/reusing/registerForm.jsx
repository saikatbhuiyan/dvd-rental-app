import React from 'react';
import Joi from 'joi-browser';

import Form from './form';

class RegisterForm extends Form {

  state = {
    data: { username: '', email: '', password: '' },
    errors: {}
  };

  schema = {
    username: Joi.string().min(3).max(30).required().label('Username'),
    email: Joi.string().email({ minDomainAtoms: 2 }).required().label('Email'),
    password: Joi.string().min(5).required().label('Password')
    
  }


  doSubmit = () => {
    console.log('Submit');
  };

  render() { 

    return ( 
      <div className="container p-3 col-6 ">
        <form onSubmit={this.handleSubmit}> 

          {this.renderInput('username', 'Username')}
          {this.renderInput('email', 'Email', 'email')}
          {this.renderInput('password', 'Password', 'password')}
        
          {this.renderButton('Register')}
        </form>
      </div>
     );
  }
}
 
export default RegisterForm;
