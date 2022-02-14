import React, { Component } from 'react'
import NewsItem from './NewsItem'
import Spinner from './Spinner';
import InfiniteScroll from "react-infinite-scroll-component";


export class News extends Component {
    capitalizeFirstLetter = (string) => {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }
    constructor(props) {
        super(props);
        this.state = {
            articles: [],
            loading: true,
            page: 1,
            totalResults: 0
        }
        document.title = `${this.capitalizeFirstLetter(this.props.category)} - Instant News `
    }

    fetchMoreData = async () => {
        this.setState({ page: this.state.page + 1 })
        const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.apiKey}&page=${this.state.page}&pageSize=${this.props.pageSize}`;
        this.setState({ loading: true });

        let data = await fetch(url);
        let parsedData = await data.json();
        console.log(parsedData.articles);
        this.setState({
            articles: this.state.articles.concat(parsedData.articles),
            loading: false,
            totalResults: parsedData.totalResults
        })
        console.log("Total Results:" + this.state.totalResults);

    };

    async getNews() {
        this.props.setProgress(10);
        const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.apiKey}&page=${this.state.page}&pageSize=${this.props.pageSize}`;
        this.setState({ loading: true });
        this.props.setProgress(30);

        let data = await fetch(url);
        let parsedData = await data.json();
        this.props.setProgress(70);
        

        console.log(parsedData.articles);
        this.setState({
            articles: parsedData.articles,
            loading: false,
            totalResults: parsedData.totalResults
        })
        this.props.setProgress(100);
        console.log("Total Results:" + this.state.totalResults);


    }

    async componentDidMount() {
        this.getNews();
    }
    
    render() {
        return (
            <
            > <h1>{this.capitalizeFirstLetter(this.props.category)} - Top Headlines</h1>
            {this.state.loading && <Spinner/> }
                <InfiniteScroll 
                    dataLength={this.state.articles.length}
                    next={this.fetchMoreData}
                    hasMore={this.state.articles.length !== this.state.totalResults}
                    loader={<Spinner />}>
                        <div className="container" >

                        <div className="row">
                            {this.state.articles.map((element) => {
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
}

export default News