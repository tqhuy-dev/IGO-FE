import React ,{ Component } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import '../content-list/content-list.css';
import { enviroment } from '../../../../core/enviroment';
import { localStorageUserKey } from './../../../../share/constant';
import ContentItem from './../content-item/content-item';
class ContentList extends Component {
    constructor(props) {
        super(props);
        this.retrieveListContents();
    }

    retrieveListContents() {
        const dataStorage = JSON.parse(localStorage.getItem(localStorageUserKey));
        axios.get(enviroment + 'users/' + dataStorage.data.username + '/contents' , {headers : {
            Authorization: 'Bearer ' + dataStorage.token
        }})
        .then((data) => {
            this.props.onHandleRetrieveListContents(data.data.data);
            console.log(data.data.data);
        })
    }
    render() {
        return (
            <div className="list-content-container">
               {this.props.contents.data.map((element , index) =>{
                   return (
                       <ContentItem
                       key={index}
                       data={element}
                        />
                   )
               })}
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
        onHandleRetrieveListContents: (value) => dispatch({
            type: 'GET_LIST_CONTENTS',
            value: value
        })
    }
}
export default connect(mapStateToProps , mapDispatchToProps)(ContentList);