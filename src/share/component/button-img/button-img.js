import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import '../button-img/button-img.css';
class ButtonImg extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="button-container">
                <FontAwesomeIcon icon="stroopwafel" className="center" />
                <div className="title">{this.props.name}</div>
            </div>
        )
    }
}

export default ButtonImg;