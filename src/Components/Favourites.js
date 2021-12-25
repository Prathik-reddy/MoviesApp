import React, { Component } from 'react'
import {movies} from "./getMovies";
export default class Favourites extends Component {

    constructor(props) {
        super();
        this.state={
            genres: [],
            currgen:'All Genres',
            movies:[],
            currTxt : "",
            limit : 5,
            currPage:1,
        }
    }
    componentDidMount(){
        let data = JSON.parse(localStorage.getItem("movies")||"[]");

        let genreids = {28:'Action',12:'Adventure',16:'Animation',35:'Comedy',80:'Crime',99:'Documentary',18:'Drama',10751:'Family',14:'Fantasy',36:'History',
        27:'Horror',10402:'Music',9648:'Mystery',10749:'Romance',878:'Sci-Fi',10770:'TV',53:'Thriller',10752:'War',37:'Western'};
        let temp = [];
        data.forEach((moviesObj) => {
            if(!temp.includes(genreids[moviesObj.genre_ids[0]])){
               temp.push(genreids[moviesObj.genre_ids[0]]);
            }
        })
        temp.unshift("All Genres");
        this.setState({
            genres:[...temp],
            movies:[...data],
        })
    }

    handleGenreChange=(genre)=>{
        this.setState({
            currgen:genre
        })
    }
    sortPopAsc=()=>{
        let temp = this.state.movies;
        temp.sort(function(a,b){
            return a.popularity-b.popularity;
        })
        this.setState({
            movies:[...temp]
        })
    }
    sortPopDesc=()=>{
        let temp = this.state.movies;
        temp.sort(function(a,b){
            return b.popularity-a.popularity;
        })
        this.setState({
            movies:[...temp]
        })
    }
    sortRatingAsc=()=>{
        let temp = this.state.movies;
        temp.sort(function(a,b){
            return a.vote_average-b.vote_average;
        })
        this.setState({
            movies:[...temp]
        })
    }
    sortRatingDesc=()=>{
        let temp = this.state.movies;
        temp.sort(function(a,b){
            return b.vote_average-a.vote_average;
        })
        this.setState({
            movies:[...temp]
        })
    }
    handlePageChange=(page)=>{
        this.setState({
            currPage:page,
        })
    }
    handleDelete=(id)=>{
        let newarr = [];
        newarr = this.state.movies.filter((movieObj)=>movieObj.id!=id)
        this.setState({
            movies:[...newarr]
        })
        localStorage.setItem("movies",JSON.stringify(newarr))
    }
    render() {
        let genreids = {28:'Action',12:'Adventure',16:'Animation',35:'Comedy',80:'Crime',99:'Documentary',18:'Drama',10751:'Family',14:'Fantasy',36:'History',
        27:'Horror',10402:'Music',9648:'Mystery',10749:'Romance',878:'Sci-Fi',10770:'TV',53:'Thriller',10752:'War',37:'Western'};

        let filterArray = [];
        if(this.state.currTxt==""){
            filterArray = this.state.movies;
        }else{
            filterArray = this.state.movies.filter((movieObj)=>{
                let title = movieObj.original_title.toLowerCase();
                return title.includes(this.state.currTxt.toLowerCase())
            })
        }
        if(this.state.currgen!="All Genres"){
            filterArray = this.state.movies.filter((movieObj)=>genreids[movieObj.genre_ids[0]]==this.state.currgen)
        }
        let pages = Math.ceil(filterArray.length / this.state.limit);
        let pagesArr = [];
        for(let i = 1; i <= pages; i++){
            pagesArr.push(i);
        }
        console.log(pagesArr);
        let si = (this.state.currPage-1)*this.state.limit;
        let ei = si+this.state.limit;
        filterArray = filterArray.slice(si,ei);
        return (
            <div className="main">
                <div className="row mx-2">
                    <div className="col-md-3 col-sm-12">
                        <ul className="list-group favourites-genres">
                        {
                            this.state.genres.map((genre) => (
                                this.state.currgen == genre ?
                                <li class="list-group-item" style={{background:'#3f51b5',color:'white',fontWeight:'bold'}} >{genre}</li> :
                                <li class="list-group-item" style={{background:'white',color:'#3f51b5'}} onClick={()=>this.handleGenreChange(genre)}>{genre}</li>
                            ))
                        }

                        </ul>
                    </div>
                    <div className="col-md-9 favourites-table col-sm-12">
                        <div className="row">
                            <input type="text" className="input-group-text col"placeholder="Search" value={this.state.currTxt} onChange={(e)=>this.setState({currTxt:e.target.value})}/>
                            <input type="number" className="input-group-text col" placeholder="Rows Count" value={this.state.limit} onChange={(e)=>this.setState({limit:e.target.value})}/>
                        </div>
                        <div className="row mx-2">
                            <table class="table">
                                <thead>
                                    <tr>
                                    <th scope="col">Title</th>
                                    <th scope="col">Genre</th>
                                    <th scope="col"><i class="fas fa-sort-up" onClick={this.sortPopAsc}></i> Popularity <i class="fas fa-sort-down"  onClick={this.sortPopDesc}></i></th>
                                    <th scope="col"><i class="fas fa-sort-up"  onClick={this.sortRatingAsc}></i> Rating <i class="fas fa-sort-down"  onClick={this.sortRatingDesc}></i></th>
                                    <th scope="col">Remove</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        filterArray.map((movieObj)=>(
                                            <tr>
                                            <td><img src={`https://image.tmdb.org/t/p/original${movieObj.backdrop_path}`} alt={movieObj.title} style={{width:'5rem'}}/> {movieObj.original_title}</td>
                                            <td>{genreids[movieObj.genre_ids[0]]}</td>
                                            <td>{movieObj.popularity}</td>
                                            <td>{movieObj.vote_average}</td>
                                            <td><button type="button" class="btn btn-danger" onClick={()=>this.handleDelete(movieObj.id)}>Delete</button></td>
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
                                    {
                                            pagesArr.map((page)=>(
                                                <li class="page-item"><a class="page-link" onClick={()=>this.handlePageChange(page)}>{page}</a></li>
                                            ))
                                        }
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
