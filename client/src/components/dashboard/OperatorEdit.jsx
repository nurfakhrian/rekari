import React, { Component } from 'react';
import Select from 'react-select';
import Card from '../common/Card';
import axios from 'axios';
import $ from 'jquery';

class OperatorEdit extends Component {
    constructor(props) {
        super(props);
        this.state = {
            code: "",
            name: "",
            password: "",
            role: ""
        }
        this.handleChange = this.handleChange.bind(this);
    }

    componentDidMount() {
        axios.post('http://localhost:3028/operator/detail', { id: this.props.match.params.operatorId })
            .then(response => {
                this.setState({
                    code: response.data.message.code,
                    name: response.data.message.name,
                    role: response.data.message.role
                });
            })
            .catch(err => console.log(err.response.data.message));
        setTimeout(() => {
            console.log("oi");
            console.log($("input"));
            $("input").trigger("change");
        }, 1000)
            // var input = document.getElementsByTagName('input');
        // for(var i = 0;i < input.length; i++)
        // {
        //     input[i].dispatchEvent(new Event('change'));
        // }
        // console.log(elem);
        // var event = new Event('submit');
        // elem.dispatchEvent(new Event('change'));
    }

    // componentDidUpdate() {
    //     $("input").trigger("change");
    // }

    handleChange(e) {
        this.setState({
            [e.target.name]: e.target.value
        });
    }

    render() {
        const roleOptions = [
            { value: '', label: '-- Semua --' },
            { value: 'su', label: 'Super Admin' },
            { value: 'admin', label: 'Admin' },
            { value: 'operator', label: 'Operator' },
        ];
        return (
            <Card title={this.state.name} col={6}>
                <form
                    className=""
                    // onSubmit={this.onSubmit}
                    noValidate>
                    <div className="md-form">
                        <input
                            id="code"
                            type="text"
                            className="form-control"
                            name="code"
                            value={this.state.code}
                            onChange={this.handleChange} />
                        <label htmlFor="code">Code</label>
                    </div>
                    <div className="md-form">
                        <input
                            id="name"
                            type="text"
                            className="form-control"
                            name="name"
                            value={this.state.name}
                            onChange={this.handleChange} />
                        <label htmlFor="name">Nama</label>
                    </div>
                    <Select
                            placeholder="Pilih Role"
                            value={roleOptions.filter(option => option.value === this.state.role)}
                            // onChange={this.handleChangeSelect}
                            options={roleOptions} />
                    <div className="md-form">
                        <input
                            id="password"
                            type="password"
                            className="form-control"
                            name="password" />
                        <label htmlFor="password">Password</label>
                    </div>
                    <button type="submit" className="btn btn-cc btn-cc-primary btn-cc-radius-normal ml-0 py-2 px-5">Login</button>
                </form>
            </Card>
        )
    }
}

export default OperatorEdit;
