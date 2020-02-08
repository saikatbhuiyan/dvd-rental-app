import React from 'react'

import {Link, NavLink} from 'react-router-dom';

// import Customers from '../customers';
// import Rentals from '../rentals';
// import Movies from '../movies';

// Link is real time this is not reload the page only update item
// server didn't send the additional request to the server
const NavBar = () => {
  return ( 
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
        <span className="navbar-toggler-icon"></span>
      </button>
      <Link className='navbar-brand' to="/">Vidly</Link>
      <div className="collapse navbar-collapse" id="navbarNav">
        <ul className='navbar-nav'>
          <li className='nav-item'>
            <NavLink className='nav-link' to="/movies">Movies</NavLink>
          </li>
          <li className='nav-item'>
            <NavLink className='nav-link' to="/customers">Customers</NavLink>
          </li>
          <li className='nav-item'>
            <NavLink className='nav-link' to="/rentals">Rentals</NavLink>
          </li>
        </ul>
      </div>
    </nav>

   );
}
 
export default NavBar;