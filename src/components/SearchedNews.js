import React, { useState, useEffect } from 'react'
import NewsItem from './NewsItem'
import Spinner from './Spinner';
import InfiniteScroll from "react-infinite-scroll-component";


const  SearchedNews =(props)=> {
    // function capitalizeFirstLetter  (string) {
    //     return string.charAt(0).toUpperCase() + string.slice(1);
    // }
    const [articles, setArticles] = useState([]);
    const [loading, setLoading] = useState(true);
    const [page, setPage] = useState(1)
    const [totalResults, setTotalResults] = useState(0)
    document.title = `Search Results - Instant News `


    const fetchMoreData = async () => {
    
        const url = `https://newsapi.org/v2/everything?q=${props.searchedTerm}&apiKey=${props.apiKey}&page=${page+1}&pageSize=${props.pageSize}`;
        setPage(page+1)

    
        setLoading(true)

        let data = await fetch(url);
        let parsedData = await data.json();
        console.log(parsedData.articles);
        setArticles(articles.concat(parsedData.articles))
        setLoading(false)
        setTotalResults(parsedData.totalResults)
        console.log("Total Results:" + totalResults);

    };

    const getNews = async()=> {
        props.setProgress(10);
        const url = `https://newsapi.org/v2/everything?q=${props.searchedTerm}&apiKey=${props.apiKey}&page=${page}&pageSize=${props.pageSize}`;
        setLoading(true)
        props.setProgress(30);

        let data = await fetch(url);
        let parsedData = await data.json();
        props.setProgress(70);
        

        console.log(parsedData.articles);
        setArticles(parsedData.articles);
        setLoading(false)
        setTotalResults(parsedData.totalResults)
        props.setProgress(100);
        console.log("Total Results:" + totalResults);
    }
 
    useEffect(() => {
        getNews();
        //eslint-disable-next-line
    }, [])
    
        return (
            <> <h1>Search Results - Top Headlines</h1>
            {loading && <Spinner/> }
                <InfiniteScroll 
                    dataLength={articles.length}
                    next={fetchMoreData}
                    hasMore={articles.length !== totalResults}
                    loader={<Spinner />}>
                        <div className="container" >

                        <div className="row">
                            {articles.map((element) => {
                                return <div className="col-md-4" key={element.url}>
                                    <NewsItem title={element.title ? element.title : ""} desc={element.description ? element.description.substring(0, 50) + "...." : ""} imageUrl={element.urlToImage ? element.urlToImage : "    "}
                                        newsUrl={element.url}
                                        author={element.source.name}
                                        date={element.publishedAt} />
                                </div>
                            })}
                        </div>
                        </div>
                </InfiniteScroll>               
                </>  
        )  
}
export default SearchedNews