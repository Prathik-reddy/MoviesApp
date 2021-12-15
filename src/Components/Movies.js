import React, { Component } from 'react'
// import {movies} from "./getMovies";
import axios from "axios";
export default class Movies extends Component {

    constructor(){
        super();
        this.state={
            hover:"",
            para:[1],
            currentPage:1,
            movies:[],
        }
    }
    async componentDidMount(){
        const res =await axios.get(`https://api.themoviedb.org/3/movie/popular?api_key=f9a0187bf8155bed27d7981ebda9e17d&language=en-US&page=${this.state.currentPage}`)
        let data =  res.data;
        console.log(data);
        this.setState({
            movies:[...data.results]
        })
    }
    render() {
        // let movie = movies.results;
        // console.log(movie);
        console.log("render");
        return (
            <>
                {
                    this.state.movies.length===0 ?
                    <div className="spinner-border text-primary" role="status">
                    <span className="visually-hidden">Loading...</span>
                    </div>:
                    <div>
                        <h1 className="text-center"><strong>Trending</strong></h1>
                        <div className="movies-list">
                            {
                                this.state.movies.map((movieObj)=>(
                                    <div className="card movies-card text-center "  onMouseEnter={()=>this.setState({hover:movieObj.id})}
                                    onMouseLeave={()=>this.setState({hover:""})}>
                                    {/* <img src={movieObj.backdrop_path} className="card-img-top movies-img" alt="..."/> */}
                                    <img src={`https://image.tmdb.org/t/p/original${movieObj.backdrop_path}`}  alt={movieObj.title} className="card-img-top movies-img"/>
                                        <h3 className="card-title movies-title">{movieObj.original_title}</h3>
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
