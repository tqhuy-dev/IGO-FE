import React ,{ Component } from 'react';
import '../content-body/content-body.css';
import ContentForm from '../content-form/content-form';
import ContentList from './../content-list/content-list';
class ContentBody extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="content-body-container">
                <ContentForm />
                <ContentList />
            </div>
        )
    }
}

export default ContentBody;