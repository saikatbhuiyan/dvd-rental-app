import React from 'react';
import Joi from 'joi-browser';

import Form from './form';

class NewMovies extends Form {

  state = {
    data: { title: '', stock: null, rate: null },
    value: 'coconut',
    errors: {}
  };

  schema = {
    title: Joi.string().required().label('Title'),
    stock: Joi.number().integer().min(0).required().label('Number in Stock'),
    rate: Joi.number().integer().min(0).max(10).required().label('Rate')
    
  }


  doSubmit = () => {
    console.log('Submit');
  };

  handleChange(event) {
    this.setState({value: event.target.value});
  }

  render() { 

    return ( 
      <div className="container p-3 col-6 ">
        <form onSubmit={this.handleSubmit}> 

          {this.renderInput('text', 'Text')}
          {this.renderInput('stock', 'Stock', 'number')}
          {this.renderInput('rate', 'Rate', 'number')}
          <label>
          Pick your favorite flavor:
          <select value={this.state.value} onChange={this.handleChange}>
            <option value="grapefruit">Grapefruit</option>
            <option value="lime">Lime</option>
            <option value="coconut">Coconut</option>
            <option value="mango">Mango</option>
          </select>
        </label>
        
          {this.renderButton('Register')}
        </form>
      </div>
     );
  }
}
 
export default NewMovies;
