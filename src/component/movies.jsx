import React, { Component } from 'react';
import MoviesTable from './movieTable';
import { getMovies } from '../services/fakeMovieService';
import Pagination from './reusing/pagination';
import { paginate } from '../utils/paginate';
import { getGenres } from '../services/fakeGenreService';
import Group from './reusing/liist_group';
import _ from "lodash";

class Movies extends Component {

    state = {
        movies: [],
        genres: [],
        pageSize: 8,
        currentPage:1,
        sortColumn: {path:'title', order: 'asc'}
     }

     componentDidMount() {

        const genres = [{ _id:"", name: 'All Genres'}, ...getGenres()]

         this.setState({ movies: getMovies(), genres });
     }
    
    handleDelete = movie => {
        const movies = this.state.movies.filter(m => m._id !== movie._id);
        this.setState({ movies });
      };
    
    handleLike = (movie) => {
        const movies = [...this.state.movies];
        const index = movies.indexOf(movie);
        movies[index] = { ...movies[index] };
        movies[index].liked = !movies[index].liked;
        this.setState({movies});
    }

    handlePageChange = (page) => {
        this.setState({currentPage: page});
    }

    handleGenreSelect = (genre) => {
        this.setState({selectedGenre: genre, currentPage:1 })
    }

    handleSort = sortColumn => {

        this.setState({ sortColumn });
    }

    getPageData =() => {
        const {currentPage, pageSize, selectedGenre, movies: allMovies, sortColumn} = this.state;
        const filtered = 
            selectedGenre && selectedGenre._id 
            ? allMovies.filter(m => m.genre._id === selectedGenre._id) 
            : allMovies ;

        const sorted = _.orderBy(filtered, [sortColumn.path], [sortColumn.order]);
        const movies = paginate(sorted, currentPage, pageSize);

        return { totalCount: filtered.length, data:movies };

    };

    render() { 

        const {length: count} = this.state.movies;
        const {currentPage, pageSize, sortColumn} = this.state;
        
        if (count === 0) return <p>There are no movies in the database.</p>;

       const { totalCount, data: movies } = this.getPageData();

        return ( 

        <div className='row p-5'>
            <div className="col-3">
                <Group 
                    items = {this.state.genres}
                    onSelectGenre = {this.handleGenreSelect}
                    currentItem = {this.state.selectedGenre} 
                />
            </div>

            <div className="col">
            <p>Showing {totalCount} movies in the database.</p>
            
            <MoviesTable
                movies={movies}
                sortColumn={sortColumn}
                onLike={this.handleLike}
                onDelete={this.handleDelete}
                onSort={this.handleSort}
            />
            <Pagination 
                itemCount={totalCount} 
                pageSize={pageSize} 
                currentPage={currentPage} 
                onPageChange={this.handlePageChange} 
            />
            </div>
        </div>
           
         );
    }
}
 
export default Movies;