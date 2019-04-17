import React , { Component} from 'react';
import { connect } from 'react-redux';
class MainPage extends Component {
    constructor(props){
        super(props);
    }

    state = {
        counter: 0
    }

    render() {
        return (
            <div>
            counter: {this.props.ctr}
            <br/>
            <button onClick={this.props.onIncrementCounter}>Incre</button>
            <button onClick={this.props.onDescrementCounter}>Desc</button>
            <button onClick={() => this.props.onMultiCounter(2)}>Multi</button>
            <button onClick={this.props.onPushStore}>Push</button>
            <ul>
            {this.props.result.map((element , index) => (
                <li
                key={index}
                >{element}</li>
            ))}
            </ul>
            </div>
        )
    }
}

const mapStateToProps = state =>{
    return {
        ctr: state.ctr.counter,
        result: state.res.result,
    };
};

const mapDispatchToProps = dispatch =>{
    return {
        onIncrementCounter: () => dispatch({
            type: 'INCREMENT'
        }),

        onDescrementCounter: () => dispatch({
            type: 'DESCREMENT',
            number: 2
        }),

        onMultiCounter: (multiNumber) => dispatch({
            type: 'MULTI',
            number: multiNumber
        }),

        onPushStore: () => dispatch({
            type: 'SAVE'
        })
    };
}

export default connect(mapStateToProps , mapDispatchToProps)(MainPage);