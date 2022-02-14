import './App.css';
import React, { Component } from 'react'
import Navbar from './components/Navbar';
import News from './components/News';
import { Routes, Route, Link } from "react-router-dom";
import LoadingBar from 'react-top-loading-bar'

export default class App extends Component {
  state = {progress :0 , searchedTerm : ""}
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
        <Routes>
          <Route exact path="/" element={<News apiKey={this.apiKey} setProgress ={this.setProgress}  pageSize={9} key="general" country="in" category="general" />} />
          <Route exact path="/science" element={<News apiKey={this.apiKey} setProgress ={this.setProgress}  pageSize={9} key="science" country="in" category="science" />} />
          <Route exact path="/business" element={<News apiKey={this.apiKey} setProgress ={this.setProgress}  pageSize={9} key="business" country="in" category="business" />} />
          <Route exact path="/entertainment" element={<News apiKey={this.apiKey} setProgress ={this.setProgress}  pageSize={9}  key="entertainment" country="in" category="entertainment" />} />
          <Route exact path="/sports" element={<News apiKey={this.apiKey} setProgress ={this.setProgress}  pageSize={9} country="in" key="sports" category="sports" />} />
          <Route exact path="/technology" element={<News apiKey={this.apiKey} setProgress ={this.setProgress}  pageSize={9} country="in" key="technology" category="technology" />} />
          <Route exact path="/health" element={<News apiKey={this.apiKey} setProgress ={this.setProgress}  pageSize={9} country="in"key="health" category="health" />} />
          <Route exact path="/searchQuery" element={<News apiKey={this.apiKey} setProgress ={this.setProgress}  pageSize={9} key="general" country="in" category="general" />} />
        </Routes>
      </div>
    )
  }
}



