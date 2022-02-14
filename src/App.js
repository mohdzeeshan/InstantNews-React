import './App.css';
import React, { useState } from 'react'
import News from './components/News';
import { Routes, Route, Link } from "react-router-dom";
import LoadingBar from 'react-top-loading-bar'
import SearchedNews from './components/SearchedNews';
import Navbar from './components/Navbar';


const App =()=> {
  const [progress, setProgress] = useState(0)
  const [searchQuery, setSearchQuery] = useState("india")
  const apiKey = process.env.REACT_APP_API_KEY;

  
    return (
      <div> 
        <LoadingBar
        height={3}
        color='#f11946'
        progress={progress}
      />
       <Navbar/>
        <div className="container my-6">
        <form id="container-fluid form-id" className="d-flex">
              <input className="form-control me-2" id="search-box" type="search" placeholder="Search" aria-label="Search" />
              <Link className="nav-link active" aria-current="page" to="/searchQuery" >
                
                <button id="search" className="btn btn-outline-success" type="button" onClick={ ()=>{
                  console.log("Before: " + searchQuery)
              
                  setSearchQuery(document.getElementById('search-box').value)
                  console.log("After: " + searchQuery)
                }
                  }  >Search</button>
              </Link>

            </form>
            </div>
        <Routes>
          <Route exact path="/" element={<News apiKey={apiKey} setProgress ={setProgress}  pageSize={9} key="general" country="in" category="general" />} />
          <Route exact path="/science" element={<News apiKey={apiKey} setProgress ={setProgress}  pageSize={9} key="science" country="in" category="science" />} />
          <Route exact path="/business" element={<News apiKey={apiKey} setProgress ={setProgress}  pageSize={9} key="business" country="in" category="business" />} />
          <Route exact path="/entertainment" element={<News apiKey={apiKey} setProgress ={setProgress}  pageSize={9}  key="entertainment" country="in" category="entertainment" />} />
          <Route exact path="/sports" element={<News apiKey={apiKey} setProgress ={setProgress}  pageSize={9} country="in" key="sports" category="sports" />} />
          <Route exact path="/technology" element={<News apiKey={apiKey} setProgress ={setProgress}  pageSize={9} country="in" key="technology" category="technology" />} />
          <Route exact path="/health" element={<News apiKey={apiKey} setProgress ={setProgress}  pageSize={9} country="in"key="health" category="health" />} />
          <Route exact path="/searchQuery" element={<SearchedNews apiKey={apiKey} setProgress ={setProgress}  pageSize={9} key="searchedQuery" searchedTerm ={searchQuery}/>} />
        </Routes>
      </div>
    )
  
}
export default App


