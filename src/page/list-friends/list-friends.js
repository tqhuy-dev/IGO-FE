import React, { Component } from 'react';
import Header from './../main/component/header/header';
import ItemFriend from './component/item-friend/item-friend';
import './list-friend.css';
import { connect } from 'react-redux';
import axios from 'axios';
import { enviroment } from '../../core/enviroment';
import { localStorageUserKey } from './../../share/constant';
class ListFriend extends Component {

    constructor(props) {
        super(props);
        this.retrieveListFriend();
    }

    retrieveListFriend() {
        let data = JSON.parse(localStorage.getItem(localStorageUserKey));
        axios.get(enviroment + 'users/friends/' + data.data.username , {
            headers:{
                Authorization: 'bearer ' + data.token
            }
        })
        .then(val =>{
            console.log(val.data);
            this.props.onHandleRetrieveFriend(val.data.friends);
        })
        .catch(error =>{
            console.log(error);
        })
    }
    render() {
        return (
            <div>
                <Header/>
                <div className="list-friend-container">
                   {this.props.friends.map((element , index) =>{
                       return (
                           <ItemFriend
                            user={element}
                           />
                       )
                   })}
                </div>
            </div>

        )
    }
}

const mapStateToProps = state =>{
    return {
        friends: state.friend.listFriend
    }
}

const mapDispatchToProps = dispatch =>{
    return {
        onHandleRetrieveFriend: (value) => dispatch({
            type: 'GET_FRIEND',
            value: value 
        })
    }
}



export default connect(mapStateToProps , mapDispatchToProps)(ListFriend);