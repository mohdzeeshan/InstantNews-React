import React, { Component } from 'react'

export class NewsItem extends Component {
  render() {
    let {title,desc,imageUrl, newsUrl, author, date} = this.props;
    return (
        <div className="card" >
        <img src={imageUrl} className="card-img-top" alt="..."/>
        <div className="card-body">
          <h5 className="card-title">{title}</h5>
          <p className="card-text">{desc}</p>
          <p className="card-text" ><small className="text-muted">By {author? author:"Unknown"} on { new Date(date).toGMTString()} </small></p>
          <a href={newsUrl} target="_blank"  rel="noreferrer" className="btn btn-dark">Read More</a>
        </div>
      </div>
    )
  }
}   

export default NewsItem