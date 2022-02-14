import './App.css';
import React, { Component } from 'react'
import Navbar from './components/Navbar';
import News from './components/News';
import { Routes, Route, Link } from "react-router-dom";
import LoadingBar from 'react-top-loading-bar'
import SearchedNews from './components/SearchedNews';


export default class App extends Component {
  state = {progress :0 ,searchQuery: "hello"}
  apiKey = process.env.REACT_APP_API_KEY;

    setProgress= (progress)=>{
        this.setState({progress :progress})
    }

  render() {
    return (
      <div> 
        <LoadingBar
        height={3}
        color='#f11946'
        progress={this.state.progress}
      />
        <Navbar />
        <div className="container my-6">
        <form id="container-fluid form-id" className="d-flex">
              <input className="form-control me-2" id="search-box" type="search" placeholder="Search" aria-label="Search" />
              <Link className="nav-link active" aria-current="page" to="/searchQuery" >
                
                <button id="search" className="btn btn-outline-success" type="button" onClick={ ()=>{
                  console.log("Before: " + this.state.searchQuery)
              
                  this.setState({searchQuery : document.getElementById('search-box').value})
                  console.log("After: " + this.state.searchQuery)
                }
                  }  >Search</button>
              </Link>

            </form>
            </div>
        <Routes>
          <Route exact path="/" element={<News apiKey={this.apiKey} setProgress ={this.setProgress}  pageSize={9} key="general" country="in" category="general" />} />
          <Route exact path="/science" element={<News apiKey={this.apiKey} setProgress ={this.setProgress}  pageSize={9} key="science" country="in" category="science" />} />
          <Route exact path="/business" element={<News apiKey={this.apiKey} setProgress ={this.setProgress}  pageSize={9} key="business" country="in" category="business" />} />
          <Route exact path="/entertainment" element={<News apiKey={this.apiKey} setProgress ={this.setProgress}  pageSize={9}  key="entertainment" country="in" category="entertainment" />} />
          <Route exact path="/sports" element={<News apiKey={this.apiKey} setProgress ={this.setProgress}  pageSize={9} country="in" key="sports" category="sports" />} />
          <Route exact path="/technology" element={<News apiKey={this.apiKey} setProgress ={this.setProgress}  pageSize={9} country="in" key="technology" category="technology" />} />
          <Route exact path="/health" element={<News apiKey={this.apiKey} setProgress ={this.setProgress}  pageSize={9} country="in"key="health" category="health" />} />
          <Route exact path="/searchQuery" element={<SearchedNews apiKey={this.apiKey} setProgress ={this.setProgress}  pageSize={9} key="searchedQuery" searchedTerm ={this.state.searchQuery}/>} />
        </Routes>
      </div>
    )
  }
}


