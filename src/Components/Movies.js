import React, { Component } from 'react'
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
        const res = await axios.get(`https://api.themoviedb.org/3/movie/popular?api_key=f9a0187bf8155bed27d7981ebda9e17d&language=en-US&page=${this.state.currentPage}`)
        let data =  res.data;
        // console.log(data);
        this.setState({
            movies:[...data.results]
        })
    }
    changeMovies=async()=>{
        const res = await axios.get(`https://api.themoviedb.org/3/movie/popular?api_key=f9a0187bf8155bed27d7981ebda9e17d&language=en-US&page=${this.state.currentPage}`)
        let data =  res.data;
        // console.log(data);
        this.setState({
            movies:[...data.results]
        })
    }

    handleRight=async()=>{
        let tempArr=[];
        for(let i=1; i<=this.state.para.length+1; i++){
            tempArr.push(i);
            // console.log("para",i);
        }
        this.setState({
            para:[...tempArr],
            currentPage:this.state.currentPage+1,
        },this.changeMovies)
    }

    handleLeft=async()=>{
        if(this.state.currentPage!==1){
            this.setState({
                currentPage:this.state.currentPage-1
            },this.changeMovies)
        }
    }

    handleClick=async(value)=>{
        if(value!==this.state.currentPage)
            this.setState({
                currentPage:value
            },this.changeMovies)
    }

    render() {
        // console.log(this.state.currentPage);

        return (
            <>
                {/* <Banner/> */}
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
                                    <li class="page-item"><a class="page-link" onClick={this.handleLeft}>Previous</a></li>

                                    {
                                        this.state.para.map((value)=>(
                                            <li class="page-item"><a class="page-link" onClick={()=>{this.handleClick(value)}}>{value}</a></li>
                                        ))
                                    }
                                    <li class="page-item"><a class="page-link" onClick={this.handleRight}>Next</a></li>
                                </ul>
                                </nav>
                        </div>
                    </div>
                }
            </>
        )
    }
}
