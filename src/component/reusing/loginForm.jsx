import React from 'react';
import Joi from 'joi-browser';

import Form from './form';

class LoginForm extends Form {

  state = {
    data: { username: '', password: '' },
    errors: {}
  };

  schema = {
    username: Joi.string().min(3).max(30).required().label('Username'),
    password: Joi.string().required().label('Password')
  }

  // username = React.createRef(); // work like document.object.getElementById()
  // e = event object

  doSubmit = () => {
    console.log('Submit');
  };

  render() { 

    return ( 
      <div className="container p-3 w-50 ">
        <form onSubmit={this.handleSubmit}> 

          {this.renderInput('username', 'Username')}
          {this.renderInput('password', 'Password', 'password')}
        
          {this.renderButton('Login')}
        </form>
      </div>
     );
  }
}
 
export default LoginForm;
