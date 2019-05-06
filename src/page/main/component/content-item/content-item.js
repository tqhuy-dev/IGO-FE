import React, { Component } from 'react';
import '../content-item/content-item.css';
import svg from '../../../../logo.svg';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { localStorageUserKey } from './../../../../share/constant';
import axios from 'axios';
import { enviroment } from '../../../../core/enviroment';
class ContentItem extends Component {

    likeState = false;
    loveState = false;
    data = JSON.parse(localStorage.getItem(localStorageUserKey));
    classReactionNormal = 'footer-item border-shadow';
    classReactionSeleted = this.classReactionNormal + ' isLike';
    reaction(type) {
        let typeReaction = '';
        if(type === 'like') {
            typeReaction = this.likeState ? 'Unlike' : 'Like'
        } else {
            typeReaction = this.loveState ? 'Unlove' : 'Love'
        }
        let body = {
            type: typeReaction,
            username: this.data.data.username,
            id_content: this.props.data.id
        };

        axios.put(enviroment + 'contents/reaction' , body , {
            headers: {
                Authorization: 'Bearer ' + this.data.token
            }
        })
        .then(res =>{
            if(res.data.status === 200) {
                window.location.reload();
            }
        })
        .catch(error =>{
            console.log(error);
        })
    }

    setStateReaction() {
        let indexLike = this.props.data.reaction.like.findIndex(o => o.username === this.data.data.username);
        this.likeState = indexLike !== -1;
        let indexLove = this.props.data.reaction.love.findIndex(o => o.username === this.data.data.username);
        this.loveState = indexLove !== -1;
    }
    render() {

        this.setStateReaction();

        return (
            <div className="content-container border-shadow">
                <div className="header">
                    <img className="img" src={svg} alt="no image"/>
                    <div className="header-info">
                        <div className="header-name">
                        <Link className="link-name"
                        to={'/profile/' + this.props.data.username}
                        key={this.props.data.username}
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
                        <span
                        hidden={this.data.data.username !== this.props.data.username} 
                        className="delete"
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
                    <div
                    onClick={() => this.reaction('like')}
                    className={ this.likeState ? this.classReactionSeleted : this.classReactionNormal}>{this.props.data.reaction.like.length} Like</div>
                    
                    <div className="footer-item border-shadow">{this.props.data.reaction.comments.length} Comments</div>
                    <div className="footer-item border-shadow">{this.props.data.reaction.share.length} Share</div>
                    
                    <div
                    onClick={() => this.reaction('love')}
                    className={ this.loveState ? this.classReactionSeleted : this.classReactionNormal}>{this.props.data.reaction.love.length} Love</div>
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