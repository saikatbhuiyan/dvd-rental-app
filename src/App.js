import React, { Component } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';


import Movies from './component/movies';


import Customers from './component/customers';
import Rentals from './component/rentals';
import NotFound from './component/notFound';
import NavBar from './component/reusing/navbar';
import MovieForm from './component/movieForm';

import './App.css';


class App extends Component {

  render() { 
    return ( 
      <React.Fragment>
        <NavBar />

        <main className="container">   
        <Switch >
              {/* <Route 
                  path="/" exact 
                  component={Movies}
              /> */}
              <Route 
                  path="/movies/:id" 
                  component={MovieForm}
              />
              <Route 
                  path="/movies" 
                  component={Movies}
              />
              <Redirect from='/' exact  to='/movies' />
              <Route 
                  path="/customers" 
                  component={Customers}
              />
              <Route 
                  path="/rentals" 
                  component={Rentals}
              />
              <Route 
                  path="/not-found" 
                  component={NotFound}
              />
              <Redirect to="/not-found" /> 
          </Switch>
      </main>
    </React.Fragment>
     );
  }
}
 
export default App;
