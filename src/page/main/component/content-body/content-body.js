import React ,{ Component } from 'react';
import '../content-body/content-body.css';
import ContentForm from '../content-form/content-form';
import ContentList from './../content-list/content-list';


class ContentBody extends Component {

    render() {
        return (
            <div className="content-body-container">
                <ContentForm />
                <br/>
                <ContentList />
            </div>
        )
    }
}

export default ContentBody;