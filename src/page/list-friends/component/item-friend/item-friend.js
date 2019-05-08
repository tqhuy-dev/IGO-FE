import React, { Component } from 'react';
import './item-friend.css';
import svg from '../../../../logo.svg';
class ItemFriend extends Component {

    render() {
        return (
            <div className="friend-container">
                <img src={svg} alt='no image'/>
                <div className="friend-detail">
                    <div>{this.props.user.name}</div>
                </div>
            </div>
        )
    }
}

export default ItemFriend;