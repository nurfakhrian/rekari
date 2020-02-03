import React, { Component } from 'react';
import { login } from './OperatorFunction';

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
        const operator = {
            code: this.state.code,
            password: this.state.password
        }
        login(operator).then(response => this.props.history.push('/detail'));
    }

    render() {
        return (
            <div className="container">
                <div className="row">
                    <div className="col-md-6 mt-5 mx-auto">
                        <form noValidate onSubmit={this.onSubmit}>
                            <h1 className="h3 mb-3 font-weight-normal">Login</h1>
                            <div className="form-group">
                                <label htmlFor="code">Code</label>
                                <input 
                                    type="text" 
                                    className="form-control" 
                                    name="code" 
                                    placeholder="Enter code" 
                                    value={this.state.code} 
                                    onChange={this.onChange}/>
                            </div>
                            <div className="form-group">
                                <label htmlFor="password">Password</label>
                                <input 
                                    type="password" 
                                    className="form-control" 
                                    name="password" 
                                    placeholder="Enter password" 
                                    value={this.state.password} 
                                    onChange={this.onChange}/>
                            </div>
                            <button className="btn btn-lg btn-primary btn-block">Login</button>
                        </form>
                    </div>
                </div>
            </div>
        )
    }
}

export default Login;
