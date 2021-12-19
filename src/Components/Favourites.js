import React, { Component } from 'react'
import {movies} from "./getMovies";
export default class Favourites extends Component {
    render() {
        const movie = movies.results;
        console.log("movies : ",movies);
        return (
            <div className="main">
                <div className="row">
                    <div className="col-3">
                        <ul className="list-group favourites-genres">
                        <li className="list-group-item">All Genres</li>
                        <li className="list-group-item">Action</li>
                        <li className="list-group-item">Action</li>
                        <li className="list-group-item">Action</li>
                        <li className="list-group-item">Action</li>
                        </ul>
                    </div>
                    <div className="col-9 favourites-table">
                        <div className="row">
                            <input type="text" className="input-group-text col" />
                            <input type="number" className="input-group-text col" />
                        </div>
                        <div className="row">
                            <table class="table">
                                <thead>
                                    <tr>
                                    <th scope="col">Title</th>
                                    <th scope="col">Genre</th>
                                    <th scope="col">Popularity</th>
                                    <th scope="col">Rating</th>
                                    <th scope="col">Remove</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        movie.map((movieObj)=>(
                                            <tr>
                                            <td><img src={movieObj.movie_link}  alt="movie_img" className="fav-img mx-2" />{movieObj.movie_title}</td>
                                            <td>{movieObj.movie_title}</td>
                                            <td>{movieObj.genre}</td>
                                            <td>{movieObj.popularity}</td>
                                            <td>{movieObj.rating}</td>
                                            <td><button type="button" class="btn btn-danger">Delete</button></td>
                                            </tr>

                                        ))
                                    }
                                </tbody>
                            </table>
                        </div>
                        <div className=" d-flex justify-content-center">
                            <nav aria-label="Page navigation example">
                                <ul class="pagination">
                                    <li class="page-item"><a class="page-link" href="#">Previous</a></li>
                                    <li class="page-item"><a class="page-link" href="#">1</a></li>
                                    <li class="page-item"><a class="page-link" href="#">2</a></li>
                                    <li class="page-item"><a class="page-link" href="#">3</a></li>
                                    <li class="page-item"><a class="page-link" href="#">Next</a></li>
                                </ul>
                            </nav>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
