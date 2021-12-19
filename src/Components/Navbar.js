import React, { Component } from 'react'

export default class Navbar extends Component {
    render() {
        return (
            <div style={{display:"flex",padding:"0.5rem"}}>
                <h1>Movies App</h1>
                <h4 className="fav">Favorites </h4>
            </div>
        )
    }
}
