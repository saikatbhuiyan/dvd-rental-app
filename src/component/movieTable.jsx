import React, { Component } from 'react';
import Like from './reusing/like';
import Table from './reusing/table';
import { Link } from 'react-router-dom';

class MoviesTable extends Component {
  
  columns = [
  { path: "title", label: "Title", content: movie => <Link to={`/movies/${movie.id}`}>{movie.title}</Link> },
    { path: "genre.name", label: "Genre" },
    { path: "numberInStock", label: "Stock" },
    { path: "dailyRentalRate", label: "Rate" },
    { key:'like', content: movie => <Like liked={movie.liked} onLike={() => this.props.onLike(movie)} />},
    { key:'delete', content: movie => <button  onClick={() => this.props.onDelete(movie)} className="btn btn-danger">Delete</button> }
  ];
  
  render() {

   
    const { movies, onSort, sortColumn } = this.props;

    return ( 
      
      <Table 
        columns={this.columns}
        data={movies}
        sortColumn={sortColumn}
        onSort={onSort}
      />
    
     );
  }
}


export default MoviesTable;

