import React, { Component } from 'react';
import { toast } from 'react-toastify';
import MoviesTable from './movieTable';
import { getMovies, deleteMovie } from '../services/movieService';
import Pagination from './reusing/pagination';
import { paginate } from '../utils/paginate';
import { getGenres } from '../services/genreService';
import Group from './reusing/liist_group';
import _ from "lodash";
import { Link } from 'react-router-dom';
import SearchBox from './searchBox';
class Movies extends Component {

    state = {
        movies: [],
        genres: [],
        pageSize: 8,
        currentPage:1,
        searchQuery: "",
        selectedGenre: null,
        sortColumn: {path:'title', order: 'asc'}
     }

    async componentDidMount() {
        const { data } = await getGenres();
        const genres = [{ id:"", name: 'All Genres'}, ...data]
        // console.log(genres);
        const {data:movies} = await getMovies();
         this.setState({ movies: movies, genres });
     }
    
    handleDelete = async movie => {
        const originalMovies = this.state.movies;
        const movies = originalMovies.filter(m => m.id !== movie.id);
        this.setState({ movies });

        try {
          await deleteMovie(movie.id);
        }
        catch (ex) {
          if (ex.response && ex.response.status === 404 ){
            toast.error('This movie already been deleted!');
          }

          this.setState({movies: originalMovies});
        }

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

    handleGenreSelect = genre => {
        this.setState({ selectedGenre: genre, searchQuery: "", currentPage: 1 });
      };
    handleSort = sortColumn => {

        this.setState({ sortColumn });
    }

    getPagedData = () => {
        const {
          pageSize,
          currentPage,
          sortColumn,
          selectedGenre,
          searchQuery,
          movies: allMovies
        } = this.state;
    
        let filtered = allMovies;
        if (searchQuery)
          filtered = allMovies.filter(m =>
            m.title.toLowerCase().startsWith(searchQuery.toLowerCase())
          );
        else if (selectedGenre && selectedGenre.id)
          filtered = allMovies.filter(m => m.genre.id === selectedGenre.id);
    
        const sorted = _.orderBy(filtered, [sortColumn.path], [sortColumn.order]);
    
        const movies = paginate(sorted, currentPage, pageSize);
    
        return { totalCount: filtered.length, data: movies };
      };

    handleSearch = query => {
        this.setState({ searchQuery: query, selectedGenre: null, currentPage: 1 });
      };    

    render() { 

        const {length: count} = this.state.movies;
        const {currentPage, pageSize, sortColumn, searchQuery} = this.state;
        
        if (count === 0) return <p>There are no movies in the database.</p>;

       const { totalCount, data: movies } = this.getPagedData();

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
            <Link
                to="/movies/new"
                className="btn btn-primary"
                style={{ marginBottom: 20 }}
            >
                New Movie
            </Link>

                <p>Showing {totalCount} movies in the database.</p>
                <SearchBox value={searchQuery} onChange={this.handleSearch} />
                
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