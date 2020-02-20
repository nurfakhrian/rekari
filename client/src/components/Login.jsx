import React, { Component } from 'react';
import { connect } from 'react-redux';
import { login } from '../store/actions/auth';
import Card from './common/Card';

class Login extends Component {
    constructor(props) {
        super(props);
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
        const user = {
            code: this.state.code,
            password: this.state.password
        }
        this.props.dispatch(login(user)).then(response => {
            if (response.error) {
                alert(response.error);
            }
            else {
                if (response.role === "operator") {
                    this.props.history.push('/dashboard/work-subassy/add');
                }
                else {
                    this.props.history.push('/dashboard/operator');
                }
            }
        });
    }

    render() {
        return (
            <Card title={"Login"} col={4}>
                <form noValidate onSubmit={this.onSubmit}>
                    <div className="form-group">
                        <label htmlFor="code">Code</label>
                        <input
                            id="code"
                            type="text"
                            className="form-control"
                            name="code"
                            value={this.state.code}
                            onChange={this.onChange}
                            autoFocus />
                    </div>
                    <div className="form-group">
                        <label htmlFor="password">Password</label>
                        <input
                            id="password"
                            type="password"
                            className="form-control"
                            name="password"
                            value={this.state.password}
                            onChange={this.onChange} />
                    </div>
                    <div className="row">
                        <button type="submit" className="ml-auto btn btn-cc btn-cc-primary btn-cc-radius-normal ml-0 py-2 px-5">Login</button>
                    </div>
                </form>
            </Card>
        )
    }
}

const mapState = (state) => ({
    auth: state.auth
});

export default connect(mapState)(Login);
