import React from 'react';
import Joi from 'joi-browser';

import Form from './reusing/form';
import { getGenres } from '../services/genreService';
import { saveMovie, getMovie } from '../services/movieService';

class MovieForm extends Form {
  state = {
    data: {
      title: '',
      genre: '',
      numberInStock: '',
      dailyRentalRate: '',
    },
    genres: [],
    errors: {},
  };

  schema = {
    id: Joi.string(),
    title: Joi.string().required().label('Title'),
    genre: Joi.number().required().label('Genre'),
    numberInStock: Joi.number()
      .integer()
      .min(0)
      .max(100)
      .required()
      .label('Number in Stock'),

    dailyRentalRate: Joi.number()
      .integer()
      .min(0)
      .max(100)
      .required()
      .label('Daily Rental Rate'),
  };

  async populateGenres() {
    const { data: genres } = await getGenres();
    this.setState({ genres });
  }

  async populateMovie() {
    try {
      const movieId = this.props.match.params.id;

      if (movieId === 'new') return;

      const { data: movie } = await getMovie(movieId);
      console.log(this.mapToViewModel(movie));
      this.setState({ data: this.mapToViewModel(movie) });
    } catch (ex) {
      if (ex.respose && ex.respose.status === 404) {
        this.props.history.replace('/not-found');
      }
    }
  }

  async componentDidMount() {
    await this.populateGenres();
    await this.populateMovie();
  }

  mapToViewModel(movie) {
    return {
      id: movie.id,
      title: movie.title,
      genre: movie.genre.id,
      numberInStock: movie.numberInStock,
      dailyRentalRate: movie.dailyRentalRate,
    };
  }

  doSubmit = async () => {
    await saveMovie(this.state.data);
    // console.log(this.state.data);
    this.props.history.push('/movies');
  };

  render() {
    return (
      <div>
        <h1>Movie Form</h1>

        <form onSubmit={this.handleSubmit}>
          {this.renderInput('title', 'Title')}
          {this.renderSelect('genre', 'Genre', this.state.genres)}
          {this.renderInput('numberInStock', 'Number In Stock', 'number')}
          {this.renderInput('dailyRentalRate', 'Rate')}
          {this.renderButton('Save')}
        </form>
      </div>
    );
  }
}

export default MovieForm;
