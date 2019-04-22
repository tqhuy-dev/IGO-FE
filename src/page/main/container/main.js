import React , {Component} from 'react';
import { Link } from 'react-router-dom';
import Header from '../component/header/header';
import ContentBody from '../component/content-body/content-body';
class MainPage extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div>
                {/* <Link to={{
                    pathname: '/auth'
                }}>Login</Link> */}
                <Header />
                <ContentBody />
            </div>
        )
    }
}

export default MainPage