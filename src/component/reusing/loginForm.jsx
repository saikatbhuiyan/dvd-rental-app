import React, { Component } from 'react';

class LoginForm extends Component {

  state = {
    account: { username: '', password: '' }
  };

  // username = React.createRef(); // work like document.object.getElementById()
  // e = event object
  handleSubmit = e =>{

    e.preventDefault(); // didn't reload the page when click submit
    console.log('Submited');
    
  };

  handleChange = ({ currentTarget: input }) => {
    const account = {...this.state.account};
    // account.username = e.currentTarget.value;
    // account[e.currentTarget.name] = e.currentTarget.value;
    account[input.name] = input.value;

    this.setState({ account });
  };

  render() { 

    const { account } = this.state;

    return ( 
      <div className="container p-3 w-50 ">
        <form onSubmit={this.handleSubmit}> 
          <div className="form-group">
            <label htmlFor="username">Username</label>
            {/* <input autoFocus ref={this.username} id="username" type="text" className="form-control"/> */}
            <input 
              autoFocus 
              onChange={this.handleChange}
              value={account.username}
              name="username"
              id="username"
              type="text"
              className="form-control"
            />
            </div>
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input 
              onChange={this.handleChange}
              value={account.password}
              name="password"
              id="password"
              type="password"
              className="form-control"
            />
          </div>
          <button className="btn btn-primary">Submit</button>
        </form>
      </div>
     );
  }
}
 
export default LoginForm;
