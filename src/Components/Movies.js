import React, { Component } from 'react'
import {movies} from "./getMovies";

export default class Movies extends Component {

    constructor(){
        super();
        this.state={
            hover:"",
            para:[1]
        }
    }

    render() {
        let movie = movies.results;
        console.log(movie);
        return (
            <>
                {
                    movie.length===0 ?
                    <div className="spinner-border text-primary" role="status">
                    <span className="visually-hidden">Loading...</span>
                    </div>:
                    <div>
                        <h1 className="text-center"><strong>Trending</strong></h1>
                        <div className="movies-list">
                            {
                                movie.map((movieObj)=>(
                                    <div className="card movies-card text-center "  onMouseEnter={()=>this.setState({hover:movieObj.id})}
                                    onMouseLeave={()=>this.setState({hover:""})}>
                                    <img src={movieObj.movie_link} className="card-img-top movies-img" alt="..."/>
                                        <h3 className="card-title movies-title">{movieObj.movie_title}</h3>
                                        <p className="card-text movies-text">{movieObj.movie_text}</p>
                                        <div className="btn-wrapper">
                                            {
                                                this.state.hover===movieObj.id &&
                                                <a className="btn btn-primary movies-btn">Add to favorites</a>
                                            }
                                        </div>
                                    </div>
                                ))
                            }
                        </div>
                        <div className="d-flex justify-content-center">
                            <nav aria-label="Page navigation example">
                                <ul class="pagination">
                                    <li class="page-item"><a class="page-link" href="#">Previous</a></li>

                                    {
                                        this.state.para.map((value)=>(
                                            <li class="page-item"><a class="page-link" href="#">{value}</a></li>
                                        ))
                                    }
                                    <li class="page-item"><a class="page-link" href="#">Next</a></li>
                                </ul>
                                </nav>
                        </div>
                    </div>
                }
            </>
        )
    }
}
