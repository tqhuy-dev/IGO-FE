import React , {Component} from 'react';
import { Link } from 'react-router-dom';
import Header from '../component/header/header';
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
            </div>
        )
    }
}

export default MainPage