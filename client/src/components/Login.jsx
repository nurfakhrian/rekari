import React, { Component } from 'react';
import { connect } from 'react-redux';
import { login } from '../store/actions/auth';

class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {

            // from component state
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
        });
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
                                    onChange={this.onChange}
                                    autoFocus />
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
                            <button type="submit" className="btn btn-cc btn-cc-primary btn-cc-radius-normal ml-0 py-2 px-5">Login</button>
                        </form>
                    </div>
                </div>
            </div>
        )
    }
}

const mapState = (state) => ({
    auth: state.auth
});

// const mapDispatch = {
//     login,
//     logout
// };

// export default connect(mapState, mapDispatch)(Login);
export default connect(mapState)(Login);
