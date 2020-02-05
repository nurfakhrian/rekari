import React, { Component } from 'react';
import { connect } from 'react-redux';
// import { login } from './OperatorFunction';
import { login, logout } from '../store/actions/auth';

class Login extends Component {
    constructor() {
        super();
        this.state = {
            code: "",
            password: ""
        }
        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    onChange(e) {
        this.setState({
            [e.target.name]: e.target.value
        });
    }

    onSubmit(e) {
        e.preventDefault();
        this.props.login();
        // const operator = {
        //     code: this.state.code,
        //     password: this.state.password
        // }
        // login(operator).then(response => {
        //     if (response.status !== 200) {
        //         console.log(response.data);
        //     }
        //     else {
        //         this.props.history.push('/detail');
        //         this.props.loginReducer();
        //     }
        // });
    }

    render() {
        return (
            <div className="col-md-4 pt-5">
                <div className="card col pr-0 pl-0">
                    <div className="card-header text-center h5 bg-dark text-white">Login</div>
                    <div className="card-body">
                        <form className="text-center" noValidate onSubmit={this.onSubmit}>
                            <div className="md-form">
                                <input
                                    id="code"
                                    type="text"
                                    className="form-control"
                                    name="code"
                                    value={this.state.code}
                                    onChange={this.onChange} />
                                <label htmlFor="code">Code</label>
                            </div>
                            <div className="md-form">
                                <input
                                    id="password"
                                    type="password"
                                    className="form-control"
                                    name="password"
                                    value={this.state.password}
                                    onChange={this.onChange} />
                                <label htmlFor="password">Password</label>
                            </div>
                            <button className="btn btn-cc btn-cc-primary btn-cc-radius-normal ml-0 py-2 px-5">Login</button>
                        </form>
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        isLogedIn: state.isLogedIn,
        dataLogin: state.dataLogin
    }
}

const mapDispatchToProps = {
    login,
    logout
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
