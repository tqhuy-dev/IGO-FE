import React, { Component } from 'react';
import '../content-item/content-item.css';
import svg from '../../../../logo.svg';
class ContentItem extends Component {
    constructor(props){
        super(props);
    }

    render() {
        return (
            <div className="content-container border-shadow">
                <div className="header">
                    <img className="img" src={svg} alt="no image"/>
                    <div className="header-info">
                        <div className="header-name">
                        {this.props.data.user_data.name}
                        <span className="header-subtitle">checked in at </span>
                        {this.props.data.location.checkin.map((element , index) =>{
                            return (
                                <span
                                key={index}
                                > <a href="">{element.name} , </a></span>
                            )
                        })}
                        </div>
                        <div className="header-time">{ new Date(Number.parseInt(this.props.data.createAt)).toLocaleDateString('en-US')}
                        <span className="header-country">{this.props.data.location.name} - {this.props.data.location.country}</span>
                        </div>
                    </div>
                </div>
                <div className="body">
                    <div>{this.props.data.content}</div>
                </div>
                <div className="footer">
                    <div className="footer-item border-shadow">{this.props.data.reaction.like} Like</div>
                    <div className="footer-item border-shadow">{this.props.data.reaction.comments} Comments</div>
                    <div className="footer-item border-shadow">{this.props.data.reaction.share} Share</div>
                    <div className="footer-item border-shadow">{this.props.data.reaction.love} Love</div>
                </div>
            </div>
        )
    }
}

export default ContentItem