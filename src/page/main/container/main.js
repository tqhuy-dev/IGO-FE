import React , {Component} from 'react';
import { Link } from 'react-router-dom';
class MainPage extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div>
                <Link to={{
                    pathname: '/auth'
                }}>Login</Link>
            </div>
        )
    }
}

export default MainPage