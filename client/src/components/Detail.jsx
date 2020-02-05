import React, { Component } from 'react';
import jwt_decode from 'jwt-decode';

class Detail extends Component {
    constructor() {
        super();
        this.state = {
            code: "",
            name: "",
            role: "",
            password: ""
        }
    }

    componentDidMount() {
        const token = localStorage.logintoken;
        const decode = jwt_decode(token);
        this.setState({
            code: decode.code,
            name: decode.name,
            role: decode.role,
            password: decode.password
        });
    }

    render() {
        return (
            <div className="container">
                <div className="jumbotron mt-5">
                    <div className="col-sm-8 mx-auto">
                        <h1 className="text-center">DETAIL</h1>
                    </div>
                    <table className="table col-md-6 mx-auto">
                        <tbody>
                            <tr>
                                <td>Code</td>
                                <td>{this.state.code}</td>
                            </tr>
                            <tr>
                                <td>Name</td>
                                <td>{this.state.name}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        )
    }
}

export default Detail;
