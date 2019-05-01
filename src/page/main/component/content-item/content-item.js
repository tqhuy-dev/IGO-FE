import React, { Component } from 'react';
import '../content-item/content-item.css';
import svg from '../../../../logo.svg';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
class ContentItem extends Component {

    render() {
        return (
            <div className="content-container border-shadow">
                <div className="header">
                    <img className="img" src={svg} alt="no image"/>
                    <div className="header-info">
                        <div className="header-name">
                        <Link className="link-name"
                        to={{
                            pathname:'/profile/tqhuy1996'
                        }}
                        >
                        {this.props.data.user_data.name}
                        </Link>
                        <span className="header-subtitle">checked in at </span>
                        {this.props.data.location.checkin.map((element , index) =>{
                            return (
                                <span
                                key={index}
                                > <a href="">{element.name} , </a></span>
                            )
                        })}
                        <span className="delete"
                        onClick={() => this.props.onHandleDeleteContent(this.props.data._id)}
                        >delete</span>
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

const mapStateToProps = state =>{
    return {
        contents: state.form.listContent
    }
}

const mapDispatchToProps = dispatch =>{
    return {
      onHandleDeleteContent: (idContent) => dispatch({
          type: 'DELETE',
          value: idContent
      })
    }
}


export default connect(mapStateToProps , mapDispatchToProps)(ContentItem);