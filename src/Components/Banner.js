import React, { Component } from 'react';
import {movies} from "./getMovies";

export default class Banner extends Component {
    render() {
        let movie = movies.results[0];
        console.log(movie);
        return (
            movie===""?<div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Loading...</span>
            </div>:
            <div>
                <div className="card banner-card">
                <img src={movie.movie_link} className="card-img-top banner-img" alt="..."/>
                    <h1 className="card-title banner-title">{movie.movie_title}</h1>
                    <p className="card-text banner-text">{movie.movie_text}</p>
                </div>
            </div>
        )
    }
}
