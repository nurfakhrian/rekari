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
        login(operator).then(response => {
            if (response.status !== 200) {
                console.log(response.data);
            }
            else {
                this.props.history.push('/detail');
            }
        });
    }

    render() {
        return (
            // <div className="container">
            //     <div className="row">
            //         <div className="col-md-6 mt-5 mx-auto">
            //             <form noValidate onSubmit={this.onSubmit}>
            //                 <h1 className="h3 mb-3 font-weight-normal">Login</h1>
            //                 <div className="form-group">
            //                     <label htmlFor="code">Code</label>
            //                     <input
            //                         type="text"
            //                         className="form-control"
            //                         name="code"
            //                         placeholder="Enter code"
            //                         value={this.state.code}
            //                         onChange={this.onChange} />
            //                 </div>
            //                 <div className="form-group">
            //                     <label htmlFor="password">Password</label>
            //                     <input
            //                         type="password"
            //                         className="form-control"
            //                         name="password"
            //                         placeholder="Enter password"
            //                         value={this.state.password}
            //                         onChange={this.onChange} />
            //                 </div>
            //                 <button className="btn btn-lg btn-primary btn-block">Login</button>
            //             </form>
            //         </div>
            //     </div>
            // </div>

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

export default Login;
