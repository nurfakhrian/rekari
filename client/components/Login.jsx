import React, { Component } from 'react';
import { login } from './OperatorFunction';

class Login extends Component {
    constructor() {
        super();
        this.state = {
            code = "",
            password = ""
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
        login(operator).then(response => this.props.history('/profile'));
    }
}
